import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginView } from "./views/LoginView";
import { Header } from "./components/Header";
import { HomeView } from "./views/HomeView";
import { Logout } from "./components/Logout";
import { isNil } from "lodash";
import { SpotifyWebApi } from "spotify-web-api-ts";
import { PrivateUser } from "spotify-web-api-ts/types/types/SpotifyObjects";

import { useEffect, useState } from "react";
import { UserContext } from "./state/UserContext";

import "./App.css";

const App = () => {
  const hasToken = !isNil(localStorage.getItem("accessToken"));
  const [me, setMe] = useState<PrivateUser>();

  useEffect(() => {
    if (hasToken) {
      new SpotifyWebApi({
        accessToken: localStorage.getItem("accessToken") ?? "",
      }).users
        .getMe()
        .then(setMe)
        .catch(console.error);
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider
        value={{ user: me, token: localStorage.getItem("accessToken") }}
      >
        <Router>
          <Header />

          <Routes>
            {hasToken && <Route path="/" element={<HomeView />} />}
            <Route path="/login" element={<LoginView />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
};

export default App;
