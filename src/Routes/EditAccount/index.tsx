import EditAccount from "./EditAccountContainer";
import { GoogleApiWrapper } from "google-maps-react";
import { MAPS_KEY } from "../../keys";
export default GoogleApiWrapper({
  apiKey: MAPS_KEY
})(EditAccount);