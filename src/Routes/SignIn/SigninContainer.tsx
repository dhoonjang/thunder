import React from "react";
import SigninPresenter from "./SigninPresenter";
import { loadMap } from "src/utils/MapFunctions";

interface IProps {
  google: any;
}
class LoginContainer extends React.Component<IProps> {
  public mapRef: any;
  public map: google.maps.Map;
  constructor(props){
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {
    loadMap(37.2799,127.0443, this.map, this.mapRef, this.props.google);
  }
  public render() {
    return(
      <SigninPresenter mapRef={this.mapRef}/>
    )
  }
}

export default LoginContainer;