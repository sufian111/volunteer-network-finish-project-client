import React from "react";
import AdminSlider from "../AdminSecton/AdminSlideBar/AdminSlider";
import UserTable from "../UserTable/UserTable";

const UserList = () => {
  return (
    <>
      <AdminSlider title="Volunteer register list"></AdminSlider>
      <UserTable></UserTable>
    </>
  );
};

export default UserList;
