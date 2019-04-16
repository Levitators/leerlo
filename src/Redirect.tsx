import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router'

const LoginSuccess = (props: any) => {
  let defaultValue: boolean | undefined
  const [isAuthenticated, setIsAuthenticated] = useState(defaultValue);
  useEffect(() => {
    let params = new URLSearchParams(props.location.search)
    const authToken = params.get('code')
    fetch(`https://www.reddit.com/api/v1/access_token?grant_type=authorization_code&code=${authToken}&redirect_uri=http://localhost:3000/login-success`, {
      method: 'POST',
      // mode: "no-cors",
      // body: `grant_type=authorization_code&code=${authToken}&redirect_uri=http://localhost:3000/login-success`,
      headers: {
        Authorization: `Basic ${btoa('CLIENT_ID:CLIENT_SECRET')}`
      }
    })
      .then(res => res.json())
      .then((response) => {
        setIsAuthenticated(true)
        document.cookie = `accessToken=${response.access_token};`
        document.cookie = `refreshToken=${response.refresh_token};`
        document.cookie = `expires=${new Date(new Date().getTime() + (10000 * 60 * 60 * 7 * 24))};`
        document.cookie = `doamin=localhost;`
      })
      .catch(() => {
        setIsAuthenticated(false)
      })
  }, []);

  if (isAuthenticated === undefined) {
    return (<span>Autenticating....</span>)
  }

  return (
    isAuthenticated ? <Redirect to="/home" /> : <span>Authentication failed</span>
  )
}

export default LoginSuccess
