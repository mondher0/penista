import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { image } from "../../assets/index";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
const SettingsAddImagePage = () => {
  const [note, setNote] = useState();
  const [img, setImg] = useState();

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", note);
      formData.append("image", img);
      const response = await axiosInstance.post(
        `${baseUrl}ads/create/`,
        formData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
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
              <label htmlFor="nom">Note</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Note"
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <label htmlFor="prix">Image Slider</label>
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
              Ajouter le produit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default SettingsAddImagePage;
