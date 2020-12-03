import React from "react";
import plus from "../../../../Image/logos/plus 1.png";
import user from "../../../../Image/logos/users-alt 1.png";
import Logo from "../../../../Image/logos/Group 1329.png";
import "./AdminSlider.css";
import { Link } from "react-router-dom";

const AdminSlider = (props) => {
  return (
    <>
      <div className="sidbar">
        <div className="admin-logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <ul>
          <li>
            <Link to="/userList">
              <div className="icon">
                <img src={user} alt="user" />
              </div>
              Volunteer register list
            </Link>
          </li>
          <li>
            <Link to="/addEvent">
              <div className="icon">
                <img src={plus} alt="plus" />
              </div>
              Add event
            </Link>
          </li>
        </ul>
      </div>
      <div className="formtitle">
        <h3>{props.title}</h3>
      </div>
    </>
  );
};

export default AdminSlider;
