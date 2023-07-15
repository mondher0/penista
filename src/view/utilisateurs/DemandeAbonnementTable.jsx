import { save, accept, refuse } from "../../assets/index";
import "./DemandeAbonnementTable.css";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useEffect, useState } from "react";

const DemandeAbonnementTable = () => {
  const [demandeAbonnement, setDemandeAbonnement] = useState();
  // get all demande abonnement
  const getDemandeAbonnement = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}accounts/subscription/?page=20`
      );
      console.log(response);
      // filter demande abonnement that have status waiting
      const demandeAbonnement = response.data.data.filter(
        (demande) => demande.status === "WAITING"
      );
      setDemandeAbonnement(demandeAbonnement);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDemandeAbonnement();
  }, []);

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID Demande</th>
          <th>Utilisateur</th>
          <th>Abonnement</th>
          <th>Date de demande</th>
          <th>Paiement</th>
          <th>Action </th>
        </tr>
      </thead>
      <tbody>
        {demandeAbonnement &&
          demandeAbonnement.map((demande) => {
            return (
              <>
                <tr key={demande.id}>
                  <td>{demande.id}</td>
                  <td>
                    <div className="user-details">
                      <img src="https://picsum.photos/200" alt="user" />
                      <div className="user-info">
                        <p>Utilisateur 1</p>
                        <span>mondher@gmail.com</span>
                      </div>
                    </div>
                  </td>
                  <td>{demande.plan}</td>
                  <td>{demande.start_date}</td>
                  <td>Versement</td>
                  <td>
                    <div className="actions">
                      <img src={save} alt="" />
                      <img src={accept} alt="" />
                      <img src={refuse} alt="" />
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
      </tbody>
    </table>
  );
};

export default DemandeAbonnementTable;
