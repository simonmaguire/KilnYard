import { BsPlusCircle } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

const Options = () => {
  const navigate = useNavigate();

  return (
    <IconContext.Provider value={{ size: "2em" }}>
      <div id="gallery-options">
        <BsPlusCircle
          id="create-pot-icon"
          role="img"
          aria-label="create-pot-icon"
          alt-text="aaa"
          onClick={() => navigate("/pottery/new")}
        ></BsPlusCircle>
      </div>
    </IconContext.Provider>
  );
};

export default Options;
