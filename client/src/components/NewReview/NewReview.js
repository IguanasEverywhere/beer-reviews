import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';

function NewReview() {

  // do a fetch request to NewReview backend route
  // check if logged in, change loggedIn state based on response
  // render form or something else depending on loggedIn state

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetch("/api/new")
    .then((r) => {
      if (r.status === 200) {
        setIsLoggedIn(true)
      }
      else {
        setIsLoggedIn(false)
      }
    })
  }, [])



  return (
    <div>
      {isLoggedIn ? <p>FORM GOES HERE</p> : <p>Please <NavLink to='/login'>Login</NavLink> to write a new Beer Review!</p>}
    </div>
  )
}

export default NewReview;