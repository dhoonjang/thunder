import { GoogleApiWrapper } from "google-maps-react";
import { MAPS_KEY } from "../../keys";
import SignUp from "./SignUpContainer";
export default GoogleApiWrapper({
  apiKey: MAPS_KEY
})(SignUp);