import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginView } from "./views/LoginView";
import { Header } from "./components/Header";
import { HomeView } from "./views/HomeView";
import { Logout } from "./components/Logout";
import { isEmpty, isNil } from "lodash";

import { useEffect, useState } from "react";
import { UserContext } from "./state/UserContext";
import { SpotifyUsers } from "./api/SpotifyUsers";
import { User } from "./api/types";

import "./App.css";

const token = localStorage.getItem("accessToken") ?? "";

const App = () => {
  const [me, setMe] = useState<User>();

  useEffect(() => {
    if (!isEmpty(token) && isNil(me)) {
      const api = new SpotifyUsers(token);
      api.getMe().then(setMe).catch(api.defaultErrorHandler);

      return () => api.abort();
    }
  }, [me]);

  return (
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
  );
};

export default App;
