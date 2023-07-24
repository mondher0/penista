import { colorLogo } from "../../assets/index";
import "./ValideCodePage.css";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { ERROR, LOADING } from "../../reducers/authReducer/authActions";
import axios from "axios";
import { baseUrl } from "../../utils/constants";

const ValideCodePage = () => {
  const {
    username,
    firstCode,
    secondCode,
    thirdCode,
    fourthCode,
    setVerificationFirstCode,
    setVerificationSecondCode,
    setVerificationThirdCode,
    setVerificationFourthCode,
    dispatch,
    isLoading,
    error,
  } = useAuthContext();
  const navigate = useNavigate();
  const sendVerificationCode = async (e) => {
    try {
      e.preventDefault();
      dispatch({ type: LOADING });

      const data = {
        email: username,
        verification_code: firstCode + secondCode + thirdCode + fourthCode,
      };
      const response = await axios.post(
        `${baseUrl}accounts/phone/verification-api/`,
        data
      );
      if (response.data.success === false) {
        dispatch({ type: LOADING });
        dispatch({ type: ERROR, payload: response.data.message });
        return;
      }
      dispatch({ type: LOADING });
      dispatch({ type: ERROR, payload: "" });
      navigate("/changer-mot-de-passe");
    } catch (error) {
      dispatch({ type: ERROR, payload: "something went wrong" });
    }
  };
  return (
    <div className="login">
      <div className="login-card">
        <img src={colorLogo} alt="logo" />
        <p className="titre">Panel Admin</p>
        <p>
          Entrez le code de vérification envoyé à l’adresse email que vous avez
          saisie
        </p>
        <form onSubmit={sendVerificationCode}>
          <div className="form-control code">
            <input
              type="text"
              maxLength="1"
              onChange={(e) => setVerificationFirstCode(e.target.value)}
            />
            <input
              type="text"
              maxLength="1"
              onChange={(e) => setVerificationSecondCode(e.target.value)}
            />
            <input
              type="text"
              maxLength="1"
              onChange={(e) => setVerificationThirdCode(e.target.value)}
            />
            <input
              type="text"
              maxLength="1"
              onChange={(e) => setVerificationFourthCode(e.target.value)}
            />
          </div>
          <p>
            Vous devriez recevoir le code en <span>30 secondes</span>
          </p>
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
            {isLoading ? "Chargement..." : "Valider"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ValideCodePage;
