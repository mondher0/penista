import NavBar from "../shared/navBar/NavBar";
import "./ExpectationsPage.css";
import ExpectationsTable from "./ExpectationsTable";

const ExpectationsPage = () => {
  return (
    <>
      <NavBar title="Expectations" />
      <div className="container">
        <div className="title row">
          <p>Toutes les expectations</p>
          <div>
            <form>
              <div className="search">
                <div className="element">
                  <div>Etat</div>
                  <select name="abonnement" id="abonnement">
                    <option value="">Choisir</option>
                    <option value="1">Nul</option>
                    <option value="2">Victoire</option>
                    <option value="3">Défaite</option>
                  </select>
                </div>
                <div className="element">
                  <div>Adversaire</div>
                  <input type="text" placeholder="Ecrivez..." />
                </div>
                <div className="element">
                  <div>Date du match</div>
                  <input type="date" placeholder="Ecrivez..." />
                </div>
              </div>
              <button type="submit" className="add-product">
                Filtrer
              </button>
            </form>
          </div>
        </div>
        <ExpectationsTable />
      </div>
    </>
  );
};

export default ExpectationsPage;
