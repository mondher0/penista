import { useState } from "react";
import NavBar from "../shared/navBar/NavBar";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";

const AddCategoriePage = () => {
  const [values, setValues] = useState([]);
  const [subCategorie, setSubCategorie] = useState();
  const [name, setName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  console.log(values);

  //handle submit categorie
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.post(
        `${baseUrl}category/admin/create/`,
        {
          name: name,
          subcategories: values,
        }
      );
      console.log(response);
      if (!response.data.success) {
        setIsError(true);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      window.location.href = "/categories";
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };
  return (
    <>
      <NavBar title="Catégories" />
      <div className="container">
        <p>Nouvelle catégorie</p>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input nom">
              <label htmlFor="nom">Nom catégorie</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Electromenager"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="input nom">
              <label htmlFor="nom">Sous catégories</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Valeurs"
                onChange={(e) => setSubCategorie(e.target.value)}
                value={subCategorie}
              />
            </div>
            {values &&
              values?.map((value) => {
                return (
                  <div className="input nom" key={value}>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      placeholder="Valeurs"
                      value={value}
                      disabled
                    />
                  </div>
                );
              })}
            <button
              type="button"
              className="add-value"
              style={{
                width: "fit-content",
              }}
              onClick={() => {
                setValues([...values, subCategorie]);
                setSubCategorie("");
              }}
            >
              Ajouter une sous catégorie
            </button>
            <div>
              <button type="submit" className="add-value submit">
                {isLoading
                  ? "Chargement..."
                  : isError
                  ? "Erreur de chargement"
                  : "Ajouter"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategoriePage;
