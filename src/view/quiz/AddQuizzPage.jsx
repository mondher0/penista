/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import NavBar from "../shared/navBar/NavBar";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import TimePicker from "react-time-picker";

const AddQuizzPage = () => {
  const [firstTeam, setFirstTeam] = useState("");
  const [secondTeam, setSecondTeam] = useState("");
  const [date, setDate] = useState("");
  const [cup, setCup] = useState("");
  const [teams, setTeams] = useState([]);
  const [teams2, setTeams2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState();
  const [country, setCountry] = useState();
  const [country2, setCountry2] = useState();
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [time, setTime] = useState(new Date());

  // get all countries
  const getCountries = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}countries/?no_pagination=true`,
      );
      setCountries(response.data.countries);
    } catch (error) {
      console.log(error);
    }
  };

  // get clubs
  const getClubs = async () => {
    try {
      setIsLoaded(true);
      setIsError(false);
      const response = await axiosInstance.get(
        `${baseUrl}teams/notActive/?no_pagination=true&country=${country}`,
      );
      setTeams(response.data.teams);
      setIsLoaded(false);
    } catch (error) {
      setIsLoaded(false);
      setIsError(true);
    }
  };

  // get clubs
  const getClubs2 = async () => {
    try {
      setIsLoaded(true);
      setIsError(false);
      const response = await axiosInstance.get(
        `${baseUrl}teams/notActive/?no_pagination=true&country=${country2}`,
      );
      console.log(response);
      setTeams2(response.data.teams);
      setIsLoaded(false);
    } catch (error) {
      setIsLoaded(false);
      setIsError(true);
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log(time);
      const data = {
        team1_id: firstTeam,
        team2_id: secondTeam,
        start_date: date + " " + time,
        league: cup,
      };
      console.log(data);
      const response = await axiosInstance.post(
        `${baseUrl}quiz/admin/create/`,
        data,
      );
      console.log(response);
      if (response.data.success === false) {
        setIsLoading(false);
        setError(true);
        return;
      }
      setIsLoading(false);
      window.location.href = "/mes-quizz";
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    if (country) {
      getClubs();
    }
    if (country2) {
      getClubs2();
    }
    getCountries();
  }, [country, country2]);

  return (
    <>
      <NavBar title="Quizz" />
      <div className="container">
        <p>Ajouter un quizz</p>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input nom">
              <label htmlFor="nom">Pays de la première équipe</label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Choisissez un Pays</option>
                {countries &&
                  countries.map((country) => (
                    <option value={country.name} key={country.id}>
                      {country.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Pays se la Deuxième équipe </label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
                onChange={(e) => setCountry2(e.target.value)}
              >
                <option value="">Choisissez un Pays</option>
                {countries &&
                  countries.map((country) => (
                    <option value={country.name} key={country.id}>
                      {country.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Choisir la première équipe</label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
                onChange={(e) => {
                  setFirstTeam(e.target.value);
                }}
              >
                {isError && <option>Erreur de chargement</option>}
                {isLoaded ? (
                  <option value="">Chargement...</option>
                ) : (
                  <>
                    <option value="">
                      {!country
                        ? "Choisissez un Pays D'abord"
                        : "Choisissez un Club"}
                    </option>
                    {teams &&
                      teams.map((team) => (
                        <option value={team.team_id} key={team.id}>
                          {team.name}
                        </option>
                      ))}
                  </>
                )}
              </select>
            </div>

            <div className="input nom">
              <label htmlFor="nom">Choisir la Deuxième équipe</label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
                onChange={(e) => {
                  setSecondTeam(e.target.value);
                }}
              >
                {isError && <option>Erreur de chargement</option>}
                {isLoaded ? (
                  <option value="">Chargement...</option>
                ) : (
                  <>
                    <option value="">
                      {!country2
                        ? "Choisissez un Pays D'abord"
                        : "Choisissez un Club"}
                    </option>
                    {teams2 &&
                      teams2.map((team) => (
                        <option value={team.team_id} key={team.id}>
                          {team.name}
                        </option>
                      ))}
                  </>
                )}
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">La date du match</label>
              <input
                type="date"
                id="nom"
                name="nom"
                placeholder="Entrer la date du match"
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
              {isLoading ? "Chargement..." : error ? "Erreur" : "Ajouter"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddQuizzPage;
