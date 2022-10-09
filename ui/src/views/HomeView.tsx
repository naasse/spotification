import { useContext } from "react";
import { UserContext } from "../state/UserContext";

export const HomeView = () => {
  const userContext = useContext(UserContext);

  return (
    <>
      <h1>Logged in as {userContext.user?.display_name}</h1>
      <div className="media">
        <div className="pull-left">
          <img
            className="media-object"
            width="150"
            src={userContext.user?.images[0].url}
          />
        </div>
        <div className="media-body">
          <dl className="dl-horizontal">
            <dt>Display name</dt>
            <dd className="clearfix">{userContext.user?.display_name}</dd>
            <dt>Id</dt>
            <dd>{userContext.user?.id}</dd>
            <dt>Email</dt>
            <dd>{userContext.user?.email}</dd>
            <dt>Country</dt>
            <dd>{userContext.user?.country}</dd>
            <dt>Followers</dt>
            <dd>{userContext.user?.followers.total}</dd>
          </dl>
        </div>
      </div>
    </>
  );
};
