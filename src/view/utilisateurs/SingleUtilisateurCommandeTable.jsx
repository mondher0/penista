/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { eye } from "../../assets/index";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";

const SingleUtilisateurCommandeTable = ({ id }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  // get all orders of this user
  const getuserOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseUrl}/order/user/${id}/?page=${currentPage}`
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
    }
  };
  // Pagination handlers
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    getuserOrders();
  }, []);

  return (
    <>
      {isLoading && <div className="loader">Chargement...</div>}
      {isEmpty && (
        <div className="loader">Aucune commande pour cet utilisateur</div>
      )}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Commande</th>
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
          {orders.map((order) => {
            return (
              <>
                <tr>
                  <td>{order.id}</td>
                  <td>
                    {order.client_info.first_name} {order.client_info.last_name}
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
            );
          })}
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

export default SingleUtilisateurCommandeTable;
