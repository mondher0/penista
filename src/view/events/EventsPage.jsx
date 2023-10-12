import NavBar from "../shared/navBar/NavBar";
import EventsTable from "./EventsTable";
import { useNavigate } from "react-router-dom";
import { cancel, scanIcon } from "../../assets/index";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import "../shared/popUp/PopUp.css";
const EventsPage = () => {
  const navigate = useNavigate();
  const myStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  };
  const [qrscan, setQrscan] = useState(false);
  const [data, setData] = useState("No result");
  const handleScan = (data) => {
    if (data) {
      setQrscan(data);
      console.log(data);
      console.log("good scan");
    }
  };
  const handleError = (err) => {
    console.error(err);
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
              <div className="cancel hover" onClick={() => setQrscan(false)}>
                <img src={cancel} alt="cancel" />
              </div>
              <div className="info">
                <form>
                  <div style={{ marginTop: 30 }}>
                    <QrScanner
                      onDecode={(result) => {
                        handleScan(result);
                      }}
                      onError={(error) => console.log(error?.message)}
                    />
                  </div>
                </form>
                <p>Scanner le code QR</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventsPage;
