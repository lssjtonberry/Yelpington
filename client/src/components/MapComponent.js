import { useMap } from "react-leaflet";

//Function used to zoom in on the map after clicking 
function MapComponent({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}
export default MapComponent;