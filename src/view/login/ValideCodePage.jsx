import { colorLogo } from "../../assets/index";
import "./ValideCodePage.css";
import { useNavigate } from "react-router-dom";

const ValideCodePage = () => {
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="login-card">
        <img src={colorLogo} alt="logo" />
        <p className="titre">Panel Admin</p>
        <p>
          Entrez le code de vérification envoyé à l’adresse email que vous avez
          saisie
        </p>
        <form onSubmit={() => navigate("/changer-mot-de-passe")}>
          <div className="form-control code">
            <input type="text" maxLength="1" />
            <input type="text" maxLength="1" />
            <input type="text" maxLength="1" />
            <input type="text" maxLength="1" />
          </div>
          <p>
            Vous devriez recevoir le code en <span>30 secondes</span>
          </p>
          <button className="login-btn" type="submit">
            Valider le code
          </button>
        </form>
      </div>
    </div>
  );
};

export default ValideCodePage;
