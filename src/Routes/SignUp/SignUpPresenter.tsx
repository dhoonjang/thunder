import React from "react";
import Helmet from "react-helmet";
import Main from "src/Components/Main";
import Button from "src/Components/Button";
import styled from "src/typed-components";
import Form from "src/Components/Form";
import Input from "src/Components/Input";
import { MutationFn } from "react-apollo";

const Container = styled.div``;
const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.3;
`;
const RadioBox = styled.div`
  font-weight: 500; 
  font-size: 15px;
  padding: 10px;
  padding-left: 20px;
  width: 100%;
  background-color: white;
  color: ${props=>props.theme.blackColor}
  margin-bottom: 10px;
`
const RadioLabel = styled.label`
  margin: 10px;
  margin-left: 15px;
  padding-bottom: 10px;
  width: 100%;
`;
const RadioButton = styled(Input)`
  display: inline;
  width: 10px;
`;
const SButton = styled(Button)`
  margin-top: 5px;
  padding: 10px 0px; 
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
  height: 330px;
`

interface IProps {
  name: string;
  password: string;
  email: string;
  mapRef: any;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  submitFn: MutationFn;
}
const SigninPresenter: React.SFC<IProps> = ({
  name,
  password,
  email,
  mapRef,
  onInputChange,
  submitFn
}) => {
  return (
    <Container>
      <Helmet>
        <title>Sign Up | Thunder</title>
      </Helmet>
      <Map ref={mapRef} />
      <SMain title={"Sign Up"}>
        <SForm submitFn={submitFn}>
          <SInput placeholder={"NAME"} value={name} name={"name"} onChange={onInputChange}/>
          <SInput placeholder={"E-MAIL"} value={email} name={"email"} onChange={onInputChange}/>
          <SInput type={"password"} placeholder={"PASSWORD"} value={password} name={"password"} onChange={onInputChange}/>
          <RadioBox>
            GENDER:
            <RadioLabel>
              Male <RadioButton type={"radio"} value={"male"} name={"gender"} onChange={onInputChange}/>
            </RadioLabel>
            <RadioLabel>
              Female <RadioButton type={"radio"} value={"female"} name={"gender"} onChange={onInputChange}/>
            </RadioLabel>
          </RadioBox>
          <SButton value="Sign Up" />
        </SForm>
      </SMain>
    </Container>
  )
};

export default SigninPresenter;