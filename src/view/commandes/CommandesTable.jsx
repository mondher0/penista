import { eye } from "../../assets/index";
import "./CommandesTable.css";
import { useNavigate } from "react-router-dom";
const CommandesTable = () => {
  const navigate = useNavigate();
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID Commande</th>
          <th>Utilisateur</th>
          <th>Nom complet</th>
          <th>Téléphone</th>
          <th>Wilaya</th>
          <th>Commune</th>
          <th>Livraison</th>
          <th>Code promo</th>
          <th>Date de commande</th>
          <th>Status</th>
          <th>Action</th>
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
          <td>Mondher Mameri</td>
          <td>0558604705</td>
          <td>Béjaia</td>
          <td>Kherrata</td>
          <td>A domicile</td>
          <td>LOVESHOPPING</td>
          <td>11-02-2023</td>
          <td>
            <div className="type">Commande</div>
          </td>
          <td>
            <img
              src={eye}
              alt="Consulter"
              onClick={() => {
                navigate("/commandes/1");
              }}
            />
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
          <td>Mondher Mameri</td>
          <td>0558604705</td>
          <td>Béjaia</td>
          <td>Kherrata</td>
          <td>A domicile</td>
          <td>LOVESHOPPING</td>
          <td>11-02-2023</td>
          <td>
            <div className="type">Commande</div>
          </td>
          <td>
            <img
              src={eye}
              alt="Consulter"
              onClick={() => {
                navigate("/commandes/1");
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CommandesTable;
