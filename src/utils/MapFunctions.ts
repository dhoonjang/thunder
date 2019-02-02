import ReactDOM from "react-dom";

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