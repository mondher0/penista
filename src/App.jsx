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
import AddEventPage from "./view/events/AddEventPage";
import OffresPage from "./view/offres/OffresPage";
import AddOffrePage from "./view/offres/AddOffrePage";
import ExpectationsPage from "./view/expectations/ExpectationsPage";
import TicketsPage from "./view/tickets/TicketsPage";
import TicketsMatchePage from "./view/tickets/TicketsMatchePage";
import AddTicketPage from "./view/tickets/AddTicketPage";
import CadeauxPage from "./view/cadeaux/CadeauxPage";
import SettingsPage from "./view/settings/SettingsPage";
import EditSettingsPage from "./view/settings/EditSettingsPage";
import SettingsAddImagePage from "./view/settings/SettingsAddImagePage";
import LoginPage from "./view/login/LoginPage";
import EnterEmailPage from "./view/login/EnterEmailPage";
import ValideCodePage from "./view/login/ValideCodePage";
import NewPasswordPage from "./view/login/NewPasswordPage";
import ErrorPage from "./view/error/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mdp-oublié" element={<EnterEmailPage />} />
        <Route path="/valider-code" element={<ValideCodePage />} />
        <Route path="/changer-mot-de-passe" element={<NewPasswordPage />} />
        <Route path="*" element={<ErrorPage />} />
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
          <Route
            path="/evenements/ajouter-evenement"
            element={<AddEventPage />}
          />
          <Route path="/offres" element={<OffresPage />} />
          <Route path="/offres/ajouter-offre" element={<AddOffrePage />} />
          <Route path="/expectations" element={<ExpectationsPage />} />
          <Route path="/tiquet" element={<TicketsPage />} />
          <Route path="/tiquet/mes-tiquets" element={<TicketsMatchePage />} />
          <Route path="/tiquet/ajouter-tiquet" element={<AddTicketPage />} />
          <Route path="/cadeaux" element={<CadeauxPage />} />
          <Route path="/parametres" element={<SettingsPage />} />
          <Route
            path="/parametres/:id/modifier"
            element={<EditSettingsPage />}
          />
          <Route
            path="/parametres/ajouter-image"
            element={<SettingsAddImagePage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
