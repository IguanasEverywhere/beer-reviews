// import React, { useState } from 'react';
import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css'

function NavBar() {

  return (
    <div className={styles.navBar}>
      <p className={styles.navBarLogo}>Brews Reviews</p>
      <NavLink exact to='/' className={styles.navlinks}>Home</NavLink>
      <NavLink to='/beers' className={styles.navlinks}>Browse Brew Reviews</NavLink>
      <NavLink to='/my-account' className={styles.navlinks}>My Account</NavLink>
      {/* <NavLink to='/new' className={styles.navlinks}>New Beer</NavLink>
      <NavLink to='/my-beers' className={styles.navlinks}>My Beers</NavLink> */}
    </div>
  )
}

export default NavBar;