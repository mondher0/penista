import NavBar from "../shared/navBar/NavBar";

const MyEventsPage = () => {
  return (
    <>
      <NavBar title="Evénements" />
      <div className="container">
        <div className="title">
          <p>Mes événements</p>
          <button className="add-product">Ajouter événement</button>
        </div>
      </div>
    </>
  );
};

export default MyEventsPage;
