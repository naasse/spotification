import { useEffect, useContext, useCallback } from "react";
import { isEmpty } from "lodash";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../state/UserContext";

import "./Header.css";

const token = localStorage.getItem("accessToken") ?? "";

export const Header = () => {
  const userContext = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const login = useCallback(() => {
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
  }, [location, navigate]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/logout");
  };

  useEffect(() => {
    if (!isEmpty(token)) {
      return;
    }

    login();
  }, [login]);

  return (
    <>
      <header className="Header">
        <div className="title">Spotification</div>

        {!isEmpty(token) && (
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
