import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

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


  //come back to add maxvalue
  const newReviewFormSchema = yup.object().shape({
    reviewBody: yup.string().required("Please enter your review of this beer!"),
    rating: yup.number().required().positive().integer()
  })

  const formik = useFormik({
    initialValues: {
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
    <div>
      {isLoggedIn ?
        <form onSubmit={formik.handleSubmit}>
          <input
            name="reviewBody"
            onChange={formik.handleChange}
            value={formik.values.reviewBody}
            placeholder="Enter review here..."
          ></input>

          <input
            name="rating"
            onChange={formik.handleChange}
            value={formik.values.rating}
            placeholder="Rating">

          </input>

          <button type='submit'>Add your review!</button>


        </form> : <p>Please <NavLink to='/login'>Login</NavLink> to write a new Beer Review!</p>}
    </div>
  )
}

export default NewReview;