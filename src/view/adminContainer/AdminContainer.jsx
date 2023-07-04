import SideBar from "../shared/SideBar";
import "./AdminContainer.css";

const AdminContainer = () => {
  return (
    <div className="admin-container">
      <SideBar />
      <div className="admin-content">this is the admin content</div>
    </div>
  );
};

export default AdminContainer;
