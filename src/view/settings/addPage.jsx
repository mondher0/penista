/* eslint-disable react/prop-types */
import { RichTextEditor } from "@mantine/rte";
import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import "../events/AddEventPage.css";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";

function AddPage() {
  const [title, setTitle] = useState("Titre");
  const [slogan, setSlogan] = useState("Slogan");
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      e.preventDefault();

      setLoading(true);
      setError(false);
      const data = {
        title: title,
        slogan: slogan,
        content: content,
      };
      const response = await axiosInstance.post(`${baseUrl}page/create/`, data);
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
        <div className="form">
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              id="gratuit"
              name="gratuit"
              required
              value={title}
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                fontFamily: "Roboto, sans-serif",
              }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              id="gratuit"
              name="gratuit"
              required
              value={slogan}
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                fontFamily: "Roboto, sans-serif",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              onChange={(e) => setSlogan(e.target.value)}
            />
            <RichTextEditor
              sx={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              value={content}
              onChange={(e) => setContent(e)}
            ></RichTextEditor>
            <button className="add-value submit">
              {loading ? "Chargement..." : error ? "Erreur" : "Ajouter"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPage;
