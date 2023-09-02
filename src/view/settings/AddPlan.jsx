/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useParams } from "react-router-dom";
const AddClub = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const data = {
        name: name,
        description: description,
        team_id: id,
        price: price,
        price_card: price,
      };
      const response = await axiosInstance.post(
        `${baseUrl}accounts/plan/create/`,
        data
      );
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
        <p>La Carte</p>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input nom">
              <label htmlFor="nom">Prix</label>
              <select
                onChange={(e) => {
                  setName(e.target.value);
                }}
                style={{
                  border: "1px solid #E5E5E5",
                }}
              >
                <option value="">Choisissez un plan</option>
                <option value="premium">Premium</option>
                <option value="premiumBox">Premium Box</option>
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Prix</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Le prix"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="input nom">
              <label htmlFor="nom">Description</label>
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
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
