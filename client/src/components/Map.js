import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {Icon} from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import MapComponent from "./MapComponent.js";
import markerIconPng from "leaflet/dist/images/marker-icon.png"



function Map(props) {
   //setting state for location data
  const [locations, setLocations] = useState([]);
  useEffect(() => {
     //condition to trigger fetching of coordinates from location data
    if (locations.length === 0) {
      fetch("/api/location")
        .then((res) => res.json())
        .then((locationJson) => {
          setLocations(locationJson);
        });
    }
  });

  return (
    <div>
      <MapContainer
        id="mapcontainer"
        center={props.center}
        zoom={props.zoom}
        height="600px"
      >
        <MapComponent center={props.newCenter} zoom={props.newZoom} />
        <TileLayer
          url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
          attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => {
          //Map locations array to pins with a popup that has a link to each individual page
          return (
            <Marker
              key={index}
              position={[location.lat, location.lon]}
              icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}
            >
              <Popup key={index}>
                <Link
                  to={`/restaurant/${location.name
                    .toLowerCase()
                    .replaceAll("'", "")
                    .replaceAll(" ", "-")}`}
                >
                  {location.name}
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
