import NavBar from "../shared/navBar/NavBar";

const AddQuizzPage = () => {
  return (
    <>
      <NavBar title="Quizz" />
      <div className="container">
        <p>Ajouter un quizz</p>
        <div className="form">
          <form>
            <div className="input nom">
              <label htmlFor="nom">Choisir la première équipe</label>
              <select
                name="type-offre"
                id="type-offre"
                style={{
                  border: "1px solid #E5E5E5",
                }}
              >
                <option value="">Choisissez la première équipe</option>
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Choisir la Deuxième équipe</label>
              <select
                name="type-offre"
                id="type-offre"
                style={{
                  border: "1px solid #E5E5E5",
                }}
              >
                <option value="">Choisissez la Deuxième équipe</option>
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">La date du match</label>
              <input
                type="date"
                id="nom"
                name="nom"
                placeholder="Entrer la date du match"
              />
            </div>
            <div className="input nom">
              <label htmlFor="nom">La coupe à gagner</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="La coupe à gagner"
              />
            </div>
            <button
              type="submit"
              className="add-value submit"
              style={{
                marginTop: "5px",
              }}
            >
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddQuizzPage;
