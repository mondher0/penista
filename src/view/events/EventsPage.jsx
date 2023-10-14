import NavBar from "../shared/navBar/NavBar";
import EventsTable from "./EventsTable";
import { useNavigate } from "react-router-dom";
import { cancel, scanIcon } from "../../assets/index";
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
  const [qrscan, setQrscan] = useState(false);
  const handleScan = async (data) => {
    if (data) {
      try {
        setQrscan(data);
        console.log(data);
        console.log("good scan");
        const qrInfo = {
          qr_code: data,
          event_id: 23,
        };
        const response = await axiosInstance.post(
          `${baseUrl}reservations/admin/check_ticket/`,
          qrInfo
        );
        console.log(response);
        if (!response.data.success) {
          setIsError(response.data.message);
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
                }}
              >
                <img src={cancel} alt="cancel" />
              </div>
              <div className="info">
                <form>
                  <div style={{ marginTop: 30 }}>
                    {isError ? (
                      <p>{isError}</p>
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
                {!isError && (
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
