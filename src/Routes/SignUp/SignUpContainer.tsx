import React from "react";
import SigninPresenter from "./SignUpPresenter";
import { loadMap } from "src/utils/MapFunctions";

interface IProps {
  google: any;
}
class SigninContainer extends React.Component<IProps> {
  public mapRef: any;
  public map: google.maps.Map;
  public state = {
    email: "",
    name: "",
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
    const {email,name,password} = this.state;
    return(
      <SigninPresenter 
        mapRef={this.mapRef}
        email={email}
        name={name}
        password={password}
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

export default SigninContainer;