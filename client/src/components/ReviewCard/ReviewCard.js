import React from "react";
import styles from './ReviewCard.module.css';

function ReviewCard({ body, username, rating, canEdit, reviewId }) {

  let ratingStars = '';

  for (let i = 0; i < rating; i++) {
    ratingStars += '★';
  }

  function handleDelete() {
    fetch('/api/delete-review', {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({reviewId: reviewId})

    }).then(r => console.log(r))
  }

  return (
    <div className={styles.reviewCard}>
      <h3>{username}</h3>
      <p>{body}</p>
      <p>{ratingStars}</p>
      {canEdit ? <div className={styles.buttonsArea}>
        <button>Edit ✏️</button>
        <button onClick={handleDelete}>Delete ❌</button>
        </div> : <p>no</p>}
    </div>
  )
}

export default ReviewCard;