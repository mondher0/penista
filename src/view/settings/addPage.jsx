import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import "../events/AddEventPage.css";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
const AddPage = () => {
  const [title, setTitle] = useState();
  const [slogan, setSlogan] = useState();
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // handle submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError(false);
      const data = {
        title: title,
        slogan: slogan,
        content: description,
      };
      const response = await axiosInstance.post(`${baseUrl}page/create/`, data);
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
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input">
              <label htmlFor="gratuit">Titre</label>
              <input
                type="text"
                id="gratuit"
                name="gratuit"
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="input">
              <label htmlFor="gratuit">Slogan</label>
              <input
                type="text"
                id="gratuit"
                name="gratuit"
                required
                onChange={(e) => {
                  setSlogan(e.target.value);
                }}
              />
            </div>
            <div className="input">
              <label htmlFor="gratuit">Description</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                required
                rows="10"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <button
              type="submit"
              className="add-value submit"
              style={{
                marginTop: "0",
              }}
            >
              {loading ? "Chargement..." : error ? "Erreur" : "Ajouter"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddPage;
