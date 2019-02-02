import React from "react";
import styled from "src/typed-components";

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
interface IProps {
  className?: string;
}

const MainPresenter: React.SFC<IProps> = ({ className, children}) => {
  return (
    <Container className={className}>
      <Header>thunder</Header>
      {children}
    </Container>
  )
}

export default MainPresenter;