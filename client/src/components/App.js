// import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from './NavBar/NavBar';
import AllBeers from './AllBeers/AllBeers';

function App() {

  const [beers, setBeers] = useState([]);

  useEffect(() => {
    fetch("/api/beers")
      .then((res) => res.json())
      .then((beersData) => setBeers(beersData));
  }, []);

  // return <h3>Check console for beers....</h3>
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path='/beers'>
          <AllBeers beers={beers}/>
        </Route>
      </Switch>
    </div>
  )
}

export default App;
