import React from "react";
import LoginPresenter from "./LogInPresenter";
import { loadMap } from "src/utils/MapFunctions";

interface IProps {
  google: any;
}
class LoginContainer extends React.Component<IProps> {
  public mapRef: any;
  public map: google.maps.Map;
  public state = {
    email: "",
    password: ""
  }
  constructor(props){
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {
    loadMap(37.2799,127.0443, this.map, this.mapRef, this.props.google);
  }
  public render() {
    const {email, password} = this.state;
    return(
      <LoginPresenter 
        email={email}
        password={password}
        mapRef={this.mapRef} 
        onInputChange={this.onInputChange}
      />
    )
  }
  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const {
      target: {name, value}
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default LoginContainer;