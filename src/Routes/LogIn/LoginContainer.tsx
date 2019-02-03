import React from "react";
import LoginPresenter from "./LogInPresenter";
import { Mutation } from "react-apollo";
import { loadMap } from "src/utils/MapFunctions";
import { LOG_USER_IN } from "src/sharedQueries";
import { toast } from "react-toastify";
import { LOG_IN } from "./LogInQueries.q";
import { logIn, logInVariables } from "src/types/api";

interface IProps {
  google: any;
}

class LoginMutation extends Mutation<logIn, logInVariables> {}

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
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <LoginMutation 
            mutation={LOG_IN}
            variables={
              {
                email,
                password
              }
            }
            onCompleted={data => {
              const { LogIn } = data;
              if (LogIn.ok) {
                logUserIn({
                  variables: {
                    token: LogIn.token
                  }
                });
              } else {
                toast.error(LogIn.error);
              }
            }}
          >
            {(logInfunc, {loading})=>{
              return (
                <LoginPresenter 
                  email={email}
                  password={password}
                  mapRef={this.mapRef} 
                  onInputChange={this.onInputChange}
                  submitFn={logInfunc}
                />
              )
            }}
          </LoginMutation>
        )}
      </Mutation>
      
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