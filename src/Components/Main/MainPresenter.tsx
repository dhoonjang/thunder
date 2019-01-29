import React from "react";
import styled from "src/typed-components";
import Button from "../Button";
import Male from "src/images/maleicon.svg";
import Female from "src/images/femaleicon.svg";

const Container = styled.div `
  position: absolute;
  margin: auto;
  width: 350px;
  height: 350px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 10px;
  align-items: center;
  background-color: ${props => props.theme.greyColor}
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`
const Header = styled.div`
  text-align: center;
  font-size: 23px;
  font-weight: 800;
  width: 100%;
  background-color: ${props => props.theme.mintColor}
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
  border-radius: 10px;
  padding: 13px;
  color: ${props => props.theme.blackColor}
`
const Body = styled.div`
  padding: 15px;
`
const SButton = styled(Button)`
  margin-top: 50px;
`
const Name = styled.div`
  margin: 10px;
  font-size: 20px;
  font-weight: 600;
  padding: 15px;
`
const SSpan = styled.span`
  font-size: 16px;
  font-weight: 800;
`
const Info = styled.div`
  fonst-size: 16px;
  margin: 15px;
`
const Icon = styled.img`
  width: 18px;
`

interface IProps {
  name: string;
  gender: string;
  age: number;
  isVerified: boolean;
}
const MainPresenter: React.SFC<IProps> = ({
  name,
  gender,
  age,
  isVerified
}) => {
  return (
    <Container>
      <Header>thunder</Header>
      <Body>
        <Name>{name} 님</Name>
        <Info>성별: {gender === "male"? 
          <SSpan>남성 <Icon src={Male}/></SSpan> : <SSpan>여성 <Icon src={Female}/></SSpan>
        }</Info>
        <Info>나이: <SSpan>{age}</SSpan></Info>
        <Info>인증여부: {isVerified ? <SSpan>O</SSpan> : <SSpan>X</SSpan>} </Info>
      </Body>
      <SButton value="Start"/>
    </Container>
  )
}

export default MainPresenter;