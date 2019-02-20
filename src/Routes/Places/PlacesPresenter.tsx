import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";
import AddressBar from "src/Components/AddressBar";
import Button from "src/Components/Button";
import APPopUp from "src/Components/APPopUp";
import Sidebar from "react-sidebar";
import Menu from "src/Components/Menu";

const Container = styled.div``;
const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;
const Center = styled.div`
  position: absolute;
  width: 20px;
  height: 40px;
  font-size: 20px;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 00px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;
const ExtendedButton = styled(Button)`
  font-size: 15px;
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  height: auto;
  width: 450px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
`;

interface IProps {
  mapRef: any;
  address: string;
  onInputBlur: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPickPlace: () => void;
  isPicked: boolean;
  lat: number;
  lng: number;
  isMenuOpen: boolean;
  toggleMenu: any;
  loading: boolean;
}

class PlacesPresenter extends React.Component<IProps> {
  public render() {
    const {
      isMenuOpen,
      toggleMenu,
      mapRef,
      address,
      onInputChange,
      onInputBlur,
      onPickPlace,
      isPicked,
      loading,
      lat,
      lng
    } = this.props;
    return (
      <Container>
        <Helmet>
          <title>Places | Thunder</title>
        </Helmet>
        <Sidebar
          sidebar={<Menu />}
          open={isMenuOpen}
          onSetOpen={toggleMenu}
          styles={{
            sidebar: {
              backgroundColor: "white",
              width: "200px",
              zIndex: "10"
            }
          }}
        >
          {!loading ? <MenuButton onClick={toggleMenu}>|||</MenuButton> : "loading"}
        </Sidebar>
        <Map ref={mapRef} />
        <AddressBar
          onBlur={onInputBlur}
          onChange={onInputChange}
          name={"address"}
          value={address}
        />
        <ExtendedButton value={isPicked ? "Un Pick" : "Pick this place"} onClick={onPickPlace} />
        <Center>📍</Center>
        {isPicked ? <APPopUp finishFn={onPickPlace} lat={lat} lng={lng} address={address} /> : null}
      </Container>
    );
  }
}

export default PlacesPresenter;