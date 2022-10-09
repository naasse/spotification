import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginView } from "./views/LoginView";
import { Header } from "./components/Header";
import { HomeView } from "./views/HomeView";
import { Logout } from "./components/Logout";
import { isNil } from "lodash";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          {!isNil(localStorage.getItem("accessToken")) && (
            <Route path="/" element={<HomeView />} />
          )}
          <Route path="/login" element={<LoginView />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
