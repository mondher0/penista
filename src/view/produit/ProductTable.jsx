import "./ProductTable.css";
import { deleteIcon, edite } from "../../assets/index";
import { useEffect, useState } from "react";
import PopUp from "../shared/popUp/PopUp";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import usePopUpContext from "../../hooks/usePopUpContext";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
  const [showPopUp, setShowPopUp] = useState("");
  const [products, setProducts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const { update } = usePopUpContext();
  const navigate = useNavigate();
  // get products from database
  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseUrl}product/?page=${currentPage}`
      );
      setProducts(response.data.data.products);
      if (response.data.data.products.length === 0) {
        setIsEmpty(true);
      }
      setPages(response.data.data.pages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
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
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, update]);
  return (
    <>
      {isLoading && <div className="loader">Chargement...</div>}
      {isError && <div className="loader">Erreur de chargement</div>}
      {isEmpty && <div className="loader">Aucun produit</div>}
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
          {products?.map(
            (product) => (
              (
                <>
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.free_price}</td>
                    <td>{product.premium_price}</td>
                    <td>{product.pro_price}</td>
                    <td>{product.stock}</td>
                    <td>{product.sales}</td>
                    <td>
                      <img
                        src={deleteIcon}
                        alt="Supprimer"
                        className="hover"
                        onClick={() => {
                          setShowPopUp(product.id);
                        }}
                      />
                      <img
                        src={edite}
                        alt="Modifier"
                        className="hover"
                        onClick={() =>
                          navigate(`/produit/modifier-produit/${product.id}`)
                        }
                      />
                    </td>
                  </tr>
                </>
              )
            )
          )}
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
      {showPopUp && (
        <PopUp
          setShowPopUp={setShowPopUp}
          text="Vous voulez vraiment supprimer ce produit?"
          id={showPopUp}
          button="Supprimer"
          action="deleteProduct"
        />
      )}
    </>
  );
};

export default ProductTable;
