import React from "react";
import Helmet from "react-helmet";
import Main from "src/Components/Main";
import Button from "src/Components/Button";
import styled from "src/typed-components";
import Form from "src/Components/Form";
import Input from "src/Components/Input";
import { Link } from "react-router-dom";
import { MutationFn } from "react-apollo";

const Container = styled.div``;
const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.3;
`;
const SButton = styled(Button)`
  margin-top: 5px;
  padding: 10px 0px; 
`
const SignButton = styled(SButton)`
  padding: 5px 0px;
  font-size: 13px;
  background-color: ${props => props.theme.greenColor}
`
const SForm = styled(Form)`
  margin-top: 18px;
`
const SInput = styled(Input)`
  margin: 5px 0px;
  margin-bottom: 10px;
  padding: 10px;
  padding-left: 20px;
  font-size: 15px;
`
const SMain = styled(Main)`
  height: 255px;
`

interface IProps {
  password: string;
  email: string;
  mapRef: any;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  submitFn: MutationFn;
}
const LoginPresenter: React.SFC<IProps> = ({
  mapRef, 
  password, 
  email, 
  onInputChange, 
  submitFn
}) => {
  return (
    <Container>
      <Helmet>
        <title>Log In | Thunder</title>
      </Helmet>
      <Map ref={mapRef} />
      <SMain>
        <SForm submitFn={submitFn}>
          <SInput placeholder={"E-MAIL"} value={email} name={"email"} onChange={onInputChange}/>
          <SInput type={"password"} placeholder={"PASSWORD"} value={password} name={"password"} onChange={onInputChange}/>
          <SButton value="Log In" />
        </SForm>
        <Link to="/signup"><SignButton value="Sign Up" /></Link>
      </SMain>
    </Container>
  )
};

export default LoginPresenter;