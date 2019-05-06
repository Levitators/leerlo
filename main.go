package main

import (
	"fmt"
	"os"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func noRouteHandler(c *gin.Context) {
	c.File("./build/index.html")
}

func main() {
	fmt.Printf("Client id -> %s", os.Getenv("CLIENT_ID"))
	r := gin.Default()

	r.Use(static.Serve("/", static.LocalFile("./build", true)))
	api := r.Group("/api")
	api.POST("/generate_token", tokenHandler)
	r.NoRoute(noRouteHandler)

	r.Run(":3000")
}
