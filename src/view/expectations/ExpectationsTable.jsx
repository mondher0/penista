import "../utilisateurs/DemandeAbonnementTable.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";

const ExpectationsTable = () => {
  const [expectations, setExpectations] = useState();

  // get all expectations
  const getAllExpectations = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}expectation/`);
      console.log(response);
      setExpectations(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllExpectations();
  }, []);
  return (
    <>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Expectation</th>
            <th>Date du match</th>
            <th>Nom adversaire</th>
            <th>Utilisateur</th>
            <th>Etat</th>
            <th>Real Madrid</th>
            <th>Adversaire</th>
          </tr>
        </thead>
        <tbody>
          {expectations &&
            expectations.map((expectation) => {
              return (
                <>
                  <tr key={expectation.id}>
                    <td>{expectation.id}</td>
                    <td>{expectation.match_info.startDate}</td>
                    <td>{expectation.match_info.opposingTeam.name}</td>
                    <td>
                      <div className="user-details">
                        <img
                          src={`${baseUrl}${expectation.client_info.image}`}
                          alt="user"
                        />
                        <div className="user-info">
                          <p>
                            {expectation.client_info.first_name}{" "}
                            {expectation.client_info.last_name}
                          </p>
                          <span>{expectation.client_info.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      {expectation.answer.ourTeamGoals >
                      expectation.answer.opposingTeam
                        ? "Victoire"
                        : expectation.answer.ourTeamGoals <
                          expectation.answer.opposingTeam
                        ? "Défaite"
                        : "Nul"}
                    </td>
                    <td>{expectation.answer.ourTeamGoals}</td>
                    <td>{expectation.answer.opposingTeam}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default ExpectationsTable;
