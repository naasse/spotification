import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { isNil } from "lodash";
import SpotifyWebApi from "spotify-web-api-js";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

const Header = () => {
  return <header className="Header">Spotification</header>;
};

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [me, setMe] = useState<any | null>(null);

  useEffect(() => {
    if (isNil(accessToken)) {
      if (location.hash.indexOf("#access_token") > -1) {
        setAccessToken(location.hash.substring("#access_token=".length));
      } else {
        navigate("/login");
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
          setMe(resp);
          console.log(resp);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [accessToken]);

  return (
    <>
      <img src={me?.images[0].url} />
      <div>Name: {me?.display_name}</div>
      <div>Email: {me?.email}</div>
      <div>Country: {me?.country}</div>
      <div>Followers: {me?.followers?.total}</div>
    </>
  );
};

// TODO - all of this should pull from env/params
const Login = () => {
  return (
    <>
      <div>Login:</div>
      <a href="http://localhost:8888/login" className="btn btn-primary">
        Log in with Spotify
      </a>
    </>
  );
};

export default App;
