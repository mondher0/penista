import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import "../events/AddEventPage.css";
const AddPage = () => {
  return (
    <>
      <NavBar title="Paramètres" />
      <div className="container">
        <div className="form">
          <form>
            <div className="input">
              <label htmlFor="gratuit">Titre</label>
              <input type="text" id="gratuit" name="gratuit" />
            </div>
            <div className="input">
              <label htmlFor="gratuit">Description</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <button
              type="submit"
              className="add-value submit"
              style={{
                marginTop: "0",
              }}
            >
              Modifier
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddPage;
