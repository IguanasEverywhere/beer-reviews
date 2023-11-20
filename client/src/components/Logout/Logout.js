import React, { useEffect } from "react";
import styles from './Logout.module.css';

function Logout() {

  useEffect(() => {
    fetch('/api/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((r) => console.log(r))
  })

  return (
    <div className={styles.logoutConfirm}>
      See you next time!
    </div>
  )
}

export default Logout;