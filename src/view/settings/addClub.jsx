import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { image } from "../../assets/index";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
const AddClub = () => {
  const [note, setNote] = useState();
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const formData = new FormData();
      formData.append("title", note);
      formData.append("image", img);
      const response = await axiosInstance.post(
        `${baseUrl}ads/create/`,
        formData
      );
      if (response.data.success === false) {
        setLoading(false);
        setError(true);
        return;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <>
      <NavBar title="Paramètres" />
      <div className="container">
        <p>Slider et publicités</p>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input nom">
              <label htmlFor="nom">Pays</label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
              >
                <option value="">Choisissez un Pays</option>
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Club</label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
              >
                <option value="">Choisissez un Club</option>
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Type de paiement</label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
              >
                <option value="">Choisissez le type de payment</option>
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
                  onChange={(e) => setImg(e.target.files[0])}
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
                  onChange={(e) => setImg(e.target.files[0])}
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
