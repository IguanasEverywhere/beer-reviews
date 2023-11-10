// import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from './NavBar/NavBar';
import AllBeers from './AllBeers/AllBeers';
import HomePage from './HomePage/HomePage';
import NewReview from './NewReview/NewReview'
import Login from './Login/Login';
import Logout from './Logout/Logout';
import styles from './App.module.css';

function App() {

  const [beers, setBeers] = useState([]);
  // const [isLoggedIn, setIsLoggedIn] = useState(true)

  useEffect(() => {
    fetch("/api/beers")
      .then((res) => {
        if (res.status !== 200) {
          console.log('not logged in')
        }
        else { return res.json() }
      })
      .then((beersData) => setBeers(beersData));
    // .then((res) => res.json())
    // .then((beersData) => setBeers(beersData));
  }, []);

  // return <h3>Check console for beers....</h3>
  return (
    <div className={styles} >
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route exact path='/beers'>
          <AllBeers beers={beers} />
        </Route>
        <Route exact path='/new'>
          <NewReview />
          {/* {isLoggedIn ? <NewReview /> : <Login />} */}
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path ='/logout'>
          <Logout />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
