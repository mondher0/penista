/* eslint-disable react/prop-types */
import { search, actifNotification, avatar } from "../../../assets/index";
import "./NavBar.css";
import NotificationCard from "./NotificationCard";
import { useState } from "react";
const NavBar = ({ title }) => {
  const [showNotification, setShowNotification] = useState(false);
  return (
    <>
      <nav className="navbar">
        <div className="title">
          <h2>{title}</h2>
        </div>
        <div className="profile">
          <div className="icons">
            <img src={search} alt="Rechercher" />
            <img
              src={actifNotification}
              alt="Notification"
              onClick={() => setShowNotification(!showNotification)}
            />
          </div>
          <div className="divider"></div>
          <div className="user-info">
            <p>Mondher Mameri</p>
            <div className="user-img">
              <img src={avatar} alt="Avatar" />
            </div>
          </div>
        </div>
        {showNotification && <NotificationCard />}
      </nav>
    </>
  );
};

export default NavBar;
