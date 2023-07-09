import "./LoginPage.css";
import { colorLogo } from "../../assets/index";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  // handle submit just for test
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        username: "zaki@penista.com",
        password: "12345678",
      };
      const response = await axios.post(
        "https://akramayeb.pythonanywhere.com/accounts/token/",
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className="login-card">
        <img src={colorLogo} alt="logo" />
        <p className="titre">Panel Admin</p>
        <h2>Connectez-vous à votre panel admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Adresse email</label>
            <input type="email" id="email" placeholder="Adresse email" />
          </div>
          <div className="form-control">
            <div className="labels">
              <label htmlFor="password">Mot de passe</label>
              <label htmlFor="password" onClick={() => navigate("/mdp-oublié")}>
                Mot de passe oublié?
              </label>
            </div>
            <input type="password" id="password" placeholder="Mot de passe" />
          </div>
          <button className="login-btn" type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
