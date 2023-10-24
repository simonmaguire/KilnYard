import React, { useState } from "react";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import DeletePopup from "../../pages/pottery/DeletePopup";
import { formatPotNameForCard } from "./utility/utilityFunctions";
import { Cloudinary } from "@cloudinary/url-gen";

type PotCardProps = {
  pot: IPotInfo;
  handleDelete: (id: string) => void;
};

const PotCard: React.FC<PotCardProps> = (props) => {
  const navigate = useNavigate();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const handleCloseDeleteWarning = () => setShowDeleteWarning(false);
  const handleShowDeleteWarning = () => setShowDeleteWarning(true);

  const potCardName = props.pot.name
    ? formatPotNameForCard(props.pot.name)
    : props.pot.name;

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME || "",
    },
  });

  const primaryImgId =
    props.pot.result_pic_ids && props.pot.result_pic_ids[0]
      ? props.pot.result_pic_ids[0]
      : props.pot.throwing_pic_ids && props.pot.throwing_pic_ids[0]
      ? props.pot.throwing_pic_ids[0]
      : undefined;

  const primaryImgURL = primaryImgId
    ? cld.image(primaryImgId).toURL()
    : "vase-svgrepo-com-grey.svg";

  return (
    <div className="pot-card-container">
      <div
        className="pot-card"
        onClick={() => navigate(`/pottery/${props.pot._id}`)}
      >
        <img
          className="pot-card-pic"
          src={primaryImgURL}
          alt="testPic with png"
        />
        <div className="pot-card-info">
          <h2>{potCardName}</h2>
          {props.pot.category && <p>Type: {props.pot.category}</p>}
          {props.pot.stage && <p>Stage: {props.pot.stage}</p>}
        </div>
      </div>
      <div id="pot-card-actions">
        <div
          className="pot-action-btn"
          onClick={() => navigate(`/pottery/${props.pot._id}`)}
        >
          <BsPencilSquare
            className="pot-action"
            role="img"
            aria-label="edit-icon"
          />
        </div>
        <div className="pot-action-btn" onClick={handleShowDeleteWarning}>
          <BsTrashFill
            className="pot-action"
            role="img"
            aria-label="delete-icon"
          />
        </div>
      </div>
      <DeletePopup
        show={showDeleteWarning}
        handleClose={handleCloseDeleteWarning}
        confirmedAction={() => {
          props.handleDelete(props.pot._id);
          handleCloseDeleteWarning();
        }}
      />
    </div>
  );
};

export default PotCard;
