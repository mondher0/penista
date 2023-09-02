/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { image } from "../../assets/index";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useParams } from "react-router-dom";
const EditClub = () => {
  const { id } = useParams();
  console.log(id);
  const [country, setCountry] = useState("");
  const [team, setTeam] = useState();
  const [teamName, setTeamName] = useState();
  const [primaryCard, setPrimaryCard] = useState();
  const [secondaryCard, setSecondaryCard] = useState();
  const [paymentType, setPaymentType] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // get club
  const getClub = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}teams/${id}/`);
      console.log(response);
      console.log(response.data?.team.country.name);
      setCountry(response.data?.team.country.name);
      setTeam(response.data?.team.team_id);
      setTeamName(response.data?.team.name);
      setPrimaryCard(baseUrl + response.data?.team.card_primary);
      console.log(primaryCard);
      if (response.data?.team.payment_type?.length === 1) {
        setPaymentType(response.data?.team.payment_type[0]);
      } else {
        setPaymentType("all");
      }
      console.log(country);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClub();
    console.log(country);
  }, []);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const formData = new FormData();
      formData.append("teamId", team);
      formData.append("card_primary", primaryCard);
      formData.append("card_secondary", secondaryCard);
      if (paymentType === "all") {
        formData.append("payment_type", "bank transfer");
        formData.append("payment_type", "on delivery");
      } else {
        formData.append("payment_type", paymentType);
      }
      const response = await axiosInstance.post(
        `${baseUrl}teams/add/`,
        formData
      );
      console.log(response);
      if (response.data.success === false) {
        setLoading(false);
        setError(true);
        return;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };
  return (
    <>
      <NavBar title="Paramètres" />
      <div className="container">
        <p>Modifier Club</p>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input nom">
              <label htmlFor="nom">Pays</label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
                disabled
              >
                <option value="">{country}</option>
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Club</label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
                value={teamName}
                disabled
              >
                <option value="">{teamName}</option>
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Type de paiement</label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
                onChange={(e) => setPaymentType(e.target.value)}
                value={paymentType}
              >
                <option value="">Choisissez le type de payment</option>
                <option value="on delivery">Yalidine</option>
                <option value="bank transfer">Reçu</option>
                <option value="all">Reçu et Yalidine</option>
              </select>
            </div>
            <label htmlFor="prix">Carte (Primaire) *</label>
            <div className="media">
              <div className="image">
                <input
                  type="file"
                  id="image"
                  name="image"
                  size="60px"
                  required
                  onChange={(e) => setPrimaryCard(e.target.files[0])}
                />
                <img src={image} alt="image" />
                <p className="photo">Modifier une photo</p>
              </div>
            </div>
            <label htmlFor="prix">Carte (Secondaire)</label>
            <div className="media">
              <div className="image">
                <input
                  type="file"
                  id="image"
                  name="image"
                  size="60px"
                  onChange={(e) => setSecondaryCard(e.target.files[0])}
                />
                <img src={image} alt="image" />
                <p className="photo">Modifier une photo</p>
              </div>
            </div>
            <button type="submit" className="add-value submit">
              {loading ? "Chargement..." : error ? "Erreur" : "Modifier"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default EditClub;
