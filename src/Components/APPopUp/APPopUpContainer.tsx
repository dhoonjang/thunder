import React from "react";
import PlacesPresenter from "./APPopUpPresenter";
import { Mutation } from "react-apollo";
import { addPlace, addPlaceVariables } from "src/types/api";
import { ADD_PLACE } from "./AddPlaceQuery.q";
import { toast } from "react-toastify";

interface IState {
  name: string;
  lat: number;
  lng: number;
  explanation: string;
  address: string;
}

interface IProps {
  lat: number;
  lng: number;
  address: string;
  finishFn: any;
}

class AddPlaceMutation extends Mutation<addPlace, addPlaceVariables> { }

class APPopUpContainer extends React.Component<IProps, IState> {
  public state = {
    name: "",
    explanation: "",
    lat: this.props.lat,
    lng: this.props.lng,
    address: this.props.address
  };

  constructor(props) {
    super(props);
  }

  public render() {
    const { name, explanation, address, lat, lng } = this.state;
    return (
      <AddPlaceMutation
        mutation={ADD_PLACE}
        variables={{
          address,
          lat,
          lng,
          name,
          explanation
        }}
        onCompleted={data => {
          const { AddPlace } = data;
          if (AddPlace.ok) {
            toast.success("Place added!");
            this.props.finishFn();
          } else {
            toast.error(AddPlace.error);
          }
        }}
      >
        {(addPlaceFn, { loading }) => (
          <PlacesPresenter
            name={name}
            address={address}
            explanation={explanation}
            onInputChange={this.onInputChange}
            loading={loading}
            onSubmit={addPlaceFn}
          />
        )}
      </AddPlaceMutation>
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
}

export default APPopUpContainer;