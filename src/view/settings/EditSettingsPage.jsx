/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import "../events/AddEventPage.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useEffect, useState } from "react";
const EditSettingsPage = () => {
  const { slogan } = useParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [sloganState, setSloganState] = useState();
  const [id, setId] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // get page by slogan
  const getPageBySlogan = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}page/slogan/${slogan}/`
      );
      console.log(response);
      setTitle(response.data.data?.title);
      setDescription(response.data.data?.content);
      setSloganState(response.data.data?.slogan);
      setId(response.data.data?.id);
    } catch (error) {
      console.log(error);
    }
  };

  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const data = {
        title: title,
        slogan: sloganState,
        content: description,
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
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getPageBySlogan();
  }, []);
  return (
    <>
      <NavBar title="Paramètres" />
      <div className="container">
        <div className="form">
          <form onSubmit={handleUpdate}>
            <div className="input">
              <label htmlFor="gratuit">Titre</label>
              <input
                type="text"
                id="gratuit"
                name="gratuit"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="gratuit">Slogan</label>
              <input
                type="text"
                id="gratuit"
                name="gratuit"
                value={sloganState}
                onChange={(e) => setSloganState(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="gratuit">Description</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="add-value submit"
              style={{
                marginTop: "0",
              }}
            >
              {loading ? "Chargement..." : error ? "Erreur" : "Modifier"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default EditSettingsPage;
