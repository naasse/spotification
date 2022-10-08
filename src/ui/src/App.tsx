import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { isNil } from "lodash";
import SpotifyWebApi from "spotify-web-api-js";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
};

const Main = () => {
  const location = useLocation();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [me, setMe] = useState<string | null>(null);

  useEffect(() => {
    if (isNil(accessToken)) {
      if (location.hash.indexOf("#access_token") > -1) {
        setAccessToken(location.hash.substring("#access_token=".length));
      } else {
        window.location.href = "/login.html";
      }
    }
  }, [accessToken, location]);

  useEffect(() => {
    if (!isNil(accessToken)) {
      console.log(accessToken);
      const api = new SpotifyWebApi();
      api.setAccessToken(accessToken);
      api
        .getMe()
        .then((resp) => {
          setMe(JSON.stringify(resp, undefined, 2));
          console.log(resp);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [accessToken]);

  return (
    <div className="App">
      <header className="App-header">{me}</header>
    </div>
  );
};

export default App;
