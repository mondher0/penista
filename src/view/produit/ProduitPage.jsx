import NavBar from "../shared/navBar/NavBar";
import ProductTable from "./ProductTable";
import "./ProduitPage.css";

const ProduitPage = () => {
  return (
    <>
      <NavBar title="Produit" />
      <div className="container">
        <div className="title">
          <p>Vos Produit</p>
          <button className="add-product">Ajouter Produit</button>
        </div>
        <div className="table">
          <ProductTable />
        </div>
      </div>
    </>
  );
};

export default ProduitPage;
