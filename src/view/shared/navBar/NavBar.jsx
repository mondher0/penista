/* eslint-disable react/prop-types */
import { search, actifNotification, avatar } from "../../../assets/index";
import "./NavBar.css";
const NavBar = ({ title }) => {
  return (
    <nav className="navbar">
      <div className="title">
        <h2>{title}</h2>
      </div>
      <div className="profile">
        <div className="icons">
          <img src={search} alt="Rechercher" />
          <img src={actifNotification} alt="Notification" />
        </div>
        <div className="divider"></div>
        <div className="user-info">
          <p>Mondher Mameri</p>
          <div className="user-img">
            <img src={avatar} alt="Avatar" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
