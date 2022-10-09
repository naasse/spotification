import { useState, useEffect } from "react";
import { isNil } from "lodash";
import { SpotifyWebApi } from "spotify-web-api-ts";
import { PrivateUser } from "spotify-web-api-ts/types/types/SpotifyObjects";

export const HomeView = () => {
  const [me, setMe] = useState<PrivateUser | null>(null);

  useEffect(() => {
    new SpotifyWebApi({
      accessToken: localStorage.getItem("accessToken") ?? "",
    }).users
      .getMe()
      .then(setMe)
      .catch(console.error);
  }, []);

  if (isNil(me)) {
    return null;
  }

  return (
    <>
      <h1>Logged in as {me.display_name}</h1>
      <div className="media">
        <div className="pull-left">
          <img className="media-object" width="150" src={me.images[0].url} />
        </div>
        <div className="media-body">
          <dl className="dl-horizontal">
            <dt>Display name</dt>
            <dd className="clearfix">{me.display_name}</dd>
            <dt>Id</dt>
            <dd>{me.id}</dd>
            <dt>Email</dt>
            <dd>{me.email}</dd>
            <dt>Country</dt>
            <dd>{me.country}</dd>
            <dt>Followers</dt>
            <dd>{me.followers.total}</dd>
          </dl>
        </div>
      </div>
    </>
  );
};
