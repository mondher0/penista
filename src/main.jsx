import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.jsx";
import PopUpContextProvider from "./context/PopUpContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <PopUpContextProvider>
      <App />
    </PopUpContextProvider>
  </AuthContextProvider>
);
