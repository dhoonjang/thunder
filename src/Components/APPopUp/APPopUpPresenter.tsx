import React from "react";
import styled from "src/typed-components";
import Main from "../Main";
import Input from "../Input";
import { MutationFn } from "react-apollo";
import Form from "../Form";
import Button from "../Button";

const ExtendedForm = styled(Form)`
  margin-top: 25px;
`;

const ExtendedInput = styled(Input)`
  padding: 5px;
  padding-left: 15px;
  padding-bottom: 8px;
  margin-bottom: 10px;
  font-size: 15px;
`;

const SInput = styled(ExtendedInput)`
  font-size: 13px;
`
const SButton = styled(Button)`
  margin-top: 5px;
  fonst-zie: 15px;
  padding: 8px;
`
const SMain = styled(Main)`
  height: 250px;
`

interface IProps {
  name: string;
  explanation: string;
  address: string;
  onSubmit: MutationFn;
  loading: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const APPopUpPresenter: React.SFC<IProps> = ({ address, name, explanation, loading, onSubmit, onInputChange }) => {
  return (
    <SMain title={"Add Place"}>
      <ExtendedForm submitFn={onSubmit}>
        <ExtendedInput
          onChange={onInputChange}
          type={"text"}
          value={name}
          placeholder={"NAME"}
          name={"name"}
        />
        <SInput
          onChange={onInputChange}
          type={"text"}
          value={explanation}
          placeholder={"EXPLANATION"}
          name={"explanation"}
        />
        <SInput
          onChange={onInputChange}
          type={"text"}
          value={address}
          placeholder={"ADDRESS"}
          name={"address"}
        />
        <SButton onClick={null} value={loading ? "Loading" : "Add Place"} />
      </ExtendedForm>
    </SMain>
  )
}

export default APPopUpPresenter;