import React, { useEffect, useState } from "react";
import beerLogoImg from './kazuend-NmvMhov1sYc-unsplash.jpg';
import beerFlightImg from './bohdan-stocek-vt0O0Av96R4-unsplash.jpg';
import styles from './HomePage.module.css'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, Redirect } from 'react-router-dom';

function HomePage() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [userExistsError, setUserExistsError] = useState(false)

  useEffect(() => {
    fetch('/api/home')
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
    username: yup.string().required("Please enter a username!").min(3),
    password: yup.string().required("Please create a password!").matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/, "Password must include at least one number and at least one letter!")
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
        if (r.status === 409) {
          setUserExistsError(true)
        } else if (r.status === 201) {
          setSignupSuccess(true)
        }
      })
    }
  })

  return (
    <div className={styles.landingLayout}>

      {signupSuccess ? <Redirect to='/my-account' />:
      <>

      {!isLoggedIn ?
        <div className={styles.signupLayout}>


          <h1>Pull up a bar stool, friend!</h1>
          <img src={beerFlightImg} className={styles.logoImg} alt="beer-flight-img"></img>

          <h4>Welcome to Brews Reviews, where you can share your thoughts on, well, beer! Create an account, write reviews, and see what others think!</h4>

          <h2>Sign up! It's Free!</h2>
          <form className={styles.signupForm} onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}>
            </input>
            {userExistsError ? <small>Username already exists! Please choose another.</small> : null}

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            >

            </input>
            <small>{formik.errors.username}</small>
            <small>{formik.errors.password}</small>

            <button type="submit">Sign up</button>
          </form>

          <h3>Already have an account? <Link to='/login'>Log in!</Link></h3>
          <small>Photo by <a href="https://unsplash.com/@bohdans?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Bohdan Stocek</a> on <a href="https://unsplash.com/photos/a-row-of-beer-glasses-sitting-on-top-of-a-wooden-tray-vt0O0Av96R4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></small>


        </div> :
        <div className={styles.landingLayout}>
          <h1 className={styles.greeting}>Cheers, {currentUser}!</h1>
          <img className={styles.logoImg} src={beerLogoImg} alt='beer-logo-img'></img>


          <small>Photo by <a href="https://unsplash.com/@kazuend?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">kazuend</a> on <a href="https://unsplash.com/photos/two-mugs-of-brown-liquids-NmvMhov1sYc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></small></div>}</>
          }
    </div>
  )
}

export default HomePage;

