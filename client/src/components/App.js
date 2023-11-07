// import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from './NavBar/NavBar';
import AllBeers from './AllBeers/AllBeers';
import HomePage from './HomePage/HomePage'
import styles from './App.module.css'

function App() {

  const [beers, setBeers] = useState([]);

  useEffect(() => {
    fetch("/api/beers")
      .then((res) => res.json())
      .then((beersData) => setBeers(beersData));
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
      </Switch>
    </div>
  )
}

export default App;
