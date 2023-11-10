import React, { useEffect, useState } from "react";
import beerLogoImg from './kazuend-NmvMhov1sYc-unsplash.jpg';
import styles from './HomePage.module.css'
import { useFormik } from 'formik';
import * as yup from 'yup';

function HomePage() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    fetch('/api/checkloginstatus')
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


  const signUpFormSchema = yup.object().shape({
    username: yup.string().required("Please enter a username!")
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: signUpFormSchema,
    onSubmit: (values) => {
      fetch('/api/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values),
      }).then((r) => {
        console.log(r.status)
        // if status is 201, do some redirecting here, else print some error message about signing up
      })
    }
  })


  return (
    <div className={styles.landingLayout}>

      {!isLoggedIn ? <div><h2>Sign up! It's Free!</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            // id="username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}>
          </input>

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          >

          </input>
          <p>{formik.errors.username}</p>

          <button type="submit">Sign up</button>
        </form> </div> :
        <div>
          <h1>Cheers, {currentUser}!</h1>
        <img className={styles.logoImg} src={beerLogoImg} alt='beer-logo-img'></img>


        Photo by <a href="https://unsplash.com/@kazuend?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">kazuend</a> on <a href="https://unsplash.com/photos/two-mugs-of-brown-liquids-NmvMhov1sYc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></div>}



    </div>
  )
}

export default HomePage;

