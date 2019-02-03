import React from "react";
import SignUpPresenter from "./SignUpPresenter";
import { loadMap } from "src/utils/MapFunctions";
import { Mutation } from "react-apollo";
import { signUp, signUpVariables } from "src/types/api";
import { SIGN_UP } from "./SignUpQueries.q";
import { toast } from "react-toastify";
import { RouteComponentProps } from "react-router-dom";

interface IProps {
  google: any;
}
interface IState {
  email: string;
  name: string;
  password: string;
}

class SignUpMutation extends Mutation<signUp, signUpVariables> { }
class SigninContainer extends React.Component<RouteComponentProps<IProps>, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public state = {
    email: "",
    gender: "male",
    name: "",
    password: ""
  }
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {
    loadMap(37.2799, 127.0443, this.map, this.mapRef, this.props.google);
  }
  public render() {
    const { email, name, password, gender } = this.state;
    const { history }= this.props;
    return (
      <SignUpMutation
        mutation={SIGN_UP}
        variables={
          {
            email,
            gender,
            name,
            password
          }
        }
        onCompleted={(data)=>{
          const { SignUp } = data;
          console.log(SignUp.token);
          if (SignUp.ok) {
            toast.success("Now, You can Log In!!!");
            history.push({
              pathname: "/login",
            });
          } else {
            toast.error(SignUp.error);
          }
        }}
      >
        {(signUpFunc, { loading }) => {
          return (
            <SignUpPresenter
              mapRef={this.mapRef}
              email={email}
              name={name}
              password={password}
              onInputChange={this.onInputChange}
              submitFn={signUpFunc}
            />
          )
        }}
      </SignUpMutation>
    )
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

}

export default SigninContainer;