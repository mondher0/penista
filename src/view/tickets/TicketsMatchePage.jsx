import NavBar from "../shared/navBar/NavBar";

const TicketsMatchePage = () => {
  return (
    <>
      <NavBar title="Tiquet" />
      <div className="container">
        <div className="title">
          <p>Tous les tiquets de matchs publiés</p>
          <button className="add-product">Ajouter un tiquet de match</button>
        </div>
      </div>
    </>
  );
};

export default TicketsMatchePage;
