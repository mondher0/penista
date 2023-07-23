/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { RichTextEditor } from "@mantine/rte";
import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import "../events/AddEventPage.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useParams } from "react-router-dom";

function EditSettingsPage() {
  const { id } = useParams();
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
      const response = await axiosInstance.put(
        `${baseUrl}page/update/${id}/`,
        data
      );
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

  // get page by id
  const getPageById = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}page/${id}/`);
      console.log(response);
      setSlogan(response.data.data.slogan);
      setTitle(response.data.data.title);
      setContent(response.data.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPageById();
  }, []);

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
              {loading ? "Chargement..." : error ? "Erreur" : "Modifier"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditSettingsPage;
