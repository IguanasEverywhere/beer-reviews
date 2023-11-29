import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MyAccount.module.css';

function MyAccount() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)


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

  return (
    <div>
      {isLoggedIn ?
        <div className={styles.accountPageLayout}>
          <h2>Welcome back, {currentUser}!</h2>

          <p>Want to view, edit, or delete your own brew reviews?</p>
          <Link to='/my-beers'><button className={styles.accountBtn}>My Brew Reviews</button></Link>
          <p>Want to a review a new brew that <Link to='/beers'>no one else yas yet?</Link></p>
          <Link to='/new'><button className={styles.accountBtn}>New Beer</button></Link>
          <p>Time to call it a day?</p>
          <Link to='/logout'><button className={styles.accountBtn}>Logout</button></Link>
        </div>

        : <div className={styles.loginPrompt}><h1>Click <Link to='/login'>here</Link> to login!</h1></div>}
    </div>
  )
}

export default MyAccount;