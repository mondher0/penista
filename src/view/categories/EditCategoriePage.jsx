/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import NavBar from "../shared/navBar/NavBar";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useEffect, useState } from "react";
import { deleteIcon, edite } from "../../assets";
const EditCategoriePage = () => {
  const { id } = useParams();
  const [name, setName] = useState();
  const [values, setValues] = useState([]);
  const [newValues, setNewValues] = useState([]);
  const [subCategories, setSubCategories] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [update, setUpdate] = useState(false);
  console.log(id);

  // get categorie from database by id
  const getSingleCategory = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}category/admin/${id}/?child=true`
      );
      console.log(response);
      setName(response.data.data.name);
      setValues(response.data.data.subCategories);
    } catch (error) {
      console.log(error);
    }
  };

  // edit single sub categorie
  const editSubCategorie = async (subCategorieId, subCategorieName) => {
    try {
      const response = await axiosInstance.post(
        `${baseUrl}category/admin/update/sub_category/${subCategorieId}/`,
        {
          name: subCategorieName,
          parent_category_id: id,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name) {
        setIsError(false);
        setIsLoading(true);
        const response = await axiosInstance.post(
          `${baseUrl}category/admin/update/${id}/`,
          {
            name: name,
          }
        );
        console.log(response);
        if (!response.data.success) {
          setIsError(true);
          setIsLoading(false);
          return;
        }
      }
      if (newValues.length > 0) {
        setIsError(false);
        setIsLoading(true);
        const response = await axiosInstance.post(
          `${baseUrl}category/admin/create/sub_category/`,
          {
            subcategories: newValues,
            parent_category_id: id,
          }
        );
        console.log(response);
        if (!response.data.success) {
          setIsError(true);
          setIsLoading(false);
          return;
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  // delete sub categorie
  const deleteSubCategorie = async (subCategorieId) => {
    try {
      const response = await axiosInstance.delete(
        `${baseUrl}category/admin/delete/${subCategorieId}/`
      );
      console.log(response);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleCategory();
  }, [update]);
  return (
    <>
      <NavBar title="Catégories" />
      <div className="container">
        <p>Modifier catégorie</p>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input nom">
              <label htmlFor="nom">Nom catégorie</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Electromenager"
                value={name && name}
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
                onChange={(e) => setSubCategories(e.target.value)}
                value={subCategories && subCategories}
              />
            </div>
            {newValues &&
              newValues.map((value) => {
                return (
                  <div className="input nom" key={value}>
                    <input
                      type="text"
                      id={value}
                      name="nom"
                      placeholder="Valeurs"
                      value={value}
                      disabled
                    />
                  </div>
                );
              })}
            {values &&
              values?.map((value) => {
                return (
                  <div
                    className="input nom"
                    key={value}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <input
                      type="text"
                      id={value.id}
                      name="nom"
                      placeholder="Valeurs"
                      value={value.name}
                      style={{
                        width: "100%",
                      }}
                      onChange={(e) => {
                        setValues(
                          values.map((item) => {
                            if (item.id === value.id) {
                              item.name = e.target.value;
                            }
                            return item;
                          })
                        );
                      }}
                    />
                    <label
                      htmlFor={value.id}
                      onClick={() => {
                        editSubCategorie(value.id, value.name);
                      }}
                    >
                      <img src={edite} alt="edite" />
                    </label>
                    <img
                      src={deleteIcon}
                      alt="delete"
                      onClick={() => deleteSubCategorie(value.id)}
                      className="hover"
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
                if (subCategories) {
                  setNewValues([...newValues, subCategories]);
                  setSubCategories("");
                }
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
                  : "Modifier"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCategoriePage;
