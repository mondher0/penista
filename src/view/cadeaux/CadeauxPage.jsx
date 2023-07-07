import NavBar from "../shared/navBar/NavBar";
import CadeauxTable from "./CadeauxTable";
const CadeauxPage = () => {
  return (
    <>
      <NavBar title="Cadeaux" />
      <div className="container">
        <p>Tous les points des utilisateurs</p>
        <CadeauxTable />
      </div>
    </>
  );
};

export default CadeauxPage;
