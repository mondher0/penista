import { useNavigate } from "react-router-dom";
import NavBar from "../shared/navBar/NavBar";
import CategoriesTable from "./CategoriesTable";

const CategoriesPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar title="Catégories" />
      <div className="container">
        <div className="title">
          <p>Mes catégories</p>

          <button
            className="add-product"
            onClick={() => navigate("/categories/ajouter-categorie")}
          >
            Ajouter une catégorie
          </button>
        </div>
        <CategoriesTable />
      </div>
    </>
  );
};

export default CategoriesPage;
