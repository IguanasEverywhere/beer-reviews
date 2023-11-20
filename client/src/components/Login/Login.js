import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from './Login.module.css';
import { Redirect } from 'react-router-dom';



function Login() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [badLogin, setBadLogin] = useState(false);


  useEffect(() => {
    fetch('/api/login')
      .then(r => {
        if (r.status === 200) {
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
        }
      })
  }, [])

  const formSchema = yup.object().shape({
    username: yup.string().required("Must provide username"),
    password: yup.string().required("Must enter password")
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      }).then((r) => {
        console.log(r)
        if (r.status === 200) {
          setIsLoggedIn(true)
        } else {
          setBadLogin(true)
        }
      })
    }
  })

  return (
    <div>
      {isLoggedIn ? <Redirect to='/' /> :
        <div className={styles.loginLayout}>
          <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
            <h3>We're gonna need to see some id...</h3>
            <small>Enter your username and password</small>
            {badLogin ? <p className={styles.failedLogin}>Login Failed! Please Try Again</p> : null}
            <input
              placeholder="Username"
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            ></input>
            <input
              type="password"
              placeholder="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            ></input>

            <button type="submit">Login!</button>

          </form>
        </div>
      }
    </div>

  )
}

export default Login;