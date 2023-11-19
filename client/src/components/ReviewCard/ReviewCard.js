import React, { useState } from "react";
import styles from './ReviewCard.module.css';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

function ReviewCard({ body, username, rating, canEdit, reviewId }) {

  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  let history = useHistory();

  const formSchema = yup.object().shape({
    reviewBody: yup.string().required("Please enter a review!"),
    rating: yup.number().required().positive().integer()
  })

  const formik = useFormik({
    initialValues: {
      reviewBody: body,
      rating: rating,
      beer_id: params.id,
      review_id: reviewId
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('/api/delete-review', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then(r => console.log(r)).then(history.go(0))
    }
  })

  let ratingStars = '';

  for (let i = 0; i < rating; i++) {
    ratingStars += '★';
  }

  function handleDelete() {
    fetch('/api/delete-review', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ reviewId: reviewId })

    }).then(r => console.log(r)).then(
      //refresh current reviews page
      history.go(0)
      )
  }

  function handleEdit() {
    setIsEditing(true);
  }

  return (
    <div className={styles.reviewCard}>
      <h3>{username}</h3>
      <p>{body}</p>
      <p>{ratingStars}</p>
      {canEdit ? <div className={styles.buttonsArea}>
        <button onClick={handleEdit}>Edit ✏️</button>
        <button onClick={handleDelete}>Delete ❌</button>
      </div> : null}
      {isEditing ? <div className={styles.editForm}><form onSubmit={formik.handleSubmit}>
        <textarea
          name="reviewBody"
          onChange={formik.handleChange}
          value={formik.values.reviewBody}
          placeholder="Review...">
        </textarea>

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

        <button type="submit">Edit Review!</button>

      </form> </div> : null}
    </div>
  )
}

export default ReviewCard;