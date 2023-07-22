import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { image } from "../../assets/index";
import "../events/AddEventPage.css";
import SettingsImageTable from "./SettingsImageTable";
import SettingsPageTable from "./SettingsPageTable";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useEffect, useState } from "react";
const SettingsPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState();
  const [success, setSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [apiToken, setApiToken] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [yalidinLoading, setYalidinLoading] = useState(false);
  const [yalidinError, setYalidinError] = useState(false);

  // get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}accounts/userinfo/`);
      console.log(response);
      const { first_name, last_name, phone_no, email } = response.data.data;
      setUserInfo({ first_name, last_name, phone_no, email });
      setUsername(response.data.data.username);
    } catch (error) {
      console.log(error);
    }
  };

  const showSuccessMessageFor30Seconds = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      console.log("hello");
      setShowSuccessMessage(false);
    }, 10000); // 30 seconds (30,000 milliseconds)
  };

  // update user info
  const updateUserInfo = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("first_name", userInfo.first_name);
      formData.append("last_name", userInfo.last_name);
      formData.append("phone_no", userInfo.phone_no);
      formData.append("email", userInfo.email);
      formData.append("image", profilePicture);
      const response = await axiosInstance.put(
        `${baseUrl}accounts/users/admin/`,
        formData
      );
      console.log(response);
      if (response.data.data.success === false) {
        setLoading(false);
        setError(true);
        return;
      }
      setSuccess(true);
      setLoading(false);
      showSuccessMessageFor30Seconds();
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  // get yaalidine info
  const getYalidineInfo = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}setting/yalidin/`);
      console.log(response);
      setApiKey(response.data.data.yalidin_api_key);
      setApiToken(response.data.data.yalidin_api_token);
    } catch (error) {
      console.log(error);
    }
  };

  // update yalidine info
  const updateYalidineInfo = async (e) => {
    e.preventDefault();
    try {
      setYalidinLoading(true);
      setYalidinError(false);
      const data = {
        yalidin_api_key: apiKey,
        yalidin_api_token: apiToken,
      };
      const response = await axiosInstance.post(
        `${baseUrl}setting/yalidin/update/`,
        data
      );
      console.log(response);
      if (response.data.success === false) {
        setYalidinLoading(false);
        setYalidinError(true);
        return;
      }
      setYalidinLoading(false);
    } catch (error) {
      setYalidinLoading(false);
      setYalidinError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
    getYalidineInfo();
  }, [success]);
  return (
    <>
      <NavBar title="Paramètres" />
      <div className="container">
        <p>Information personnelles</p>
        <div className="form">
          {showSuccessMessage && (
            <p style={{ color: "green" }}>
              Information mise à jour avec succès
            </p>
          )}
          <form onSubmit={updateUserInfo}>
            <div className="input prix">
              <div className="price gratuit ticket">
                <label htmlFor="gratuit">Nom</label>
                <input
                  type="text"
                  id="gratuit"
                  name="gratuit"
                  value={userInfo.last_name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, last_name: e.target.value })
                  }
                />
              </div>
              <div className="price premium ticket">
                <label htmlFor="premium">Prénom</label>
                <input
                  type="text"
                  id="premium"
                  name="premium"
                  value={userInfo.first_name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, first_name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="input prix">
              <div className="price gratuit ticket">
                <label htmlFor="gratuit">Téléphone</label>
                <input
                  type="text"
                  id="gratui"
                  name="gratuit"
                  value={userInfo.phone_no}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone_no: e.target.value })
                  }
                />
              </div>
              <div className="price premium ticket">
                <label htmlFor="premium">Email</label>
                <input
                  type="email"
                  id="premiu"
                  name="premium"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="input prix">
              <div className="price gratuit ticket">
                <label htmlFor="gratuit">Nom d’utilisateur</label>
                <input
                  type="text"
                  id="ratuit"
                  name="gratuit"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="price premium ticket">
                <label htmlFor="premium">Nouveau mot de passe</label>
                <input
                  type="password"
                  id="remium"
                  name="premium"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="prix">Photo de Profile</label>
            <div className="media">
              <div className="image">
                <input
                  type="file"
                  id="image"
                  name="image"
                  size="60px"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />
                <img src={image} alt="image" />
                <p className="photo">Ajouter une photo</p>
              </div>
            </div>
            <button
              type="submit"
              className="add-value submit"
              style={{
                marginTop: "0",
              }}
            >
              {loading ? "Chargement..." : error ? "Erreur" : "Enregistrer"}
            </button>
          </form>
        </div>
        <div className="form">
          <form onSubmit={updateYalidineInfo}>
            <p>Yalidine information</p>
            <div
              className="input prix"
              style={{
                marginTop: "10px",
              }}
            >
              <div className="price gratuit ticket">
                <label htmlFor="gratuit">API Token</label>
                <input
                  type="text"
                  id="grahhtuit"
                  name="gratuit"
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                />
              </div>
              <div className="price premium ticket">
                <label htmlFor="premium">API Key</label>
                <input
                  type="text"
                  id="premhhium"
                  name="premium"
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="add-value submit"
              style={{
                marginTop: "0",
              }}
            >
              {yalidinLoading
                ? "Chargement"
                : yalidinError
                ? "Erreur"
                : "Enregistrer"}
            </button>
          </form>
        </div>
        <div className="title">
          <p>Sliders et publicités</p>
          <button
            className="add-product"
            onClick={() => navigate("/parametres/ajouter-image")}
          >
            Ajouter une image
          </button>
        </div>
        <SettingsImageTable />
        <div className="title">
          <p>Pages</p>
          <button
            className="add-product"
            onClick={() => {
              navigate("/parametres/ajouter-page");
            }}
          >
            Ajouter une page
          </button>
        </div>
        <SettingsPageTable />
      </div>
    </>
  );
};
export default SettingsPage;
