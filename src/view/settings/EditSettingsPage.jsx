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
  console.log(slogan);

  // get page by slogan
  const getPageBySlogan = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}page/slogan/${slogan}/`
      );
      console.log(response);
      setTitle(response.data.data[0].title);
      setDescription(response.data.data[0].content);
      setSloganState(response.data.data[0].slogan);
      setId(response.data.data[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
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
    } catch (error) {
      console.log(error);
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
              Modifier
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default EditSettingsPage;
