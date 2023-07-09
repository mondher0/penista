import "./LoginPage.css";
import { colorLogo } from "../../assets/index";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setEmail, setPassword, handleLogin, isLoading, error } =
    useAuthContext();
  return (
    <div className="login">
      <div className="login-card">
        <img src={colorLogo} alt="logo" />
        <p className="titre">Panel Admin</p>
        <h2>Connectez-vous à votre panel admin</h2>
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <label htmlFor="email">Adresse email</label>
            <input
              type="email"
              id="email"
              required
              placeholder="Adresse email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <div className="labels">
              <label htmlFor="password">Mot de passe</label>
              <label htmlFor="password" onClick={() => navigate("/mdp-oublié")}>
                Mot de passe oublié?
              </label>
            </div>
            <input
              type="password"
              id="password"
              required
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              {error}
            </p>
          )}
          <button className="login-btn" type="submit">
            {isLoading ? "Chargement..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
