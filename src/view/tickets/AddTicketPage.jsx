import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
const AddTicketPage = () => {
  return (
    <>
      <NavBar title="Offres" />
      <div className="container">
        <p>Ajouter un tiquet de match</p>
        <div className="form">
          <form>
            <div className="input nom">
              <label htmlFor="nom">Equipe adverse</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Equipe adverse"
              />
            </div>
            <div className="input nom">
              <label htmlFor="nom">Code equipe</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Code equipe"
              />
            </div>
            <div className="input nom">
              <label htmlFor="nom">Stade</label>
              <select
                name="stade"
                id="stade"
                style={{
                  border: "1px solid #ccc",
                }}
              >
                <option value="stade">Stade</option>
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Titre de la ligue</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Titre de la ligue"
              />
            </div>
            <div className="input nom">
              <label htmlFor="nom">N° Rond</label>
              <select
                name="Rond"
                id="Rond"
                style={{
                  border: "1px solid #ccc",
                }}
              >
                <option value="stade">Regroupement</option>
              </select>
            </div>
            <div className="input prix">
              <div className="input nom">
                <label htmlFor="nom">Date du match</label>
                <input type="date" id="nom" name="nom" placeholder="date" />
              </div>
              <div className="input nom">
                <label htmlFor="nom">Heure du match</label>
                <input type="number" id="nom" name="nom" placeholder="Heure" />
              </div>
              <div className="input nom">
                <label htmlFor="nom">Minute du match</label>
                <input type="number" id="nom" name="nom" placeholder="Minute" />
              </div>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Dernier délai de la résérvation</label>
              <input
                type="date"
                id="nom"
                name="nom"
                placeholder="Dernier délai de la résérvation"
              />
            </div>
            <div className="input prix">
              <div className="input nom">
                <label htmlFor="nom">Nombre de tiquets Min</label>
                <input type="number" id="nom" name="nom" />
              </div>
              <div className="input nom">
                <label htmlFor="nom">Nombre de tiquets Max</label>
                <input type="number" id="nom" name="nom" />
              </div>
              <div className="input nom">
                <label htmlFor="nom">Nombre de tiquets total</label>
                <input type="number" id="nom" name="nom" />
              </div>
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
export default AddTicketPage;
