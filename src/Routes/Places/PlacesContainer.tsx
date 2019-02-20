import React from "react";
import ReactDOM from "react-dom";
import AddPlacePresenter from "./PlacesPresenter";
import { RouteComponentProps } from "react-router";
import { geoCode, reverseGeoCode } from "src/utils/MapFunctions";
import { Query } from "react-apollo";
import { GET_PLACES } from "src/sharedQueries.q";
import { getPlaces } from "src/types/api";

interface IState {
  lat: number;
  lng: number;
  address: string;
  isPicked: boolean;
  isMenuOpen: boolean;
}

interface IProps {
  google: any;
}

class PlacesContainer extends React.Component<RouteComponentProps<IProps>, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public placeRepo: any[];
  public infoWindow: any;

  public state = {
    address: "",
    lat: 37.2799,
    lng: 127.0443,
    isPicked: false,
    isMenuOpen: false
  };

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSucces,
      this.handleGeoError
    );
  }

  public render() {
    const { address, isPicked, lat, lng, isMenuOpen } = this.state;
    return (
      <Query
        query={GET_PLACES}
        onCompleted={this.handlePlaces}
      >
        {({data, loading}) => (
          <AddPlacePresenter
            toggleMenu={this.toggleMenu}
            isMenuOpen={isMenuOpen}
            mapRef={this.mapRef}
            address={address}
            onInputChange={this.onInputChange}
            onInputBlur={this.onInputBlur}
            onPickPlace={this.onPickPlace}
            isPicked={isPicked}
            loading={loading}
            lat={lat}
            lng={lng}
          />
        )}
      </Query>

    );
  }

  public toggleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
      };
    });
  };

  public handleGeoSucces: PositionCallback = (positon: Position) => {
    const { lat: latitude, lng: longitude } = this.state;
    this.loadMap(latitude, longitude);
    this.reverseGeocodeAddress(latitude, longitude);
  };

  public handleGeoError: PositionErrorCallback = () => {
    console.log("No location");
  };

  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      zoom: 17
    };
    this.map = new maps.Map(mapNode, mapConfig);
    this.map.addListener("dragend", this.handleDragEnd);
  };

  public handleDragEnd = () => {
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    this.setState({
      lat,
      lng
    });
    this.reverseGeocodeAddress(lat, lng);
  };

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  public onInputBlur = async () => {
    const { address } = this.state;
    const result = await geoCode(address);
    if (result !== false) {
      const { lat, lng, formatted_address: formatedAddress } = result;
      this.setState({
        address: formatedAddress,
        lat,
        lng
      });
      const latLng = new google.maps.LatLng(lat, lng);
      this.map.setZoom(18);
      this.map.panTo(latLng);
    }
  };

  public onPickPlace = () => {
    const { isPicked } = this.state;
    this.setState({
      isPicked: !isPicked
    })
    this.map.setZoom(20);
  };

  public reverseGeocodeAddress = async (lat: number, lng: number) => {
    const reversedAddress = await reverseGeoCode(lat, lng);
    if (reversedAddress !== false) {
      this.setState({
        address: reversedAddress
      });
    }
  };

  public handlePlaces = (data: {} | getPlaces) => {
    if ("GetPlaces" in data) {
      const { GetPlaces: { places, ok } } = data;
      if (ok && places) {
        this.placeRepo = places;
        for (const place of places) {
          if (place && place.lat && place.lng) {
            const image = {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 4,
              strokeColor: '#3498db',
              strokeWeight: 2.5
            }
            const markerOptions: google.maps.MarkerOptions = {
              icon: image,
              position: {
                lat: place.lat,
                lng: place.lng
              }
            };
            const newMarker: google.maps.Marker = new google.maps.Marker(
              markerOptions
            );
            newMarker.set("ID", place.id);
            newMarker.addListener('mouseover', () => {
              this.onMarkerHover(newMarker, "in")
            });
            newMarker.addListener('mouseout', () => {
              this.infoWindow.close();
            });
            newMarker.setMap(this.map);
          }
        }
      }
    }
  }

  public onMarkerHover = (newMarker, command) => {
    const place = this.placeRepo.find(e => {
      return e.id === newMarker.ID
    })
    const contentString = `${place.name}<br/>STAR: ${place.star}` 

    const infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    this.infoWindow = infowindow;
    infowindow.open(this.map, newMarker);
  };
}

export default PlacesContainer;