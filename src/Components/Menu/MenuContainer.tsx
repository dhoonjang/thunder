import React from "react";
import MenuPresenter from "./MenuPresenter";
import { Query } from "react-apollo";
import { userProfile } from "src/types/api";
import { USER_PROFILE } from "src/sharedQueries.q";

class ProfileQuery extends Query<userProfile> { }

const MenuContainer = () => {
  return (
    <ProfileQuery query={USER_PROFILE}>
        {({ data, loading }) => (
          <MenuPresenter data={data} loading={loading}/>
        )}
    </ProfileQuery>
  );
}

export default MenuContainer;