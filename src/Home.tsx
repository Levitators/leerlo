import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router'

const Home = () => {
  let defaultValue: boolean | undefined
  const [isAuthenticated, setIsAuthenticated] = useState(defaultValue);
  const [userDetails, setUserDetails] = useState(defaultValue);

  useEffect(() => {
    const parsedValue = document.cookie.match(`(^|;) ?accessToken=([^;]*)(;|$)`)
    if (parsedValue && !!parsedValue[2]) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  const handleLogoutClick = () => {
    document.cookie = `accessToken=`
    setIsAuthenticated(false)
  }

  if (isAuthenticated === undefined) {
    return (<span>Autenticating....</span>)
  }

  return (
    isAuthenticated ?
      <Fragment>
        <span> Log in success and working</span>
        <button onClick={handleLogoutClick}>LOG OUT</button>
      </Fragment> :
      <Redirect to="/" />
  )
}

export default Home
