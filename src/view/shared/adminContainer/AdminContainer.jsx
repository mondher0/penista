import { Outlet } from "react-router-dom";
import SideBar from "../sideBar/SideBar";
import "./AdminContainer.css";

const AdminContainer = () => {
  return (
    <div className="admin-container">
      <SideBar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminContainer;
