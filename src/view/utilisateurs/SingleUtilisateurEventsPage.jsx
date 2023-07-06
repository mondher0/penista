import NavBar from "../shared/navBar/NavBar";
import { next } from "../../assets/index";
import { useParams } from "react-router-dom";
import SingleUtilisateurEventsTable from "./SingleUtilisateurEventsTable";

const SingleUtilisateurEventsPage = () => {
  const { id } = useParams();
  return (
    <>
      <NavBar title="Utilisateurs" />
      <div className="container">
        <div className="header">
          <p>Tous les utilisateurs</p>
          <img src={next} alt="next" />
          <p>{id}</p>
          <img src={next} alt="next" />
          <p>Evénements</p>
        </div>
        <SingleUtilisateurEventsTable />
      </div>
    </>
  );
};

export default SingleUtilisateurEventsPage;
