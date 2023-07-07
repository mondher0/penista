import { edite } from "../../assets/index";
import "../utilisateurs/DemandeAbonnementTable.css";

const MyEventsTable = () => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID Event</th>
          <th>Titre</th>
          <th>Type</th>
          <th>Gratuit</th>
          <th>Premium</th>
          <th>Boxe</th>
          <th>Tiquet Min</th>
          <th>Tiquet Max</th>
          <th>Date de résérvation</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Rorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
          <td>Regroupement</td>
          <td>20000 DA</td>
          <td>18000 DA</td>
          <td>12200 DA</td>
          <td>1</td>
          <td>5</td>
          <td>11-02-2023</td>
          <td>
            <img src={edite} alt="" />
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>Rorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
          <td>Regroupement</td>
          <td>20000 DA</td>
          <td>18000 DA</td>
          <td>12200 DA</td>
          <td>1</td>
          <td>5</td>
          <td>11-02-2023</td>
          <td>
            <img src={edite} alt="" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MyEventsTable;
