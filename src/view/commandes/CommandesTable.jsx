/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { eye } from "../../assets/index";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import "./CommandesTable.css";
import { useNavigate } from "react-router-dom";
const CommandesTable = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  // get all commandes
  const getCommandes = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseUrl}order/?page=${currentPage}`
      );
      console.log(response);
      setOrders(response.data.data.orders);
      if (response.data.data.orders.length === 0) {
        setIsEmpty(true);
      }
      setPages(response.data.data.pages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };
  useEffect(() => {
    getCommandes();
  }, [currentPage]);

  // Pagination handlers
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {isLoading && <div className="loader">Chargement...</div>}
      {isError && <div className="loader">Erreur de chargement</div>}
      {isEmpty && <div className="loader">Aucune commande</div>}
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
          {orders?.map((order) => (
            <>
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  <div className="user-details">
                    <img
                      src={`${baseUrl}static${order.client_info.image}`}
                      alt="user"
                    />
                    <div className="user-info">
                      <p>{order.client_info.first_name}</p>
                      <span>{order.client_info.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  {order.client_info.first_name}
                  {order.client_info.last_name}
                </td>
                <td>{order.client_info.phone_no}</td>
                <td>{order.client_info.wilaya}</td>
                <td>{order.commune}</td>
                <td>{order.shippingMethod}</td>
                <td>{order.promo}</td>
                <td>{order.createdAt}</td>
                <td>
                  <div className="type">{order.status}</div>
                </td>
                <td>
                  <img
                    src={eye}
                    alt="Consulter"
                    onClick={() => {
                      navigate(`/commandes/${order.id}`);
                    }}
                  />
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={goToPreviousPage}>
          Previous
        </button>
        <span>Page{currentPage}</span>
        <button onClick={goToNextPage} disabled={currentPage == pages}>
          Next
        </button>
      </div>
    </>
  );
};

export default CommandesTable;
