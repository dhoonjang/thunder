import React from "react";
import styled from "../../typed-components";

const Container = styled.input`
  border: none;
  border-bottom: 2px solid ${props => props.theme.greyColor};
  font-size: 20px;
  width: 100%;
  padding-bottom: 10px;
  font-weight: 500;
  transition: border-bottom 0.1s linear;
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset !important;
  }
  &:focus {
    border-bottom-color: #2c3e50;
    outline: none;
  }
  &::placeholder {
    font-weight: 300;
  }
`;

interface IProps {
  placeholder?: string;
  type?: string;
  required?: boolean;
  value: string;
  name?: string;
  onChange: any;
  className?: string;
  min?: string;
  max?: string;
  maxLength?: number;
}

const Input : React.SFC<IProps> = ({ 
  placeholder = "",
  type = "text", 
  required = true, 
  value,
  name = "",
  onChange,
  className,
  min = "20",
  max = "50",
  maxLength = 50
}) => (
  <Container
    className={className}
    onChange={onChange}
    type={type} 
    required={required} 
    value={value} 
    placeholder={placeholder} 
    name={name}
    autoComplete={"off"}
    min={min}
    max={max}
    maxLength={maxLength}
  />
);

export default Input;