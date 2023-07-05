import NavBar from "../shared/navBar/NavBar";
import ProductTable from "./ProductTable";
import "./ProduitPage.css";
import { useNavigate } from "react-router-dom";

const ProduitPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar title="Produit" />
      <div className="container">
        <div className="title">
          <p>Vos Produit</p>
          <button
            className="add-product"
            onClick={() => navigate("/ajouter-produit")}
          >
            Ajouter Produit
          </button>
        </div>
        <div className="table">
          <ProductTable />
        </div>
      </div>
    </>
  );
};

export default ProduitPage;
