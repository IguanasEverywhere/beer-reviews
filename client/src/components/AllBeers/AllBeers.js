import React, {useEffect, useState} from 'react'

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

  const beerCards = beers.map(beer => <li key={beer.id}>{beer.name} | {beer.beer_type} | {beer.brewery}</li>)

  return (
    <div>
      All beer reviews
      {beerCards}
    </div>
  )
}

export default AllBeers;