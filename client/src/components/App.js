// import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";

import React, { useEffect } from "react";

function App() {
    useEffect(() => {
      fetch("/api/beers")
      .then((res) => res.json())
      .then((beers) => console.log(beers));
    }, []);

    return <h3>Check console for beers....</h3>
}

export default App;
