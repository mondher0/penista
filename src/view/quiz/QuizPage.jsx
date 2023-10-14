import { useState } from "react";
import NavBar from "../shared/navBar/NavBar";
import QuizTable from "./QuizTable";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const [filter, setFilter] = useState(false);
  const [etat, setEtat] = useState("");
  const [adversaire, setAdversaire] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <NavBar title="Quizz" />
      <div className="container">
        <div className="title row">
          <p>Toutes les résponse</p>
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
                    <option value="draw">Nul</option>
                    <option value="win">Victoire</option>
                    <option value="loss">Défaite</option>
                  </select>
                </div>
                <div className="element">
                  <div>Club</div>
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
            <button
              className="add-product"
              style={{
                width: "fit-content",
              }}
              onClick={() => navigate("/mes-quizz")}
            >
              Mes quizz
            </button>
          </div>
        </div>
        <QuizTable
          filter={filter}
          etat={etat}
          adversaire={adversaire}
          date={date}
        />
      </div>
    </>
  );
};

export default QuizPage;
