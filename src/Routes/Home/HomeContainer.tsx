import React from "react";
import { RouteComponentProps } from "react-router";
import HomePresenter from "./HomePresenter";
import { loadMap } from "src/utils/MapFunctions";
import { Query, Mutation, MutationFn } from "react-apollo";
import { userProfile, findCouple, requestCouple, cancelCouple, cancelCoupleVariables, getMyCouple } from "src/types/api";
import { USER_PROFILE } from "src/sharedQueries.q";
import { REQUEST_COUPLE, FIND_COUPLE, GET_MY_COUPLE, CANCEL_COUPLE } from "./HomeQueries.q";
import { toast } from "react-toastify";

interface IProps extends RouteComponentProps<any> {
  google: any;
}
interface IState {
  isMenuOpen: boolean;
  isSearching: boolean;
  coupleStatus: string;
}

class ProfileQuery extends Query<userProfile> { }
class MyCoupleQuery extends Query<getMyCouple> { }
class FindCoupleMutation extends Mutation<findCouple> { }
class RequestCoupleMutation extends Mutation<requestCouple> { }
class CancelCoupleMutation extends Mutation<cancelCouple, cancelCoupleVariables> { }

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public client: any;
  public user;
  public requestCoupleFn: MutationFn;
  public findCoupleFn: MutationFn;
  public cancelCoupleFn: MutationFn;
  public stopPolling: any;
  public startPolling: any;

  public state = {
    isMenuOpen: false,
    isSearching: false,
    coupleStatus: "none"
  }

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  public componentDidMount() {
    loadMap(37.2799, 127.0443, this.map, this.mapRef, this.props.google);
  }

  public render() {
    const { isMenuOpen, coupleStatus, isSearching } = this.state;
    console.log(coupleStatus, isSearching);
    return (
      <ProfileQuery
        query={USER_PROFILE}
        fetchPolicy={"cache-and-network"}
        onCompleted={this.handleMyProfile}
      >
        {({ data: userData, loading }) => {
          return (
            <MyCoupleQuery
              query={GET_MY_COUPLE}
              pollInterval={4000}
              skip={loading ? true : !isSearching}
              onCompleted={this.handleMyCouple}
            >
              {() => {
                return (
                  <FindCoupleMutation
                    mutation={FIND_COUPLE}
                    awaitRefetchQueries={true}
                    refetchQueries={[{ query: USER_PROFILE }]}
                    onCompleted={this.handleFindCouple}
                    update={(cache, { data }) => {
                      if (data && "FindCouple" in data) {
                        const { FindCouple: { ok, couple, user: updateUser } } = data;
                        if (ok && couple && updateUser) {
                          cache.writeQuery({
                            query: USER_PROFILE,
                            data: {
                              user: {
                                coupleId: updateUser.coupleId,
                                isMatched: true
                              }
                            },
                          });
                          console.log("find couple cache");
                        }
                      }
                    }}
                  >
                    {(findCoupleFn) => {
                      return (
                        <RequestCoupleMutation
                          mutation={REQUEST_COUPLE}
                          refetchQueries={[{ query: USER_PROFILE }]}
                          onCompleted={this.handleRequestCouple}
                          update={(cache, { data }) => {
                            if (data && "RequestCouple" in data) {
                              const { RequestCouple: { ok, couple, user: updateUser } } = data;
                              if (ok && couple && updateUser) {
                                console.log(updateUser);
                                cache.writeQuery({
                                  query: USER_PROFILE,
                                  data: {
                                    user: updateUser
                                  },
                                });
                                console.log("cache update");
                              }
                            }
                          }}
                        >
                          {(requestCoupleFn) => {
                            this.requestCoupleFn = requestCoupleFn;
                            return (
                              <CancelCoupleMutation
                                mutation={CANCEL_COUPLE}
                                awaitRefetchQueries={true}
                                refetchQueries={[{ query: USER_PROFILE }, { query: GET_MY_COUPLE }]}
                                onCompleted={this.handleCancelCouple}
                                update={(cache, { data }) => {
                                  if (data && "ChangeCouple" in data) {
                                    const { ChangeCouple: { ok } } = data;
                                    if (ok) {
                                      cache.writeQuery({
                                        query: USER_PROFILE,
                                        data: {
                                          user: {
                                            coupleId: null,
                                            isMatched: false
                                          }
                                        },
                                      });
                                      console.log("cache update");
                                    }
                                  }
                                }}
                              >
                                {(cancelCoupleFn) => {
                                  this.cancelCoupleFn = cancelCoupleFn;
                                  return (
                                    <HomePresenter
                                      isMenuOpen={isMenuOpen}
                                      toggleMenu={this.toggleMenu}
                                      mapRef={this.mapRef}
                                      data={userData}
                                      loading={loading}
                                      coupleStatus={coupleStatus}
                                      findCoupleFn={findCoupleFn}
                                      cancelCoupleFn={cancelCoupleFn}
                                      resetFn={this.resetFn}
                                    />
                                  )
                                }}
                              </CancelCoupleMutation>
                            )
                          }}
                        </RequestCoupleMutation>
                      )
                    }}
                  </FindCoupleMutation>
                )
              }}
            </MyCoupleQuery>
          )
        }
        }
      </ProfileQuery>
    )
  }

  public resetFn = () => {
    this.setState({
      coupleStatus: "none",
      isSearching: false
    })
  }

  public handleMyProfile = async (res: userProfile) => {
    const { GetMyProfile: { user } } = res;
    console.log(user);
    this.user = user;
    if (user) {
      if (user.coupleId && !this.state.isSearching) {
        this.setState({
          isSearching: true
        })
      } else if (!user.coupleId && this.state.isSearching) {
        this.setState({
          coupleStatus: "none",
          isSearching: false
        })
      }
    }
  }

  public handleFindCouple = async (res) => {
    console.log("handlefindCoupleFn");
    const { FindCouple } = res;
    if (FindCouple.ok) {
      if (FindCouple.couple) {
        this.setState({
          coupleStatus: "MATCHING",
          isSearching: true
        })
        toast.success("Find your Partner!!!");
      } else {
        this.requestCoupleFn();
      }
    } else {
      toast.error(FindCouple.error);
    }
  }

  public handleRequestCouple = (res) => {
    console.log("handleRequestCoupleFn");
    const { RequestCouple } = res;
    if (RequestCouple.ok) {
      toast.success("Requesting Couple!");
      this.setState({
        coupleStatus: "REQUESTING",
        isSearching: true
      })
      console.log(RequestCouple.couple)
    } else if (RequestCouple.error) {
      toast.error(RequestCouple.error);
    }
  }

  public handleCancelCouple = (res) => {
    console.log("handleCancelCoupleFn");
    if ("ChangeCouple" in res) {
      const { ChangeCouple } = res;
      if (ChangeCouple.ok) {
        this.setState({
          coupleStatus: "CANCELED",
          isSearching: false
        })
        toast.success("Request is canceled.");
        console.log(ChangeCouple.coupleId)
      } else if (ChangeCouple.error) {
        toast.error(ChangeCouple.error);
      }
    }
  }

  public handleMyCouple = (res) => {
    console.log("handleMYCoupleFn");
    if ("GetMyCouple" in res) {
      const { GetMyCouple } = res;
      if (GetMyCouple.ok && GetMyCouple.couple) {
        const { couple } = GetMyCouple;
        console.log(couple);
        if (couple.status !== this.state.coupleStatus && this.state.isSearching) {
          this.setState({
            coupleStatus: couple.status
          })
          if (couple.status === "MATCHING") {
            toast.success("Find your Partner!!!");
          } else if (couple.status === "CANCELED") {
            if (this.user.isMatched && this.user.coupleId) {
              this.cancelCoupleFn({
                variables: { coupleId: this.user.coupleId }
              });
            }
            this.setState({
              isSearching: false
            })
            toast.success("Request is canceled.");
          } else if (couple.status === "REQUESTING") {
            toast.success("Requesting Couple!");
          }
        }
      } else if (!GetMyCouple.ok) {
        console.log(GetMyCouple.error);
      }
    }
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