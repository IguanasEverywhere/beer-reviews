import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

  return (
    <div>
      Beer REviews here
      {reviewCards}
    </div>
  )
}

export default BeerReviews;