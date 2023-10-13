import NavBar from "../shared/navBar/NavBar";
import { useNavigate } from "react-router-dom";
import MesQuizzTable from "./MesQuizzTable";

const MesQuizzPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar title="Mes Quizz" />
      <div className="container">
        <div className="title">
          <p>Mes quizz</p>
          <button
            className="add-product"
            onClick={() => navigate("/ajouter-quizz")}
          >
            Ajouter quizz
          </button>
        </div>
        <MesQuizzTable />
      </div>
    </>
  );
};

export default MesQuizzPage;
