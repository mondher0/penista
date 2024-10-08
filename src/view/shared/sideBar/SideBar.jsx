import "./SideBar.css";
import useAuthContext from "../../../hooks/useAuthContext";
import {
  logo,
  dashboard,
  produit,
  shoppingCart,
  users,
  settings,
  events,
  partenaire,
  offres,
  game,
  gift,
  ball,
  logout,
  quizz,
  warning,
} from "../../../assets/index";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const style = {
    textDecoration: "none",
    color: "white",
  };
  const { handleLogout } = useAuthContext();

  return (
    <aside className="sidebar">
      <img src={logo} alt="Logo" />
      <ul className="links">
        <NavLink to="/" activeclassname="active" style={style}>
          <li>
            <div className="link dashboard">
              <img src={dashboard} alt="Dashboard" />
              <p>Dashboard</p>
            </div>
          </li>
        </NavLink>
        <NavLink to="/produit" style={style}>
          <li>
            <div className="link produit">
              <img src={produit} alt="Produit" />
              <p>Produit</p>
            </div>
          </li>
        </NavLink>
        <NavLink to="/commandes" style={style}>
          <li>
            <div className="link commandes">
              <img src={shoppingCart} alt="Commandes" />
              <p>Commandes</p>
            </div>
          </li>
        </NavLink>
        <NavLink to="/utilisateurs" style={style}>
          <li>
            <div className="link users">
              <img src={users} alt="Utilisateurs" />
              <p>Utilisateurs</p>
            </div>
          </li>
        </NavLink>
        <NavLink to="/evenements" style={style}>
          <li>
            <div className="link events">
              <img src={events} alt="Evénements" />
              <p>Evénements</p>
            </div>
          </li>
        </NavLink>
        <li>
          <div className="link partenaire">
            <img src={partenaire} alt="Partenaire" />
            <p>Partenaire</p>
          </div>
        </li>
        <NavLink to="/offres" style={style}>
          <li>
            <div className="link offres">
              <img src={offres} alt="Offres" />
              <p>Offres</p>
            </div>
          </li>
        </NavLink>
        <NavLink to="/expectations" style={style}>
          <li>
            <div className="link expectations">
              <img src={game} alt="Expectations" />
              <p>Expectations</p>
            </div>
          </li>
        </NavLink>
        <NavLink to="/quizz" style={style}>
          <li>
            <div className="link users">
              <img src={quizz} alt="quizz" />
              <p>Quizz</p>
            </div>
          </li>
        </NavLink>
        <NavLink to="/tiquet" style={style}>
          <li>
            <div className="link tickets">
              <img src={ball} alt="Tickets" />
              <p>Tickets</p>
            </div>
          </li>
        </NavLink>
        <NavLink to="/cadeaux" style={style}>
          <li>
            <div className="link gifts">
              <img src={gift} alt="Cadeaux" />
              <p>Cadeaux</p>
            </div>
          </li>
        </NavLink>
        <NavLink to="/parametres" style={style}>
          <li>
            <div className="link settings">
              <img src={settings} alt="Paramètres" />
              <p>Paramètres</p>
            </div>
          </li>
        </NavLink>
        <NavLink to="/signalements" style={style}>
        <li>
          <div className="link settings">
            <img src={warning} alt="Paramètres" />
            <p>Signalements</p>
          </div>
        </li>
      </NavLink>
        <li>
          <div className="link logout hover" onClick={handleLogout}>
            <img src={logout} alt="Se déconnecter" />
            <p>Se déconnecter</p>
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
