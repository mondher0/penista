/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
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
      const data = {
        teamId: team,
      };

      const response = await axiosInstance.post(`${baseUrl}teams/add/`, data);
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
