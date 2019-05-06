package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

type tokenRequestParams struct {
	Code string `json:"code"`
}

func tokenHandler(c *gin.Context) {
	var reqParams tokenRequestParams

	if err := c.ShouldBindJSON(&reqParams); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	client := &http.Client{}
	data := url.Values{}
	redirectURL := "http://localhost:3000/login-success"
	data.Set("grant_type", "authorization_code")
	data.Add("code", reqParams.Code)
	data.Add("redirect_uri", redirectURL)
	u, _ := url.ParseRequestURI("https://www.reddit.com")
	u.Path = "/api/v1/access_token/"
	urlString := u.String()
	req, e := http.NewRequest("POST", urlString, bytes.NewBufferString(data.Encode()))

	if e != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": e})
	}

	authValue := strings.Join([]string{os.Getenv("CLIENT_ID"), os.Getenv("CLIENT_SECRET")}, ":")
	basicToken := strings.Join([]string{"Basic", base64.StdEncoding.EncodeToString([]byte(authValue))}, " ")
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value")
	req.Header.Set("Authorization", basicToken)
	req.Header.Set("User-Agent", "leerlo v0.0.1 (by /u/aravind741)")
	res, e := client.Do(req)
	if e != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": e})
	}

	if res.StatusCode != http.StatusOK {
		c.JSON(http.StatusUnauthorized, gin.H{})
	}

	var result map[string]interface{}
	json.NewDecoder(res.Body).Decode(&result)

	if result["access_token"] == nil {
		c.JSON(http.StatusUnauthorized, gin.H{})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"access_token":  result["access_token"],
			"refresh_token": result["refresh_token"],
		})
	}
}
