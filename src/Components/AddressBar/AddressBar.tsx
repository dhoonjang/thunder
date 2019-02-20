import React from "react";
import styled from "../../typed-components";

const Container = styled.input`
  position: absolute;
  background-color: white;
  border-radius: 5px;
  -webkit-appearance: none;
  width: 450px;
  border: 0;
  font-size: 15px;
  padding: 10px 10px;
  box-shadow: 0 18px 35px rgba(50, 50, 93, 0.1), 0 8px 15px rgba(0, 0, 0, 0.07);
  margin: auto;
  top: 10px;
  left: 0;
  right: 0;
  height: auto;
`;

interface IProps {
  value: string;
  onBlur: any;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressBar: React.SFC<IProps> = ({ value, onBlur, onChange, name }) => (
  <Container
    value={value}
    onSubmit={onBlur}
    onBlur={onBlur}
    onChange={onChange}
    placeholder={"Type address"}
    name={name}
  />
);

export default AddressBar;