import React from "react";
import ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router";
import HomePresenter from "./HomePresenter";

interface IProps extends RouteComponentProps<any> {
  google: any;
}
interface IState {
  isMenuOpen: boolean;
}

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public state = {
    isMenuOpen: false
  }
  constructor(props){
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {
    this.loadMap(37.2799,127.0443);
  }
  public render() {
    const {isMenuOpen} = this.state;
    return(
      <HomePresenter 
        isMenuOpen={isMenuOpen} 
        toggleMenu={this.toggleMenu} 
        mapRef={this.mapRef} 
      />
    )
  }
  public toggleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
      };
    });
  };

  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    if (!mapNode) {
      this.loadMap(lat, lng);
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
    this.map = new maps.Map(mapNode, mapConfig);
  };
}

export default HomeContainer;