import NavBar from "../shared/navBar/NavBar";
import { useParams } from "react-router-dom";
import "./EditSettingsPage.css";

const EditSettingsPage = () => {
  const { id } = useParams();
  return (
    <>
      <NavBar title="Paramètres" />
      <div className="infor">
        <form>
          <input
            type="text"
            placeholder="Nom"
            disabled
            value={`Ils ont dis de nous ${id}`}
          />
          <div className="header">
          <button className="add-product">Enregistrer</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditSettingsPage;
