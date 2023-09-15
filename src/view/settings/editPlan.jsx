/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useParams } from "react-router-dom";
import { image } from "../../assets/index";
const EditPlan = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [primaryCard, setPrimaryCard] = useState();
  const [plans, setPlans] = useState();

  // get plan
  const getPlan = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}accounts/plan/${id}/`
      );
      console.log(response);
      setPlans(response.data?.plan);
      setPrice(response.data?.plan?.card_price);
      setDescription(response.data?.plan?.description);
      setPrimaryCard(response.data?.plan?.card_image);
    } catch (error) {
      console.log(error);
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const formData = new FormData();
      formData.append("description", description);
      formData.append("price", price);
      formData.append("card_price", price);
      formData.append("card_image", primaryCard);
      console.log(formData.get("card_image"));
      console.log(formData.get("name"));
      console.log(formData.get("description"));
      console.log(formData.get("team_id"));
      console.log(formData.get("price"));
      console.log(formData.get("price_card"));
      console.log(formData.get("duration"));
      const response = await axiosInstance.put(
        `${baseUrl}accounts/plan/update/${id}/`,
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

  useEffect(() => {
    getPlan();
  }, []);
  return (
    <>
      <NavBar title="Paramètres" />
      <div className="container">
        <p>Modifier Plan</p>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input nom">
              <label htmlFor="nom">Plan</label>
              <select
                value={plans?.name}
                style={{
                  border: "1px solid #E5E5E5",
                }}
                disabled
              >
                <option value="premiumBox">{plans?.name}</option>
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Prix</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Le prix"
                value={price}
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
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
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
export default EditPlan;
