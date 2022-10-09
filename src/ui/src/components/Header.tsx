import { useEffect } from "react";
import { isNil } from "lodash";
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hasToken = !isNil(localStorage.getItem("accessToken"));

  useEffect(() => {
    if (hasToken) {
      return;
    }

    if (location.hash.indexOf("#access_token") > -1) {
      localStorage.setItem(
        "accessToken",
        location.hash.substring("#access_token=".length)
      );
      window.location.href = "/";
      window.location.reload();
    } else if (
      location.pathname !== "/login" &&
      location.pathname !== "/logout"
    ) {
      navigate("/login");
    }
  }, [location]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/logout");
  };

  return (
    <>
      <header className="Header" style={{ position: "absolute", top: 0 }}>
        Spotification
        {hasToken && (
          <nav>
            <button onClick={logout} className="btn btn-primary">
              Log Out
            </button>
          </nav>
        )}
      </header>
    </>
  );
};
