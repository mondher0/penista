import "../produit/ProductTable.css";
import { edite, pause } from "../../assets/index";
import "../utilisateurs/UtilisateursTable.css";
import "./SettingsPageTable.css";
import { useNavigate } from "react-router-dom";

const SettingsPageTable = () => {
  const navigate = useNavigate();
  return (
    <>
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
          <tr>
            <td>Ils ont dit de nous</td>
            <td>Lorem ipsum</td>
            <td>12-12-2022</td>
            <td>
              <div className="type">Commande</div>
            </td>
            <td>
              <div className="action">
                <img src={pause} alt="Supprimer" />
                <img
                  src={edite}
                  alt="Modifier"
                  onClick={() => navigate(`/parametres/5/modifier`)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Ils ont dit de nous</td>
            <td>Lorem ipsum</td>
            <td>12-12-2022</td>
            <td>
              <div className="type">Commande</div>
            </td>
            <td>
              <div className="action">
                <img src={pause} alt="Supprimer" />
                <img
                  src={edite}
                  alt="Modifier"
                  onClick={() => navigate(`/parametres/6/modifier`)}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default SettingsPageTable;
