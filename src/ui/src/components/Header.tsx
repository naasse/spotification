import { useEffect, useContext } from "react";
import { isNil } from "lodash";
import { useNavigate, useLocation, Location } from "react-router-dom";
import { UserContext } from "../state/UserContext";

import "./Header.css";

export const Header = () => {
  const userContext = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const hasToken = !isNil(localStorage.getItem("accessToken"));

  const login = (location: Location) => {
    if (location.hash.indexOf("#access_token") > -1) {
      localStorage.setItem(
        "accessToken",
        location.hash.substring("#access_token=".length)
      );
      window.location.href = "/";
    } else if (
      location.pathname !== "/login" &&
      location.pathname !== "/logout"
    ) {
      navigate("/login");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/logout");
  };

  useEffect(() => {
    if (hasToken) {
      return;
    }

    login(location);
  }, [location]);

  return (
    <>
      <header className="Header">
        <div className="title">Spotification</div>

        {hasToken && (
          <div className="actions">
            <button onClick={logout} className="btn btn-primary">
              Log Out
            </button>
            <img
              className={"profile-image"}
              src={userContext.user?.images[0].url}
            />
          </div>
        )}
      </header>
    </>
  );
};
