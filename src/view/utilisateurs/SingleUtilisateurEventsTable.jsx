import { save, accept, refuse } from "../../assets/index";
import "./DemandeAbonnementTable.css";

const SingleUtilisateurEventsTable = () => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID Event</th>
          <th>Titre de l’événement</th>
          <th>Type</th>
          <th>Type de résérvation</th>
          <th>Prix</th>
          <th>Tiquet</th>
          <th>Date de résérvation</th>
          <th>Paiment</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Rorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
          <td>Regroupement</td>
          <td>Versement</td>
          <td>12200 DA</td>
          <td>1</td>
          <td>11-02-2023</td>
          <td>Versement</td>
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
          <td>Rorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
          <td>Regroupement</td>
          <td>Versement</td>
          <td>12200 DA</td>
          <td>1</td>
          <td>11-02-2023</td>
          <td>Versement</td>
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

export default SingleUtilisateurEventsTable;
