import { colorLogo } from "../../assets/index";
import { useNavigate } from "react-router-dom";

const EnterEmailPage = () => {
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="login-card">
        <img src={colorLogo} alt="logo" />
        <p className="titre">Panel Admin</p>
        <p>
          Entrez l’adresse email que vous souhaitez recevoire le code de
          vérification
        </p>
        <form onSubmit={() => navigate("/valider-code")}>
          <div className="form-control">
            <label htmlFor="email">Adresse email</label>
            <input type="email" id="email" placeholder="Adresse email" />
          </div>
          <button className="login-btn" type="submit">
            Envoyer le code
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnterEmailPage;
