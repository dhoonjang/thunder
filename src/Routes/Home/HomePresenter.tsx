import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "src/typed-components";
import Menu from "src/Components/Menu";
import Main from "src/Components/Main";
import Button from "src/Components/Button";
import Male from "src/images/maleicon.svg";
import Female from "src/images/femaleicon.svg";
import { MutationFn } from "react-apollo";

const Container = styled.div``;
const StatusWindow = styled.div`
  position: absolute;
  z-index: 3;
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
  margin-left: 220px;
  margin-top: 30px;
  width: 130px;
  height: 40px;
  background-color: ${props => props.theme.blueColor}
  color: white;
  font-size: 17px;
  text-align: center;
  padding-top: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
  cursor: pointer;
`
const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.3;
`;
const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 00px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;
const Body = styled.div`
  padding: 15px;
`
const SButton = styled(Button)`
  margin-top: 10px;
`
const Name = styled.div`
  margin: 10px;
  margin-top: 0px;
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
const SInfo = styled(Info)`
  height: 35px;
`
const Intro = styled.span`
  font-size: 13px;
  font-weight: 700;
`
const Icon = styled.img`
  width: 18px;
`

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: any;
  mapRef: any;
  data: any;
  loading: boolean;
  coupleStatus: string;
  findCoupleFn: MutationFn;
  cancelCoupleFn: MutationFn;
  resetFn: any;
}

const HomePresenter: React.SFC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  mapRef,
  data,
  loading,
  findCoupleFn,
  coupleStatus,
  cancelCoupleFn,
  resetFn
}) => {
  const { GetMyProfile = {} } = data;
  const { user = null } = GetMyProfile;
  return (
    <Container>
      <Helmet>
        <title>Home | Thunder</title>
      </Helmet>
      <Sidebar
        sidebar={<Menu />}
        open={isMenuOpen}
        onSetOpen={toggleMenu}
        styles={{
          sidebar: {
            backgroundColor: "white",
            width: "200px",
            zIndex: "10"
          }
        }}
      >
        {!loading ? <MenuButton onClick={toggleMenu}>|||</MenuButton> : "loading"}
      </Sidebar>
      <Map ref={mapRef} />
      <Main title={"thunder"}>
        {coupleStatus === "none" ? null : 
          <StatusWindow onClick={coupleStatus === "CANCELED"? resetFn : null}>
            {coupleStatus}
          </StatusWindow>
        }
        <Body>
          <Name>{!loading? user.name : "loading"} 님</Name>
          <Info>
            성별: {
              !loading? (user.gender === "male" ?
              <SSpan>남성 <Icon src={Male} /></SSpan> : <SSpan>여성 <Icon src={Female} /></SSpan>): "loading"
            }
          </Info>
          <Info>
            나이: <SSpan>{!loading? (user.age? user.age : "없음") : "loading"}</SSpan>
          </Info>
          <Info>
            인증여부: {
              !loading? (user.isVerified ? <SSpan>O</SSpan> : <SSpan>X</SSpan>) : "loading"
            }
          </Info>
          <SInfo>
            소개: <Intro>{!loading? (user.introduction? user.introduction : "없음") : "loading"}</Intro>
          </SInfo>
        </Body>
        <SButton 
          value={coupleStatus === "none" ? "Start" : "Cancel"} 
          onClick={coupleStatus === "none" ? findCoupleFn : 
            () => cancelCoupleFn({
              variables: {coupleId: user.coupleId}
            })
          }
        />
      </Main>
    </Container>
  )
};

export default HomePresenter;