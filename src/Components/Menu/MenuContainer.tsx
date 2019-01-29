import React from "react";
import MenuPresenter from "./MenuPresenter";

const MenuContainer = () => {
  return (
    <MenuPresenter gender={"male"} name={"장동훈"} loading={false}/>
  );
}

export default MenuContainer;