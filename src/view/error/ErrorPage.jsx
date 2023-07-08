import { colorLogo } from "../../assets/index";
import "./ErrorPage.css";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="error">
      <img src={colorLogo} alt="logo" />
      <h1>404</h1>
      <div className="error-content">
        <p className="error-title">Page introuvable</p>
        <p className="error-desc">
          Désolé, la page que vous recherchez est introuvable.
        </p>
        <button className="error-btn" onClick={() => navigate("/")}>
          Retourner vers le panel
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
