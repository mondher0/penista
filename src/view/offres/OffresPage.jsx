import NavBar from "../shared/navBar/NavBar";

const OffresPage = () => {
  return (
    <>
      <NavBar title="Offres" />
      <div className="container">
        <div className="title">
          <p>Toutes les offres</p>
          <button className="add-product">Ajouter offre</button>
        </div>
      </div>
    </>
  );
};

export default OffresPage;
