/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import NavBar from "../shared/navBar/NavBar";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useParams } from "react-router-dom";

const EditQuizzPage = () => {
  const { id } = useParams();
  console.log(id);
  const [firstTeam, setFirstTeam] = useState("");
  const [firstTeamId, setFirstTeamId] = useState();
  const [secondTeam, setSecondTeam] = useState("");
  const [secondTeamId, setSecondTeamId] = useState();
  const [date, setDate] = useState("");
  const [cup, setCup] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState();
  const [country2, setCountry2] = useState();
  const [error, setError] = useState(false);
  const [firstTeamResult, setFirstTeamResult] = useState();
  const [secondTeamResult, setSecondTeamResult] = useState();
  const [time, setTime] = useState(new Date());

  // get single quizz
  const getSingleQuizz = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}quiz/admin/${id}/`);
      console.log(response);
      setCountry(response.data.data.awayTeam.country.name);
      setCountry2(response.data.data.homeTeam.country.name);
      setFirstTeam(response.data.data.awayTeam.name);
      setSecondTeam(response.data.data.homeTeam.name);
      setFirstTeamId(response.data.data.awayTeam.team_id);
      setSecondTeamId(response.data.data.homeTeam.team_id);
      setFirstTeamResult(response.data.data.awayGoals);
      setSecondTeamResult(response.data.data.homeGoals);
      setCup(response.data.data.league);
      var originalDate = new Date(response.data.data.startDate);
      var year = originalDate.getFullYear();
      var month = (originalDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so we add 1
      var day = originalDate.getDate().toString().padStart(2, "0");
      var formattedDate = year + "-" + month + "-" + day;
      setDate(formattedDate);
    } catch (error) {
      console.log(error);
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = {
        team1_id: firstTeamId,
        team2_id: secondTeamId,
        start_date: date + " " + time,
        league: cup,
      };
      const data2 = {
        home_goals: secondTeamResult,
        away_goals: firstTeamResult,
      };
      const response = await axiosInstance.post(
        `${baseUrl}quiz/admin/update/${id}/`,
        data,
      );
      const response2 = await axiosInstance.post(
        `${baseUrl}quiz/admin/status/${id}/`,
        data2,
      );
      console.log(response);
      console.log(response2);
      if (response.data.success === false || response2.data.success === false) {
        setIsLoading(false);
        setError(true);
        return;
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleQuizz();
  }, []);
  return (
    <>
      <NavBar title="Quizz" />
      <div className="container">
        <p>Modifier un quizz</p>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input nom">
              <label htmlFor="nom">Pays de la première équipe</label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
                disabled
              >
                <option value={country2}>{country2}</option>
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Pays de la Deuxième équipe </label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
                disabled
              >
                <option value={country}>{country}</option>
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Choisir la première équipe</label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
                disabled
              >
                <option value={secondTeam}>{secondTeam}</option>
              </select>
            </div>

            <div className="input nom">
              <label htmlFor="nom">Choisir la Deuxième équipe</label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
                disabled
              >
                <option value={firstTeam}>{firstTeam}</option>
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Resultat de la première équipe</label>
              <input
                type="number"
                id="nom"
                name="nom"
                placeholder="Entrer resultat de la première équipe"
                value={secondTeamResult}
                onChange={(e) => {
                  setSecondTeamResult(e.target.value);
                }}
              />
            </div>
            <div className="input nom">
              <label htmlFor="nom">Resultat de la Deuxième équipe</label>
              <input
                type="number"
                id="nom"
                name="nom"
                placeholder="Entrer resultat de la deuxième équipe"
                value={firstTeamResult}
                onChange={(e) => {
                  setFirstTeamResult(e.target.value);
                }}
              />
            </div>
            <div className="input nom">
              <label htmlFor="nom">La date du match</label>
              <input
                type="date"
                id="nom"
                name="nom"
                placeholder="Entrer la date du match"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              <input
                type="time"
                id="nom"
                name="nom"
                placeholder="Entrer la date du match"
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              />
            </div>
            <div className="input nom">
              <label htmlFor="nom">La coupe à gagner</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="La coupe à gagner"
                value={cup}
                onChange={(e) => {
                  setCup(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="add-value submit"
              style={{
                marginTop: "5px",
              }}
            >
              {isLoading ? "Chargement..." : error ? "Erreur" : "Modifier"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditQuizzPage;
