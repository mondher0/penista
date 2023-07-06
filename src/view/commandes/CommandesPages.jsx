import NavBar from "../shared/navBar/NavBar";
import CommandesTable from "./CommandesTable";

const CommandesPages = () => {
  return (
    <>
      <NavBar title="Commandes" />
      <div className="container">
        <p>Toutes les commandes</p>
        <CommandesTable />
      </div>
    </>
  );
};

export default CommandesPages;
