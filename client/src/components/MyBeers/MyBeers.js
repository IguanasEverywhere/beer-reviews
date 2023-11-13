import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'

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

  console.log(requestInfo.beers)

  // will update this with better info later
  const myBeers = requestInfo.beers.map((beer) => <li>{beer.beer.name}</li>)


  return (
    <div>
      {requestInfo.loggedIn ? myBeers: <p>Please <NavLink to='/login'>Login!</NavLink></p>}
    </div>
  )
}

export default MyBeers;