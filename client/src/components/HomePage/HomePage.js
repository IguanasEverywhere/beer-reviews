import React from "react";
import beerLogoImg from './kazuend-NmvMhov1sYc-unsplash.jpg';
import styles from './HomePage.module.css'
import { useFormik } from 'formik';
import * as yup from 'yup';

function HomePage() {

  const signUpFormSchema = yup.object().shape({
    username: yup.string().required("Please enter a username!")
  });

  const formik = useFormik({
    initialValues: {
      username: "",
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
        console.log(r)
      })
    }
  })


  return <div className={styles.landingLayout}>
    <img className={styles.logoImg} src={beerLogoImg} alt='beer-logo-img'></img>


    Photo by <a href="https://unsplash.com/@kazuend?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">kazuend</a> on <a href="https://unsplash.com/photos/two-mugs-of-brown-liquids-NmvMhov1sYc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>


    <h2>Sign up! It's Free!</h2>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        onChange={formik.handleChange}
        value={formik.values.username}>
      </input>
      <p>{formik.errors.username}</p>

      <button type="submit">Sign up</button>
    </form>


  </div>
}

export default HomePage;

