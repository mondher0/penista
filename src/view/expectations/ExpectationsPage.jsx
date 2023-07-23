import NavBar from "../shared/navBar/NavBar";
import "./ExpectationsPage.css";
import ExpectationsTable from "./ExpectationsTable";
import { useState } from "react";

const ExpectationsPage = () => {
  const [filter, setFilter] = useState(false);
  const [etat, setEtat] = useState("");
  const [adversaire, setAdversaire] = useState("");
  const [date, setDate] = useState("");

  return (
    <>
      <NavBar title="Expectations" />
      <div className="container">
        <div className="title row">
          <p>Toutes les expectations</p>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFilter(!filter);
              }}
            >
              <div className="search">
                <div className="element">
                  <div>Etat</div>
                  <select
                    name="abonnement"
                    id="abonnement"
                    onChange={(e) => {
                      setEtat(e.target.value);
                    }}
                  >
                    <option value="">Choisir</option>
                    <option value="null">Nul</option>
                    <option value={true}>Victoire</option>
                    <option value={false}>Défaite</option>
                  </select>
                </div>
                <div className="element">
                  <div>Adversaire</div>
                  <input
                    type="text"
                    placeholder="Ecrivez..."
                    onChange={(e) => setAdversaire(e.target.value)}
                  />
                </div>
                <div className="element">
                  <div>Date du match</div>
                  <input
                    type="date"
                    placeholder="Ecrivez..."
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="add-product">
                Filtrer
              </button>
            </form>
          </div>
        </div>
        <ExpectationsTable
          filter={filter}
          etat={etat}
          adversaire={adversaire}
          date={date}
        />
      </div>
    </>
  );
};

export default ExpectationsPage;
