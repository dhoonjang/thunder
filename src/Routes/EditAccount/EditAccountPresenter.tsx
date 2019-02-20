import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import styled from "../../typed-components";
import Main from "src/Components/Main";
import Sidebar from "react-sidebar";
import Menu from "src/Components/Menu";

const Container = styled.div``;
const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.3;
`;
const ExtendedForm = styled(Form)`
  margin-top: 30px;
`;

const ExtendedInput = styled(Input)`
  padding-left: 20px;
  margin-bottom: 10px;
`;
const SInput = styled(ExtendedInput)`
  font-size: 15px;
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
const SMain = styled(Main)`
  height: 310px;
`
interface IProps {
  name: string;
  email: string;
  age: string | null;
  introduction: string | null;
  gender: string;
  onSubmit: MutationFn;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  mapRef: any;
  isMenuOpen: boolean;
  toggleMenu: any;
}

const EditAccountPresenter: React.SFC<IProps> = ({
  name,
  mapRef,
  age,
  gender,
  introduction,
  email,
  onSubmit,
  onInputChange,
  loading,
  isMenuOpen,
  toggleMenu
}) => (
    <Container>
      <Helmet>
        <title>Edit Account | Number</title>
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
      <SMain title={"Edit Account"}>
        <ExtendedForm submitFn={onSubmit}>
          <ExtendedInput
            onChange={onInputChange}
            type={"text"}
            value={name}
            placeholder={"NAME"}
            name={"name"}
          />
          <ExtendedInput
            onChange={onInputChange}
            type={"email"}
            value={email}
            placeholder={"E-MAIL"}
            name={"email"}
          />
          <ExtendedInput
            className={"age"}
            onChange={onInputChange}
            type={"number"}
            value={age? age : ""}
            placeholder={"AGE"}
            name={"age"}
          />
          <SInput
            onChange={onInputChange}
            type={"text"}
            value={introduction? introduction: ""}
            placeholder={"INTRODUCTION"}
            name={"introduction"}
          />
          <Button onClick={null} value={loading ? "Loading" : "Profile Update"} />
        </ExtendedForm>
      </SMain>
    </Container>
  );

export default EditAccountPresenter;