import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MyBeers.module.css';
import {Link} from 'react-router-dom';

function MyBeers() {

  const [requestInfo, setRequestInfo] = useState({
    loggedIn: false,
    beers: []
  })

  useEffect(() => {
    fetch('/api/my-beers')
      .then(r => {
        if (r.status === 200) {
          r.json().then((beersData) =>
            setRequestInfo({loggedIn: true, beers: beersData})
          )
        } else {
          r.json().then((beersData) => {
            setRequestInfo({loggedIn: false, beers: []})
          })
        }
      })
  }, [])


  let myBeers = requestInfo.beers.map((beer) => <li key={beer.id}><Link to={`/beers/${beer.beer.id}`}>{beer.beer.name}</Link> | {beer.beer.beer_type} | {beer.beer.brewery} | {beer.rating} | {beer.body}</li>)

  if (myBeers.length === 0) {
    myBeers = <div className={styles.noBeers}>
      <h3>Looks like you have no reviews yet!</h3>
      <p>Head over to our <Link to='/beers'>beers list</Link> to add a new review! Or, create an entirely new beer entry <Link to='/new'>here</Link></p>
      </div>
  }


  return (
    <div>
      {requestInfo.loggedIn ? <div className={styles.myBeersList}><h2>Your Brew Reviews:</h2>{myBeers}</div>: <p>Please <NavLink to='/login'>Login!</NavLink></p>}
    </div>
  )
}

export default MyBeers;