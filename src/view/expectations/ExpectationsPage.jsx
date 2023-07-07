import NavBar from "../shared/navBar/NavBar";
import "./ExpectationsPage.css";

const ExpectationsPage = () => {
  return (
    <>
      <NavBar title="Expectations" />
      <div className="container">
        <div className="title">
          <p>Toutes les expectations</p>
          <div>
            <form>
              <div className="search">
                <div className="element">
                  <div>Etat</div>
                  <select name="abonnement" id="abonnement">
                    <option value="">Choisir</option>
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
              <button type="submit" className="add-product">Filtrer</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpectationsPage;
