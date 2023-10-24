import "./home-page.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../AppState/context";

export const Home = () => {
  const navigate = useNavigate();
  const { state } = useContext(userContext);

  return (
    <div id="homepage">
      <div id="home-upper">
        <div id="Title-Kiln-Yard">
          <h1 id="Title-Kiln">Kiln</h1>
          <h1 id="Title-Yard">Yard</h1>
        </div>
        <p>
          The place to document all of <br /> your pottery notes, specs, and
          photos
        </p>
        {!state.id && (
          <div id="home-btns">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
        )}
        {state.id && (
          <div id="home-btns">
            <button id="home-pottery-btn" onClick={() => navigate("/pottery")}>
              Go To Your Pottery
            </button>
          </div>
        )}
      </div>

      <img id="main-vases" src="pot-set.svg" alt="main image" />
    </div>
  );
};
