import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function MyAccount() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)


  // maybe instead of all this, add to before_request, have GET return the sessionData. Similar to newReview page
  // useEffect(() => {
  //   fetch('/api/checkloginstatus')
  //     .then(r => {
  //       if (r.status === 200) {
  //         setIsLoggedIn(true)
  //       }
  //       else {
  //         setIsLoggedIn(false)
  //       }
  //       return r.json()
  //     }).then(sessionData => {
  //       if (sessionData.ActiveUser) {
  //         let currentUserName = (sessionData.ActiveUser.active_user_username)
  //         setCurrentUser(currentUserName)
  //       }
  //     })
  // }, [])

  useEffect(() => {
    fetch('/api/my-account')
      .then(r => {
        if (r.status === 200) {
          setIsLoggedIn(true)
        }
        else {
          setIsLoggedIn(false)
        }
        return r.json()
      }).then(sessionData => {
        if (sessionData.ActiveUser) {
          let currentUserName = (sessionData.ActiveUser.active_user_username)
          setCurrentUser(currentUserName)
        }
      })
  }, [])

  console.log(isLoggedIn)

  return (
    <div>
      {isLoggedIn ?
        <div>
          <p>Welcome, {currentUser}</p>
          <NavLink to='/new'>New Beer</NavLink>
          <NavLink to='/my-beers'>My Beers</NavLink>
          <NavLink to='/logout'>Logout</NavLink>
        </div>



        : <h1>Click here to login!</h1>}
    </div>
  )
}

export default MyAccount;