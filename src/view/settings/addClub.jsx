/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { image } from "../../assets/index";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
const AddClub = () => {
  const [countries, setCountries] = useState();
  const [country, setCountry] = useState();
  const [teams, setTeams] = useState();
  const [team, setTeam] = useState();
  const [primaryCard, setPrimaryCard] = useState();
  const [secondaryCard, setSecondaryCard] = useState();
  const [paymentType, setPaymentType] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  // get all countries
  const getCountries = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}countries/?no_pagination=true`
      );
      setCountries(response.data.countries);
    } catch (error) {}
  };

  // get clubs
  const getClubs = async () => {
    try {
      setIsLoaded(true);
      setIsError(false);
      const response = await axiosInstance.get(
        `${baseUrl}teams/notActive/?no_pagination=true&country=${country}`
      );
      setTeams(response.data.teams);
      setIsLoaded(false);
    } catch (error) {
      setIsLoaded(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (country) {
      getClubs();
      return;
    }
    getCountries();
  }, [country]);

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
      window.location.href = "/parametres";
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
        <p>Ajouter Club</p>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input nom">
              <label htmlFor="nom">Pays</label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Choisissez un Pays</option>
                {countries &&
                  countries.map((country) => (
                    <option value={country.name} key={country.id}>
                      {country.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Club</label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
                onChange={(e) => {
                  setTeam(e.target.value);
                }}
              >
                {isError && <option>Erreur de chargement</option>}
                {isLoaded ? (
                  <option value="">Chargement...</option>
                ) : (
                  <>
                    <option value="">
                      {!country
                        ? "Choisissez un Pays D'abord"
                        : "Choisissez un Club"}
                    </option>
                    {teams &&
                      teams.map((team) => (
                        <option value={team.team_id} key={team.id}>
                          {team.name}
                        </option>
                      ))}
                  </>
                )}
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Type de paiement</label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
                onChange={(e) => setPaymentType(e.target.value)}
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
                <p className="photo">Ajouter une photo</p>
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
                <p className="photo">Ajouter une photo</p>
              </div>
            </div>
            <button type="submit" className="add-value submit">
              {loading ? "Chargement..." : error ? "Erreur" : "Ajouter"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddClub;
