import ReportsTable from "./ReportsTable";
import NavBar from "../shared/navBar/NavBar";

const ReportsPage = () => {
  return (
    <>
      <NavBar title="Signalements" />
      <div className="container">
        <div className="title">
          <p>Tous les signalements</p>
        </div>
        <ReportsTable />
      </div>
    </>
  );
};

export default ReportsPage;
