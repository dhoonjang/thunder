import React from "react";
import Helmet from "react-helmet";
import Main from "src/Components/Main";
import Button from "src/Components/Button";
import styled from "src/typed-components";
import Form from "src/Components/Form";
import Input from "src/Components/Input";
import { Link } from "react-router-dom";

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
  mapRef: any;
}
const LoginPresenter: React.SFC<IProps> = ({mapRef}) => {
  return (
    <Container>
      <Helmet>
        <title>Log In | Thunder</title>
      </Helmet>
      <Map ref={mapRef} />
      <SMain>
        <SForm submitFn={null}>
          <SInput placeholder={"E-MAIL"} value={""} name={"email"} onChange={null}/>
          <SInput type={"password"} placeholder={"PASSWORD"} value={""} name={"password"} onChange={null}/>
          <SButton value="Log In" />
        </SForm>
        <Link to="/signin"><SignButton value="Sign In" /></Link>
      </SMain>
    </Container>
  )
};

export default LoginPresenter;