import ReactDOM from "react-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MAPS_KEY } from "src/keys";

export const loadMap = (lat, lng, map, mapRef, google)=> {
  const maps = google.maps;
  const mapNode = ReactDOM.findDOMNode(mapRef.current);
  if (!mapNode) {
    loadMap(lat, lng, map, mapRef, google);
    return;
  }
  const mapConfig: google.maps.MapOptions = {
    center: {
      lat,
      lng
    },
    disableDefaultUI: true,
    zoom: 16.7
  };
  map = new maps.Map(mapNode, mapConfig);
};

export const geoCode = async (address: string) => {
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${MAPS_KEY}`;
    const { data } = await axios(URL);
    if (!data.error_message) {
        console.log(data);
        const { results } = data;
        const firstPlace = results[0];
        const {
          formatted_address,
          geometry: {
            location: { lat, lng }
          }
        } = firstPlace;
        return { formatted_address, lat, lng };
    } else {
        toast.error(data.error_message);
        return false;
    }
};

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const firstPlace = results[0];
    if (!firstPlace) {
        return false;
    }
    const address = firstPlace.formatted_address;
    return address;
  } else {
    toast.error(data.error_message);
  }
};