import { colorLogo } from "../../assets/index";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { ERROR, LOADING } from "../../reducers/authReducer/authActions";
import axios from "axios";
import { baseUrl } from "../../utils/constants";

const EnterEmailPage = () => {
  const { setEmail, isLoading, error, dispatch, username } = useAuthContext();
  const navigate = useNavigate();

  // send email to get verification code
  const sendEmail = async (e) => {
    try {
      e.preventDefault();
      dispatch({ type: LOADING });

      const data = {
        email: username,
      };
      const response = await axios.post(
        `${baseUrl}accounts/phone/verification-sms/`,
        data
      );
      console.log(response);
      dispatch({ type: LOADING });
      dispatch({ type: ERROR, payload: "" });
      navigate("/valider-code");
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, payload: "something went wrong" });
    }
  };

  return (
    <div className="login">
      <div className="login-card">
        <img src={colorLogo} alt="logo" />
        <p className="titre">Panel Admin</p>
        <p>
          Entrez l’adresse email que vous souhaitez recevoire le code de
          vérification
        </p>
        <form onSubmit={sendEmail}>
          <div className="form-control">
            <label htmlFor="email">Adresse email</label>
            <input
              type="email"
              id="email"
              placeholder="Adresse email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
            {isLoading ? "Chargement..." : "Envoyer le code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnterEmailPage;
