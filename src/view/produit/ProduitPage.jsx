import NavBar from "../shared/navBar/NavBar";
import ProductTable from "./ProductTable";
import "./ProduitPage.css";
import { useNavigate } from "react-router-dom";

const ProduitPage = () => {
  const navigate = useNavigate();
  const myStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  };

  return (
    <>
      <NavBar title="Produit" />
      <div className="container">
        <div className="title">
          <p>Vos Produit</p>
          <div style={myStyle}>
            <button
              className="add-product"
              onClick={() => navigate("/categories")}
            >
              Catégories
            </button>
            <button
              className="add-product"
              onClick={() => navigate("/produit/ajouter-produit")}
            >
              Ajouter Produit
            </button>
          </div>
        </div>
        <div className="table">
          <ProductTable />
        </div>
      </div>
    </>
  );
};

export default ProduitPage;
