import { GoogleApiWrapper } from "google-maps-react";
import { MAPS_KEY } from "../../keys";
import LogIn from "./LogInContainer";
export default GoogleApiWrapper({
  apiKey: MAPS_KEY
})(LogIn);