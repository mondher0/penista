/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { actifNotification, emptyNot } from "../../../assets/index";
import { baseUrl } from "../../../utils/constants";
import axiosInstance from "../../../utils/axiosInstance";
import "./NavBar.css";
import NotificationCard from "./NotificationCard";
import { useEffect, useState } from "react";
const NavBar = ({ title }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isNotificated, setIsNotificated] = useState(false);

  // get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}accounts/userinfo/`);
      const response1 = await axiosInstance.get(
        `${baseUrl}notification/admin/`
      );
      setIsNotificated(response1.data.data.unread);
      const { first_name, last_name, image } = response.data.data;
      setUserInfo({ first_name, last_name, image });
    } catch (error) {}
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
            <img
              src={isNotificated ? actifNotification : emptyNot}
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
              <img
                src={userInfo.image ? `${baseUrl}${userInfo.image}` : null}
                alt="Avatar"
              />
            </div>
          </div>
        </div>
        {showNotification && <NotificationCard />}
      </nav>
    </>
  );
};

export default NavBar;
