import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminContainer from "./view/adminContainer/AdminContainer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminContainer />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
