import { GoogleApiWrapper } from "google-maps-react";
import PlacesContainer from "./PlacesContainer";
import { MAPS_KEY } from "src/keys";

export default GoogleApiWrapper({
  apiKey: MAPS_KEY
})(PlacesContainer);