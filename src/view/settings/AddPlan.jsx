/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useParams } from "react-router-dom";
import { image } from "../../assets/index";
import RichTextEditor from "@mantine/rte";
const AddClub = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [primaryCard, setPrimaryCard] = useState();

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("team_id", id);
      formData.append("price", price);
      formData.append("card_price", price);
      formData.append("card_image", primaryCard);
      formData.append("duration", 1);
      console.log(formData.get("card_image"));
      console.log(formData.get("name"));
      console.log(formData.get("description"));
      console.log(formData.get("team_id"));
      console.log(formData.get("price"));
      console.log(formData.get("price_card"));
      console.log(formData.get("duration"));
      const response = await axiosInstance.post(
        `${baseUrl}accounts/plan/create/`,
        formData
      );
      console.log(response);
      console.log(response.data.message);
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
        <p>Ajouter Plan</p>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input nom">
              <label htmlFor="nom">Plan</label>
              <select
                onChange={(e) => {
                  setName(e.target.value);
                }}
                style={{
                  border: "1px solid #E5E5E5",
                }}
              >
                <option value="">Choisissez un plan</option>
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
              <RichTextEditor
                sx={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                value={description}
                onChange={(e) => {
                  setDescription(e);
                }}
              ></RichTextEditor>
            </div>
            <label htmlFor="image">Image</label>
            <div className="media">
              <div className="image">
                <input
                  type="file"
                  id="image"
                  name="image"
                  size="60px"
                  onChange={(e) => setPrimaryCard(e.target.files[0])}
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
