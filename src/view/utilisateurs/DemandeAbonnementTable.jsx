import { save, accept, refuse } from "../../assets/index";
import "./DemandeAbonnementTable.css";

const DemandeAbonnementTable = () => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID Demande</th>
          <th>Utilisateur</th>
          <th>Téléphone</th>
          <th>Abonnement</th>
          <th>Date de demande</th>
          <th>Paiement</th>
          <th>Action </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>
            <div className="user-details">
              <img src="https://picsum.photos/200" alt="user" />
              <div className="user-info">
                <p>Utilisateur 1</p>
                <span>mondher@gmail.com</span>
              </div>
            </div>
          </td>
          <td>0558604705</td>
          <td>Béjaia</td>
          <td>Féminin</td>
          <td>Gratuit</td>
          <td>
            <div className="actions">
              <img src={save} alt="" />
              <img src={accept} alt="" />
              <img src={refuse} alt="" />
            </div>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <div className="user-details">
              <img src="https://picsum.photos/200" alt="user" />
              <div className="user-info">
                <p>Utilisateur 1</p>
                <span>mondher@gmail.com</span>
              </div>
            </div>
          </td>
          <td>0558604705</td>
          <td>Béjaia</td>
          <td>Féminin</td>
          <td>Gratuit</td>
          <td>
            <div className="actions">
              <img src={save} alt="" />
              <img src={accept} alt="" />
              <img src={refuse} alt="" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DemandeAbonnementTable;