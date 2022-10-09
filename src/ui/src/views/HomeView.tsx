import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isNil } from "lodash";
import { SpotifyWebApi } from "spotify-web-api-ts";
import { PrivateUser } from "spotify-web-api-ts/types/types/SpotifyObjects";

export const HomeView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [me, setMe] = useState<PrivateUser | null>(null);

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
      const api = new SpotifyWebApi({ accessToken });
      api.users
        .getMe()
        .then((resp) => {
          setMe(resp);
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
