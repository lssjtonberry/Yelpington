import { Route, Switch, Redirect } from "react-router-dom";
import "./styles/App.css";
import { useState } from "react";
import Restaurant from "./components/Restaurant.js";
import Home from "./components/Home.js";
import Map from "./components/Map.js";

function App(props) {
  //setting up the stateState for the map zoom
  const [zoom, setZoom] = useState({
    zoomIn: false,
    zoom: 15,
    center: [44.166414, -73.253445],
  });

  return (
    <div id="maincontainer">
      <h1 id="apptitle">
        <a href="/">
          <span>Yelp-ington</span>
        </a>
      </h1>
      <div id="serverroutes">
        <div id="mapborder">
          <Map
            newZoom={zoom.zoomIn ? zoom.zoom : 15}
            newCenter={zoom.zoomIn ? zoom.center : [44.166414, -73.253445]}
          />
        </div>
        <Switch>
          <Route exact path="/">
            <Home setZoom={setZoom} />
          </Route>

          <Route
            path="/restaurant/:id"
            children={(props) => {
              return props.match.isExact ? (
                <Restaurant
                  match={props.match}
                  setZoom={setZoom}
                  zoomIn={zoom.zoomIn}
                />
              ) : (
                <Redirect to="/" />
              );
            }}
          />

          
        </Switch>
      </div>
    </div>
  );
}

export default App;
