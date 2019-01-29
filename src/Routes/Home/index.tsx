import { GoogleApiWrapper } from "google-maps-react";
import { MAPS_KEY } from "../../keys";

import Home from "./HomeContainer";
export default GoogleApiWrapper({
    apiKey: MAPS_KEY
})(Home);