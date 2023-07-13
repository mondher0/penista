/* eslint-disable react-hooks/exhaustive-deps */
import { isNotificated } from "../../../assets/index";
import axiosInstance from "../../../utils/axiosInstance";
import { baseUrl } from "../../../utils/constants";
import { useEffect, useState } from "react";

const NotificationCard = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [asRead, setAsRead] = useState([]);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseUrl}notification/admin/?page=${currentPage}`
      );
      console.log(currentPage);
      console.log(response);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        ...response.data.data.notifications,
      ]);
      setCurrentPage((prevPage) => prevPage + 1);
      setPages(response.data.data.pages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      const response = await axiosInstance.put(
        `${baseUrl}notification/admin/read/${id}/`
      );
      console.log(response);
      setAsRead((prevRead) => [...prevRead, id]);
    } catch (error) {
      console.log(error);
    }
  };

  // Load more notifications when scrolling to the bottom of the notification card
  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    const rounder = Math.round(scrollTop + clientHeight);
    if (rounder === scrollHeight) {
      if (currentPage <= pages) fetchNotifications();
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const today = new Date();

  return (
    <div className="notification-card" onScroll={handleScroll}>
      {notifications.map((notification, index) => {
        let createdAt = notification.createdAt;
        let dateObj = new Date(createdAt);
        let hour = dateObj.getHours();
        let minute = dateObj.getMinutes();
        minute = String(minute).padStart(2, "0");

        const isToday = dateObj.toDateString() === today.toDateString();

        return (
          <div
            className="notification"
            key={index}
            onClick={() => markAsRead(notification.id)}
          >
            {!asRead.includes(notification.id) && !notification.is_read && (
              <img src={isNotificated} alt="isNotificated" />
            )}
            <div className="single-not">
              <img
                src={`${baseUrl}static${notification.client_image.image}`}
                alt="Avatar"
              />
              <div className="txt">
                <p className="not">{notification.message}</p>
                {isToday && (
                  <p className="time">
                    Aujourd{"'"}hui à {hour}:{minute}
                  </p>
                )}
                {!isToday && (
                  <p className="time">
                    Hier à {hour}:{minute}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default NotificationCard;
