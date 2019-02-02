import { GoogleApiWrapper } from "google-maps-react";
import { MAPS_KEY } from "../../keys";
import SignIn from "./SigninContainer";
export default GoogleApiWrapper({
  apiKey: MAPS_KEY
})(SignIn);