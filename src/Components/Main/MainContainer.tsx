import React from "react";
import MainPresenter from "./MainPresenter";

class MainContainer extends React.Component {
  public render() {
    return (
      <MainPresenter name={"장동훈"} age={21} gender={"male"} isVerified={false} />
    )
  }
}

export default MainContainer;