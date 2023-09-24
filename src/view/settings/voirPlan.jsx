/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../shared/navBar/NavBar";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useEffect, useState } from "react";
import { edite } from "../../assets/index";

const VoirPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const [plans, setPlans] = useState();
  const [isLoading1, setIsLoading1] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  // get plan
  const getPlan = async () => {
    try {
      setIsError(false);
      setIsEmpty(false);
      setIsLoading1(true);
      const response = await axiosInstance.get(
        `${baseUrl}accounts/plan/team/${id}/`
      );
      console.log(response);
      setPlans(response.data?.plan);
      setIsLoading1(false);
      if (response.data?.plan?.length === 0) {
        setIsEmpty(true);
      }
    } catch (error) {
      setIsLoading1(false);
      setIsError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getPlan();
  }, []);
  return (
    <>
      <NavBar title="Paramètres" />
      <div className="container">
        <p>Les plans</p>
        <div className="form">
          <>
            {isLoading1 && <div className="loader">Chargement...</div>}
            {isError && <div className="loader">Erreur de chargement</div>}
            {isEmpty && <div className="loader">Aucune Plan</div>}
            <table className="product-table">
              <thead>
                <tr>
                  <th>Nom du plan</th>
                  <th>Photo plan</th>
                  <th>Description</th>
                  <th>Prix</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {plans &&
                  plans.map(
                    (plan) => (
                      console.log(plan),
                      (
                        <>
                          <tr key={plan.id}>
                            <td>{plan.name}</td>
                            <td>
                              <img
                                src={`${baseUrl}${plan.card_image}`}
                                alt="Aucune image"
                                style={{
                                  width: "150px",
                                  height: "100px",
                                }}
                              />
                            </td>
                            <td>{plan.description}</td>
                            <td>{plan.card_price}</td>
                            <td>
                              <img src={edite} alt="edite" className="hover" onClick={() => {
                                navigate(`/parametres/modifier-plan/${plan.id}`);
                              }}/>
                            </td>
                          </tr>
                        </>
                      )
                    )
                  )}
              </tbody>
            </table>
          </>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <button
              className="add-value submit"
              disabled={plans?.length > 1}
              style={{
                backgroundColor: plans?.length > 1 && "#ccc",
              }}
              onClick={() => {
                navigate(`/parametres/ajouter-plan/${id}`);
              }}
            >
              Ajouter un plan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoirPlan;
