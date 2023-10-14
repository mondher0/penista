import NavBar from "../shared/navBar/NavBar";
import EventsTable from "./EventsTable";
import { useNavigate } from "react-router-dom";
import { cancel, errorQr, scanIcon, succesQr } from "../../assets/index";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import "../shared/popUp/PopUp.css";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
const EventsPage = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const myStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  };
  const pStyle = {
    color: "#202224",
    textAlign: "center",
    fontSize: "13px",
    fontWeight: "500",
    marginTop: "10px",
  };
  const [qrscan, setQrscan] = useState(false);
  const [success, setSuccess] = useState(false);
  const [succesData, setSuccesData] = useState();
  const handleScan = async (data) => {
    if (data) {
      try {
        setQrscan(data);
        console.log(data);
        console.log("good scan");
        const qrInfo = {
          qr_code: data,
        };
        console.log(qrInfo);
        const response = await axiosInstance.post(
          `${baseUrl}reservations/admin/check_ticket/`,
          qrInfo
        );
        console.log(response);
        setSuccess(response.data.message);
        setSuccesData(response.data.data);
        if (!response.data.success) {
          setIsError(response.data.message);
          setSuccesData(response.data.data);
          return;
        }
        return;
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <NavBar title="Evénements" />
      <div className="container">
        <div className="title">
          <p>Tous les événements résérvés</p>
          <div style={myStyle}>
            <button className="add-product" onClick={() => setQrscan(true)}>
              <img src={scanIcon} />
            </button>
            <button
              className="add-product"
              onClick={() => navigate("/evenements/mes-evenements")}
            >
              Mes événements
            </button>
          </div>
        </div>
        <EventsTable />
        {qrscan && (
          <div className="them">
            <div className="them_container">
              <div
                className="cancel hover"
                onClick={() => {
                  setQrscan(false);
                  setIsError(false);
                  setSuccess(false);
                }}
              >
                <img src={cancel} alt="cancel" />
              </div>
              <div className="info">
                <form>
                  <div style={{ marginTop: 30 }}>
                    {isError ? (
                      <>
                        <img
                          src={errorQr}
                          alt="error"
                          style={{
                            width: "150px",
                          }}
                        />
                        <p style={pStyle}>
                          Utilisateur:{succesData.client_name}
                        </p>
                        <p style={pStyle}>Event: {succesData.event_title}</p>
                        <p style={pStyle}>
                          Tickets: {succesData.used_tickets} /{" "}
                          {succesData.total_tickets}
                        </p>
                        <p
                          style={{
                            color: "red",
                            marginTop: "10px",
                            fontSize: "13px",
                          }}
                        >
                          {isError}
                        </p>
                      </>
                    ) : success ? (
                      <>
                        <img
                          src={succesQr}
                          alt="success"
                          style={{
                            width: "150px",
                          }}
                        />
                        <p style={pStyle}>
                          Utilisateur:{succesData.client_name}
                        </p>
                        <p style={pStyle}>Event: {succesData.event_title}</p>
                        <p style={pStyle}>
                          Tickets: {succesData.used_tickets} /{" "}
                          {succesData.total_tickets}
                        </p>
                        <p style={pStyle}>Status:{success}</p>
                      </>
                    ) : (
                      <QrScanner
                        onDecode={(result) => {
                          handleScan(result);
                        }}
                        onError={(error) => console.log(error?.message)}
                      />
                    )}
                  </div>
                </form>
                {!isError && !success && (
                  <p
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    Scanner le code QR
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventsPage;
