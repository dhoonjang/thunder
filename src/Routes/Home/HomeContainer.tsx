import React from "react";
import { RouteComponentProps } from "react-router";
import HomePresenter from "./HomePresenter";
import { loadMap } from "src/utils/MapFunctions";

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
    loadMap(37.2799,127.0443, this.map, this.mapRef, this.props.google);
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
}

export default HomeContainer;