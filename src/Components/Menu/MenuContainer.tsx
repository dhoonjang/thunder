import React from "react";
import MenuPresenter from "./MenuPresenter";
import { Query, Mutation } from "react-apollo";
import { userProfile } from "src/types/api";
import { USER_PROFILE } from "src/sharedQueries.q";
import { LOG_USER_OUT } from "src/sharedQueries";

class ProfileQuery extends Query<userProfile> { }

const MenuContainer = () => {
  return (
    <Mutation mutation={LOG_USER_OUT}>
      {(logUserOut) => (
        <ProfileQuery query={USER_PROFILE}>
          {({ data, loading }) => (
            <MenuPresenter 
              data={data} 
              loading={loading}
              logOutFn={logUserOut}
            />
          )}
        </ProfileQuery>
      )}
    </Mutation>
  );
}

export default MenuContainer;