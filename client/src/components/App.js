// import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";

import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from './NavBar/NavBar';
import AllBeers from './AllBeers/AllBeers';
import HomePage from './HomePage/HomePage';
import NewReview from './NewReview/NewReview';
import MyBeers from './MyBeers/MyBeers';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import styles from './App.module.css';

function App() {

  return (
    <div className={styles} >
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route exact path='/beers'>
          <AllBeers />
        </Route>
        <Route exact path='/new'>
          <NewReview />
        </Route>
        <Route exact path='/my-beers'>
          <MyBeers />
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
