import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { updateProfile, updateProfileVariables, userProfile } from "../../types/api";
import EditAccountPresenter from "./EditAccountPresenter";
import { UPDATE_PROFILE } from "./EditAccountQueries.q";
import { USER_PROFILE } from "src/sharedQueries.q";
import { toast } from "react-toastify";
import { loadMap } from "src/utils/MapFunctions";

interface IState {
  isMenuOpen: boolean;
  name: string;
  gender: string;
  age: string | null;
  email: string;
  introduction: string | null;
}

interface IProps extends RouteComponentProps<any> { 
  google: any;
}

class UpdateProfileMutation extends Mutation<
  updateProfile,
  updateProfileVariables
  > { }

class ProfileQuery extends Query<userProfile> { }

class EditAccountContainer extends React.Component<IProps, IState> {
  public queryFinished = 0;
  public mapRef: any;
  public map: google.maps.Map;
  public state = {
    isMenuOpen: false,
    name: "",
    age: null,
    email: "",
    gender: "",
    introduction: ""
  };
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {
    loadMap(37.2799, 127.0443, this.map, this.mapRef, this.props.google);
  }
  public render() {
    const { email, name, age, gender, isMenuOpen, introduction } = this.state;
    return (
      <ProfileQuery
        query={USER_PROFILE}
        fetchPolicy={"cache-and-network"}
        onCompleted={this.updateFields}
      >
        {() => (
          <UpdateProfileMutation
            mutation={UPDATE_PROFILE}
            refetchQueries={[{ query: USER_PROFILE }]}
            onCompleted={data => {
              const { UpdateMyProfile } = data;
              if (UpdateMyProfile.ok) {
                toast.success("Profile updated!");
              } else if (UpdateMyProfile.error) {
                toast.error(UpdateMyProfile.error);
              }
            }}
            variables={{
              email,
              name,
              gender,
              age,
              introduction
            }}
          >
            {(updateProfileFn, { loading }) => {
              return (
                <EditAccountPresenter
                  isMenuOpen={isMenuOpen}
                  mapRef={this.mapRef}
                  email={email}
                  name={name}
                  gender={gender}
                  introduction={introduction}
                  age={age}
                  onInputChange={this.onInputChange}
                  loading={loading}
                  onSubmit={updateProfileFn}
                  toggleMenu={this.toggleMenu}
                />
              )
            }}
          </UpdateProfileMutation>
        )}
      </ProfileQuery>
    );
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  public updateFields = (data: {} | userProfile) => {
    if ("GetMyProfile" in data) {
      const {
        GetMyProfile: { user }
      } = data;
      if (user !== null) {
        const { name, email, gender, age, introduction } = user;
        if (this.queryFinished < 3) {
          this.queryFinished=this.queryFinished+1;
          if(age){
            this.setState({
              age: age.toString()
            })
          }
          this.setState({
            email,
            name,
            gender,
            introduction
          } as any);
        }
      }
    }
  };

  public toggleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
      };
    });
  };
}

export default EditAccountContainer;