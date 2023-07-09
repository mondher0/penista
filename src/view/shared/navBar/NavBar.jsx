/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { search, actifNotification, avatar } from "../../../assets/index";
import { baseUrl } from "../../../utils/constants";
import axiosInstance from "../../../utils/axiosInstance";
import "./NavBar.css";
import NotificationCard from "./NotificationCard";
import { useEffect, useState } from "react";
const NavBar = ({ title }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}accounts/userinfo/`);
      console.log(response);
      const { first_name, last_name } = response.data.data;
      setUserInfo({ first_name, last_name });
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

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
              className="not-img"
              onClick={() => setShowNotification(!showNotification)}
            />
          </div>
          <div className="divider"></div>
          <div className="user-info">
            <p>
              {userInfo.first_name} {userInfo.last_name}
            </p>
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
