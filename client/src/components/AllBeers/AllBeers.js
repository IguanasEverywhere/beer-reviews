import React from 'react'

function AllBeers({ beers }) {

  const beerCards = beers.map(beer => <li key={beer.id}>{beer.name} | {beer.beer_type} | {beer.brewery}</li>)

  return (
    <div>
      All beer reviews
      {beerCards}
    </div>
  )
}

export default AllBeers;