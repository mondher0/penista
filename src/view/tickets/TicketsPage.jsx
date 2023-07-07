import NavBar from "../shared/navBar/NavBar";

const TicketsPage = () => {
  return (
    <>
      <NavBar title="Tiquet" />
      <div className="container">
        <div className="title">
          <p>Toutes les demandes des tiquets</p>
          <button className="add-product">Mes tiquets de matchs</button>
        </div>
      </div>
    </>
  );
};

export default TicketsPage;
