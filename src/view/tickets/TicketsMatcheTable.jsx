import "../produit/ProductTable.css";
import { edite } from "../../assets/index";

const TicketsMatcheTable = () => {
  return (
    <>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Match</th>
            <th>Date du match</th>
            <th>Heure du match</th>
            <th>Titre de la ligue</th>
            <th>Equipe adverse</th>
            <th>Code equipe</th>
            <th>N° Rond</th>
            <th>Stade</th>
            <th>Tiquets</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>11-02-2023</td>
            <td>11:00</td>
            <td>La liga</td>
            <td>Leicester</td>
            <td>LCTR</td>
            <td>Premier Ligue</td>
            <td>Maison</td>
            <td>20</td>
            <td>
              <img src={edite} alt="Modifier" />
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>11-02-2023</td>
            <td>11:00</td>
            <td>La liga</td>
            <td>Leicester</td>
            <td>LCTR</td>
            <td>Premier Ligue</td>
            <td>Maison</td>
            <td>20</td>
            <td>
              <img src={edite} alt="Modifier" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TicketsMatcheTable;
