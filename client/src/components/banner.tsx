// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { userContext } from "../AppState/context";
import ProfileNavigation from "./profileNavigation";
import { useLocation } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  // const { state, dispatch } = useContext(userContext);
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <div id="banner">
      <div
        id="kiln-yard-with-logo"
        className="clickable"
        onClick={() => navigate("/")}
      >
        <img
          // id="banner-vase"
          src="./vase-svgrepo-com.svg"
          alt="Kiln Yard Vase"
        />
        <h1>Kiln Yard</h1>
      </div>
      <ProfileNavigation />

      {/* {state.id && (
          <h3
            onClick={() => {
              logout().then(() => dispatch({ type: ActionTypes.logout }));
              navigate("/");
            }}
          >
            Logout
          </h3>
        )}
        {!state.id && (
          <div className="auth-buttons">
            <h3
              className="clickable"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </h3>
            <h3>|</h3>
            <h3
              className="clickable"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </h3>
          </div>
        )} */}
    </div>
  );
};

export default Banner;
