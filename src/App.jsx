import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminContainer from "./view/adminContainer/AdminContainer";
import DashBoardPage from "./view/dashBoard/DashBoardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminContainer />}>
          <Route index element={<DashBoardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
