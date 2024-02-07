import ReportsTable from "./ReportsTable";
import NavBar from "../shared/navBar/NavBar";
import UserReportsTable from "./UserReportsTable";

const ReportsPage = () => {
  return (
    <>
      <NavBar title="Signalements" />
      <div className="container">
        <div className="title">
          <p>Signalement de l’application</p>
        </div>
        <ReportsTable />
        <div className="title">
          <p>Signalement sur les utilisateurs</p>
        </div>
        <UserReportsTable />
      </div>
    </>
  );
};

export default ReportsPage;
