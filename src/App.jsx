import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminContainer from "./view/shared/adminContainer/AdminContainer";
import DashBoardPage from "./view/dashBoard/DashBoardPage";
import ProduitPage from "./view/produit/ProduitPage";
import AddProductPage from "./view/produit/AddProductPage";
import CommandesPages from "./view/commandes/CommandesPages";
import SingleCommandePage from "./view/commandes/SingleCommandePage";
import UtilisateursPage from "./view/utilisateurs/UtilisateursPage";
import SingleUtilisateurCommandesPage from "./view/utilisateurs/SingleUtilisateurCommandesPage";
import DemandeAbonnementPage from "./view/utilisateurs/DemandeAbonnementPage";
import SingleUtilisateurEventsPage from "./view/utilisateurs/SingleUtilisateurEventsPage";
import UtilisateursNotificationsPage from "./view/utilisateurs/UtilisateursNotificationsPage";
import EventsPage from "./view/events/EventsPage";
import MyEventsPage from "./view/events/MyEventsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminContainer />}>
          <Route index element={<DashBoardPage />} />
          <Route path="/produit" element={<ProduitPage />} />
          <Route path="/produit/ajouter-produit" element={<AddProductPage />} />
          <Route path="/commandes" element={<CommandesPages />} />
          <Route path="/commandes/:id" element={<SingleCommandePage />} />
          <Route path="/utilisateurs" element={<UtilisateursPage />} />
          <Route
            path="/utilisateurs/commandes/:id"
            element={<SingleUtilisateurCommandesPage />}
          />
          <Route
            path="/utilisateurs/demande-abonnement"
            element={<DemandeAbonnementPage />}
          />
          <Route
            path="/utilisateurs/evenements/:id"
            element={<SingleUtilisateurEventsPage />}
          />
          <Route
            path="/utilisateurs/notifications"
            element={<UtilisateursNotificationsPage />}
          />
          <Route path="/evenements" element={<EventsPage />} />
          <Route path="/evenements/mes-evenements" element={<MyEventsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
