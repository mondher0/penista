import "../produit/ProductTable.css";
import { edite, pause, play } from "../../assets/index";
import "../utilisateurs/UtilisateursTable.css";
import "./SettingsPageTable.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import usePopUpContext from "../../hooks/usePopUpContext";
const SettingsPageTable = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState();
  const { update, setUpdate } = usePopUpContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  // get all pages
  const getAllPages = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`${baseUrl}page/`);
      console.log(response);
      setPages(response.data.data);
      if (response.data.data.length === 0) {
        setIsEmpty(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  // change status
  const handleChangeStatus = async (id) => {
    try {
      const response = await axiosInstance.post(`${baseUrl}page/status/${id}/`);
      console.log(response);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPages();
  }, [update]);
  return (
    <>
      {isLoading && <div className="loader">Chargement...</div>}
      {isError && <div className="loader">Erreur de chargement</div>}
      {isEmpty && <div className="loader">Aucun utilisateur</div>}
      <table className="product-table">
        <thead>
          <tr>
            <th>Titre de la page</th>
            <th>Dernière date de modification</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pages &&
            pages.map((page) => (
              <>
                <tr key={page.id}>
                  <td>{page.title}</td>
                  <td>{page.lastModification}</td>
                  <td>
                    <div className="type">
                      {page.is_active ? "Active" : "Inactive"}
                    </div>
                  </td>
                  <td>
                    <div className="action">
                      <img
                        src={page.is_active ? pause : play}
                        alt="Supprimer"
                        onClick={() => {
                          handleChangeStatus(page.id);
                        }}
                      />
                      <img
                        src={edite}
                        alt="Modifier"
                        onClick={() => navigate(`/parametres/${page.slogan}/modifier`)}
                      />
                    </div>
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default SettingsPageTable;
