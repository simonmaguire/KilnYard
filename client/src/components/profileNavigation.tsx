import { useState, useContext } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { userContext } from "../AppState/context";
import { logout } from "../API";

import { ActionTypes } from "../AppState/actions";

interface ProfileNavProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileNavigation = () => {
  const [showProfileNavBar, setShowProfileNavBar] = useState<boolean>(false);

  return (
    <div className="auth-buttons">
      <IconContext.Provider value={{ size: "1.5em" }}>
        <BsPersonCircle
          className="clickable"
          id="profile-icon"
          role="img"
          aria-label="profile-icon"
          alt-text="User Profile"
          onClick={() => {
            setShowProfileNavBar(!showProfileNavBar);
          }}
        ></BsPersonCircle>
      </IconContext.Provider>
      {showProfileNavBar && <ProfileNavBar setShow={setShowProfileNavBar} />}
    </div>
  );
};

export const ProfileNavBar = (props: ProfileNavProps) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(userContext);

  let profileOptions = [];
  state.id
    ? profileOptions.push({
        displayText: "Logout",
        path: "/",
        executable: () =>
          logout().then(() => dispatch({ type: ActionTypes.logout })),
      })
    : profileOptions.push(
        { displayText: "Signup", path: "/signup" },
        { displayText: "Login", path: "/login" }
      );

  return (
    <div id="profile-nav-container">
      <ul id="profile-nav">
        {profileOptions.map((item, y) => (
          <li
            className="clickable"
            key={y}
            onClick={() => {
              if (item.executable) {
                item.executable();
              }
              props.setShow(false);
              navigate(item.path);
            }}
          >
            {item.displayText}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileNavigation;
