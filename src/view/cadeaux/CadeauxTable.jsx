import { edite } from "../../assets/index";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import PopUp from "../shared/popUp/PopUp";
import { useEffect, useState } from "react";

const CadeauxTable = () => {
  const [showPopUp, setShowPopUp] = useState(null);
  const [users, setUsers] = useState();

  // get users
  const getUsers = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}accounts/users/`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Utilisateur</th>
            <th>Utilisateur</th>
            <th>Téléphone</th>
            <th>Abonnement</th>
            <th>Total des Points</th>
            <th>Points expectations</th>
            <th>Etoiles</th>
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
            <td>0558604705</td>
            <td>Gratuit</td>
            <td>31200</td>
            <td>1200</td>
            <td>3</td>
            <td>
              <div className="type">Actif</div>
            </td>
            <td>
              <img
                src={edite}
                alt="Modifier"
                onClick={() => setShowPopUp("1")}
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
            <td>0558604705</td>
            <td>Gratuit</td>
            <td>31200</td>
            <td>1200</td>
            <td>3</td>
            <td>
              <div className="type">Actif</div>
            </td>
            <td>
              <img
                src={edite}
                alt="Modifier"
                onClick={() => setShowPopUp("22")}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {showPopUp && (
        <PopUp
          text="Nombre de points à enlever"
          setShowPopUp={setShowPopUp}
          case="points"
          button="Envoyer la notification"
          id={showPopUp}
        />
      )}
    </>
  );
};

export default CadeauxTable;
