import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginView } from "./views/LoginView";
import { Header } from "./components/Header";
import { HomeView } from "./views/HomeView";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />

      <Router>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
