import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css'

function NavBar() {
  return (
    <div className={styles.navBar}>
      <NavLink exact to='/'>Home</NavLink>
      <NavLink to='/beers'>Beer Reviews</NavLink>
      <NavLink to='/new'>New Review</NavLink>
      <NavLink to='my-beers'>My Beers</NavLink>
      <NavLink to='/login'>Login</NavLink>
    </div>
  )
}

export default NavBar;