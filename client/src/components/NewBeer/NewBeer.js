import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from './NewBeer.module.css';
import { Link } from 'react-router-dom';

function NewBeer() {


  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [successfulSubmission, setSuccessfulSubmission] = useState(false)
  const [beerExistsError, setBeerExistsError] = useState(false)

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


  const newReviewFormSchema = yup.object().shape({
    beerName: yup.string().required("Please enter a beer name"),
    beerType: yup.string().required("Please enter a type of beer"),
    brewery: yup.string().required("Please enter a brewery"),
    reviewBody: yup.string().required("Please enter your review of this beer!").min(10),
    rating: yup.number().required().positive().integer("Select a number for your review!").min(1).max(5)
  })

  const formik = useFormik({
    initialValues: {
      beerName: '',
      beerType: '',
      brewery: '',
      reviewBody: '',
      rating: '1',
    },
    validationSchema: newReviewFormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      fetch('/api/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
        .then(r => {
          if (r.status === 409) {
            setBeerExistsError(true)
          } else if (r.status === 200) {
            setSuccessfulSubmission(true)
            setBeerExistsError(false)
          }
        })
    }
  })


  return (
    <>
      {successfulSubmission ? <h3>Thank you for submitting your new Brew Review!</h3> :
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
              <small className={styles.errorMsg}>{formik.errors.beerName}</small>

              <input
                name="beerType"
                onChange={formik.handleChange}
                value={formik.values.beerType}
                placeholder="Beer Type">
              </input>
              <small className={styles.errorMsg}>{formik.errors.beerType}</small>

              <input
                name="brewery"
                onChange={formik.handleChange}
                value={formik.values.brewery}
                placeholder="Brewery">
              </input>
              <small className={styles.errorMsg}>{formik.errors.brewery}</small>

              <textarea
                name="reviewBody"
                onChange={formik.handleChange}
                value={formik.values.reviewBody}
                placeholder="Enter review here...">
              </textarea>
              <small className={styles.errorMsg}>{formik.errors.reviewBody}</small>

              <label htmlFor="rating">Give this beer a rating:</label>
              <select
                name="rating"
                onChange={formik.handleChange}
                value={formik.values.rating}
                placeholder="Rating">
                <option value="1">1 Star -- Disgusting!</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars -- Delicious!</option>
              </select>
              <small className={styles.errorMsg}>{formik.errors.rating}</small>

              <button className={styles.submitBtn} type='submit'>Add your review for this new brew!</button>
            </form>
            : <p>Please <NavLink to='/login'>Login</NavLink> to write a new Beer Review!</p>}
        </div>}
      <div className={styles.existsError}>
        {beerExistsError ? <h3>Whoops, looks like we already have that beer in our database! Head over to <Link to='/beers'>Brew Reviews</Link> to check out others' reviews and add your own if you'd like!</h3> : null}</div>
    </>
  )
}

export default NewBeer;