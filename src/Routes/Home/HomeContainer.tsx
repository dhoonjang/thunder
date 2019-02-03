import React from "react";
import { RouteComponentProps } from "react-router";
import HomePresenter from "./HomePresenter";
import { loadMap } from "src/utils/MapFunctions";
import { Query } from "react-apollo";
import { userProfile } from "src/types/api";
import { USER_PROFILE } from "src/sharedQueries.q";

interface IProps extends RouteComponentProps<any> {
  google: any;
}
interface IState {
  isMenuOpen: boolean;
}

class ProfileQuery extends Query<userProfile> { }
class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public state = {
    isMenuOpen: false
  }
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {
    loadMap(37.2799, 127.0443, this.map, this.mapRef, this.props.google);
  }
  public render() {
    const { isMenuOpen } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data, loading }) => {
          return (
            <HomePresenter
              isMenuOpen={isMenuOpen}
              toggleMenu={this.toggleMenu}
              mapRef={this.mapRef}
              data={data}
              loading={loading}
            />
          )
        }
        }
      </ProfileQuery>
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