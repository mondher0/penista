import { edite } from "../../assets/index";
import "./UtilisateursTable.css";
import { useEffect, useState } from "react";
import PopUp from "../shared/popUp/PopUp";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/constants";
import axiosInstance from "../../utils/axiosInstance";

const UtilisateursTable = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [action, setAction] = useState();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // get all users
  const getUsers = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}accounts/users/`);
      console.log(response);
      setUsers(response.data.data.users);
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
            <th>Wilaya</th>
            <th>Sexe</th>
            <th>Abonnement</th>
            <th>Date d’inscription</th>
            <th>Commande</th>
            <th>Evénement</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const { id } = user;
            return (
              <>
                <tr key={id}>
                  <td>{id}</td>
                  <td>
                    <div className="user-details">
                      <img src={user.image} alt="user" />
                      <div className="user-info">
                        <p>
                          {user.first_name} {user.last_name}
                        </p>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{user.phone_no}</td>
                  <td>{user.wilaya}</td>
                  <td>{user.gender}</td>
                  <td>{user.plan_name}</td>
                  <td>{user.date_joined}</td>
                  <td onClick={() => navigate("/utilisateurs/commandes/1")}>
                    {user.orders}
                  </td>
                  <td onClick={() => navigate("/utilisateurs/evenements/1")}>
                    {user.events}
                  </td>
                  <td>
                    <div className="action">
                      {action == id && (
                        <div
                          className="edit"
                          onClick={() => {
                            setShowPopUp("10");
                          }}
                        >
                          Bloquer
                        </div>
                      )}
                      <div className="type">{user.is_active}</div>
                    </div>
                  </td>
                  <td>
                    <img
                      src={edite}
                      alt="Modifier"
                      onClick={() => {
                        const { id } = user;
                        console.log(id);
                        if (action == id) {
                          setAction("");
                        } else {
                          setAction(id);
                        }
                      }}
                    />
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      {showPopUp && (
        <PopUp
          setShowPopUp={setShowPopUp}
          setAction={setAction}
          text="Vous voulez vraiment bloquer
      cet utilisateur?"
          button="Bloquer"
          id={showPopUp}
        />
      )}
    </>
  );
};

export default UtilisateursTable;
