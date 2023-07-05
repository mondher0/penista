import "./ProductTable.css";
import { deleteIcon, edite } from "../../assets/index";

const ProductTable = () => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID Produit</th>
          <th>Produit</th>
          <th>Prix abonnement gratuit</th>
          <th>Prix abonnement premium</th>
          <th>Prix abonnement pro</th>
          <th>Quantité en stock</th>
          <th>Quantité vendue</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Produit 1</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>10</td>
          <td>0</td>
          <td>
            <img src={deleteIcon} alt="Supprimer" />
            <img src={edite} alt="Modifier" />
          </td>
        </tr>
        <tr>
        <td>1</td>
        <td>Produit 1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>10</td>
        <td>0</td>
        <td>
          <img src={deleteIcon} alt="Supprimer" />
          <img src={edite} alt="Modifier" />
        </td>
      </tr>
      </tbody>
    </table>
  );
};

export default ProductTable;
