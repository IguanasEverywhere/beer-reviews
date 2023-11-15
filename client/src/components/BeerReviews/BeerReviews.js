import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

function BeerReviews() {

  const params = useParams();

  const [beerReviews, setBeerReviews] = useState([]);

  useEffect(() => {
    fetch(`/api/beers/${params.id}`)
      .then(r => r.json())
      .then(beerData => setBeerReviews(beerData.reviews))
  }, [params.id])

  console.log(beerReviews)

  const reviewCards = beerReviews.map((review) => <li key={review.id}>{review.body}</li>)

  const formSchema = yup.object().shape({
    reviewBody: yup.string().required("Please enter a review!"),
    rating: yup.number().required().positive().integer()
  })

  const formik = useFormik({
    initialValues: {
      reviewBody: '',
      rating: '',
      beer_id: params.id
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('/api/add-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then(r => console.log(r))
    }
  })

  return (
    <div>
      Beer REviews here
      <form onSubmit={formik.handleSubmit}>
        <input
        name="reviewBody"
        onChange={formik.handleChange}
        value={formik.values.reviewBody}
        placeholder="Review...">
        </input>

        <input
        name="rating"
        onChange={formik.handleChange}
        value={formik.values.rating}
        placeholder="Rating">
        </input>

        <button type="submit">Submit Review!</button>

      </form>


      {reviewCards}
    </div>
  )
}

export default BeerReviews;