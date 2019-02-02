import React from "react";
import { Link } from "react-router-dom";
import styled from "../../typed-components";
import Button from "../Button";
import Male from "src/images/maleicon.svg";
import Female from "src/images/femaleicon.svg";

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  background-color: ${props => props.theme.blackColor};
  padding: 20px;
  height: 60px;
  margin-bottom: 30px;
  padding: 0 15px;
  color: white;
`;

const SLink = styled(Link)`
  font-size: 20px;
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
`;


const Name = styled.h2`
  font-size: 21px;
  padding-top: 20px;
  color: white;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


const AddPlace = styled(Button)`
  -webkit-appearance: none;
  background-color: ${props => props.theme.blueColor};
  margin-top: 10px;
  width: 100%;
  color: white;
  font-size: 16px;
  border: 0;
  padding: 10px 0px;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 20px;
`

interface IProps {
  name: string;
  gender: string;
  loading: boolean;
}

const MenuPresenter: React.SFC<IProps> = ({
  name,
  gender,
  loading
}) => (
  <Container>
    {!loading &&
      (
      <>
        <Header>
          <Name>
            {name} <Icon src={gender==="male" ? Male : Female }/>
          </Name>
        </Header>
        <SLink to="/edit-account">Edit Account</SLink>
        <SLink to="/settings">Settings</SLink>
        <button>Log Out</button>
        <AddPlace value={"Add Place"} onClick={null} />
      </>
    )}
  </Container>
);

export default MenuPresenter;