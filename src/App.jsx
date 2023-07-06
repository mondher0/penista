import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminContainer from "./view/shared/adminContainer/AdminContainer";
import DashBoardPage from "./view/dashBoard/DashBoardPage";
import ProduitPage from "./view/produit/ProduitPage";
import AddProductPage from "./view/produit/AddProductPage";
import CommandesPages from "./view/commandes/CommandesPages";
import SingleCommandePage from "./view/commandes/SingleCommandePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminContainer />}>
          <Route index element={<DashBoardPage />} />
          <Route path="/produit" element={<ProduitPage />} />
          <Route path="/ajouter-produit" element={<AddProductPage />} />
          <Route path="/commandes" element={<CommandesPages />} />
          <Route path="/commandes/:id" element={<SingleCommandePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
