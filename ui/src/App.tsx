import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginView } from "./views/LoginView";
import { Header } from "./components/Header";
import { HomeView } from "./views/HomeView";
import { Logout } from "./components/Logout";
import { isEmpty } from "lodash";

import { useEffect, useState } from "react";
import { UserContext } from "./state/UserContext";
import { SpotifyUsers } from "./api/SpotifyUsers";
import { User } from "./api/types";

import "./App.css";

const token = localStorage.getItem("accessToken") ?? "";

const App = () => {
  const [me, setMe] = useState<User>();

  useEffect(() => {
    if (!isEmpty(token)) {
      const api = new SpotifyUsers(token);
      api.getMe().then(setMe).catch(api.defaultErrorHandler);

      return () => api.abortAll();
    }
  }, []);

  return (
    <React.StrictMode>
      <div className="App">
        <UserContext.Provider
          value={{ user: me, token: localStorage.getItem("accessToken") }}
        >
          <Router>
            <Header />

            <Routes>
              {!isEmpty(token) && <Route path="/" element={<HomeView />} />}
              <Route path="/login" element={<LoginView />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Router>
        </UserContext.Provider>
      </div>
    </React.StrictMode>
  );
};

export default App;
