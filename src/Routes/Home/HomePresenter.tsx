import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "src/typed-components";
import Menu from "src/Components/Menu";
import Main from "src/Components/Main";

const Container = styled.div``;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.3;
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

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: any;
  mapRef: any;
}
const HomePresenter: React.SFC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  mapRef
}) => (
  <Container>
    <Helmet>
      <title>Home | Thunder</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu/>}
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
      <MenuButton onClick={toggleMenu}>|||</MenuButton>
    </Sidebar>
    <Map ref={mapRef} />
    <Main />
  </Container>
);

export default HomePresenter;