import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from './NewBeer.module.css'

function NewBeer() {


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


  //come back to add maxvalue
  const newReviewFormSchema = yup.object().shape({
    beerName: yup.string().required("Please enter a beer name"),
    beerType: yup.string().required("Please enter a type of beer"),
    brewery: yup.string().required("Please enter a brewery"),
    reviewBody: yup.string().required("Please enter your review of this beer!"),
    rating: yup.number().required().positive().integer()
  })

  const formik = useFormik({
    initialValues: {
      beerName: '',
      beerType: '',
      brewery: '',
      reviewBody: '',
      rating: '',
    },
    validationSchema: newReviewFormSchema,
    onSubmit: (values) => {
      fetch('/api/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
        .then(r => console.log(r))
    }
  })



  //dont forget to handle errors in this form

  return (
    <div className={styles.newBeerLayout}>
      {isLoggedIn ?
        <form className={styles.newBeerForm} onSubmit={formik.handleSubmit}>
          <h3>Have thoughts on a beer that hasn't been reviewed yet? Tell us all about it!</h3>
          <input
          name="beerName"
          onChange={formik.handleChange}
          value={formik.values.beerName}
          placeholder="Beer Name">
          </input>

          <input
          name="beerType"
          onChange={formik.handleChange}
          value={formik.values.beerType}
          placeholder="Beer Type">
          </input>

          <input
          name="brewery"
          onChange={formik.handleChange}
          value={formik.values.brewery}
          placeholder="Brewery">
          </input>

          <textarea
            name="reviewBody"
            onChange={formik.handleChange}
            value={formik.values.reviewBody}
            placeholder="Enter review here...">
          </textarea>

          <input
            name="rating"
            onChange={formik.handleChange}
            value={formik.values.rating}
            placeholder="Rating">

          </input>

          <button className={styles.submitBtn} type='submit'>Add your review for this new brew!</button>


        </form> : <p>Please <NavLink to='/login'>Login</NavLink> to write a new Beer Review!</p>}
    </div>
  )
}

export default NewBeer;