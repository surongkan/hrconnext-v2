import React from "react";
import {Avatar, Popover} from "antd";
import {useAuth} from "../../../util/use-auth";

const UserProfile = () => {
  const {signOut} = useAuth();

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li>Connections</li>
      <li onClick={() => signOut()}>Logout
      </li>
    </ul>
  );

  return (

    <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
      <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
        <Avatar src={"/images/avatar/avatar-17.jpg"}
                className="gx-size-50 gx-pointer gx-mr-3" alt=""/>
        <span className="gx-avatar-name">Somjai T.<i
          className="icon icon-chevron-down gx-fs-xxs gx-ml-2"/></span>
      </Popover>
    </div>

  )
};

export default UserProfile;
