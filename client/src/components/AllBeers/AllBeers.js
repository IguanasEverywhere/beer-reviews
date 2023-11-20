import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AllBeers() {

  const [beers, setBeers] = useState([]);

  useEffect(() => {
    fetch("/api/beers")
      .then((res) => {
        if (res.status !== 200) {
          console.log('not logged in')
        }
        else { return res.json() }
      })
      .then((beersData) => setBeers(beersData));
  }, []);

  const beerCards = beers.map(beer => <li key={beer.id}><Link to={'/beers/' + beer.id} >{beer.name} | {beer.beer_type} | {beer.brewery}</Link></li>)

  return (
    <div>
      <h2>Check out all the Brews Reviews:</h2>
      {beerCards}
    </div>
  )
}

export default AllBeers;