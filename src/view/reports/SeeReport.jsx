/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import NavBar from "../shared/navBar/NavBar";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useParams } from "react-router-dom";

const SeeReport = () => {
  const { id } = useParams();
  console.log(typeof id);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");

  // get single report
  const getReport = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}report/admin/${id}/`);
      console.log(response);
      setSubject(response.data.data.subject);
      setDescription(response.data.data.description);
      setMedia(response.data.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReport();
  }, []);

  return (
    <>
      <NavBar title="Quizz" />
      <div className="container">
        <p>Voir signalement</p>
        <div className="form">
          <form>
            <div className="input nom">
              <label htmlFor="nom">Objet</label>
              <input type="text" id="nom" name="nom" value={subject} disabled />
            </div>
            <div className="input nom">
              <label htmlFor="nom">Description</label>
              <textarea rows={10} value={description} disabled />
            </div>
            <label htmlFor="prix">Media</label>
            <div className="media">
              <img
                alt="image"
                src={`${baseUrl}${media}`}
                style={{
                  width: "300px",
                  height: "300px",
                  margin: "20px",
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SeeReport;
