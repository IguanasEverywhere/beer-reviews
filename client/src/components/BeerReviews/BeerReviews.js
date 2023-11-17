import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ReviewCard from '../ReviewCard/ReviewCard';
import styles from './BeerReviews.module.css';

function BeerReviews() {

  const params = useParams();


  //declare these first so they can be accessed in retrieval else below
  let myReviewListing = null;
  let otherReviewCards = null;
  let myReview = null;
  let otherReviews = null;


  const [beerReviews, setBeerReviews] = useState({
    reviews: [],
    currentUserId: '',
    retrieved: false
  });

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

  useEffect(() => {
    fetch(`/api/beers/${params.id}`)
      .then(r => r.json())
      .then(beerData =>
        setBeerReviews(
          { reviews: beerData.beer.reviews, currentUserId: beerData.user, retrieved: true }
        )
      )
  }, [params.id])


  // handle if retrieval hasn't completed yet
  if (beerReviews.retrieved === false) {
    console.log("Loading...")
  } else {

    if (beerReviews.currentUserId) {
      myReview = beerReviews.reviews.filter(review => review.user_id === beerReviews.currentUserId);

      myReviewListing = myReview.length > 0 ?
      <ReviewCard
      body={myReview[0].body}
      username={myReview[0].user.username}
      rating={myReview[0].rating}
      canEdit={true}
      reviewId={myReview[0].id} /> :
      <div>
      <p>Looks like you haven't reviewed this beer yet! Want to post a review? Use this form!</p>
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
      </div>

    } else {
      myReviewListing = <p><Link to='/login'>Login</Link> to review this beer!</p>
    }





    otherReviews = beerReviews.reviews.filter(review => review.user_id !== beerReviews.currentUserId);

    otherReviewCards = otherReviews.map(review => <ReviewCard
      key={review.id}
      body={review.body}
      username={review.user.username}
      rating={review.rating}
      canEdit={false} />)
  }




  return (
    <div>

      <div className={styles.reviewsBody}>
        <div className={styles.reviewsCol}>
          <h2>Your Review:</h2>
          {myReviewListing}
        </div>
        <div className={styles.reviewsCol}>
          <h2>Other Users' Reviews:</h2>
          {otherReviewCards}
        </div>
      </div>
    </div>
  )
}

export default BeerReviews;