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

  // handle submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        title: title,
        slogan: slogan,
        content: description,
      };
      const response = await axiosInstance.post(`${baseUrl}page/create/`, data);
      console.log(response);
    } catch (error) {
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
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddPage;
