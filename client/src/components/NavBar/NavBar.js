// import React, { useState } from 'react';
import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css'

function NavBar() {

  // const [isLoggedIn, setIsLoggedIn] = useState(true);


  return (
    <div className={styles.navBar}>
      <p className={styles.navBarLogo}>Brews Reviews</p>
      <NavLink exact to='/' className={styles.navlinks}>Home</NavLink>
      <NavLink to='/beers' className={styles.navlinks}>Beer Reviews</NavLink>
      <NavLink to='/new' className={styles.navlinks}>New Beer</NavLink>
      <NavLink to='/my-beers' className={styles.navlinks}>My Beers</NavLink>
      {/* {isLoggedIn ? <NavLink to='/logout'>Logout</NavLink> :
        <NavLink to='/login'>Login</NavLink>} */}
      <NavLink to='/login' className={styles.navlinks}>Login</NavLink>
      <NavLink to='/logout' className={styles.navlinks}>Logout</NavLink>
    </div>
  )
}

export default NavBar;