import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router'

const Login = () => {
  let defaultValue: boolean | undefined
  const [isAuthenticated, setIsAuthenticated] = useState(defaultValue);

  const openPopup = () => {
    const url = 'https://www.reddit.com/api/v1/authorize' +
      `?client_id=YdNu-wlTwwHI6A` +
      `&response_type=code` +
      `&state=${new Date().valueOf().toString()}` +
      `&redirect_uri=http://localhost:3000/login-success` +
      `&duration=permanent` +
      `&scope=identity,edit,flair,history`

    window.location.assign(url)
  }

  useEffect(() => {
    const parsedValue = document.cookie.match(`(^|;) ?authToken=([^;]*)(;|$)`)
    if (parsedValue && !!parsedValue[2]) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  if (isAuthenticated === undefined) {
    return (<span>Autenticating....</span>)
  }

  return (
    isAuthenticated ?
      <Redirect to="/home" /> :
      <div className="App">
        <header className="App-header">
          <button onClick={openPopup}>LOG IN</button>
        </header>
      </div>

  );
}

export default Login;

