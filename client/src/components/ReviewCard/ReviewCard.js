import React from "react";
import styles from './ReviewCard.module.css';

function ReviewCard({body, username}) {

  return (
    <div className={styles.reviewCard}>
      <h3>{username}</h3>
      <p>{body}</p>
    </div>
  )
}

export default ReviewCard;