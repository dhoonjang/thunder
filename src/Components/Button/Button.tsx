import React from "react";
import styled from "../../typed-components";

const Container = styled.input`
  width: 100%;
  background-color: ${props => props.theme.blackColor};
  color: white;
  text-transform: uppercase;
  padding: 10px 0;
  font-size: 15px;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  &:active,
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

interface IProps {
  value: string;
  onClick?: any;
  disabled?: boolean;
  className?: string;
}

const Button: React.SFC<IProps> = ({
  value,
  onClick = null,
  disabled = false,
  className
}) => (
  <Container
    value={value}
    onClick={onClick}
    disabled={disabled}
    className={className}
    type={"submit"}
  />
);

export default Button;