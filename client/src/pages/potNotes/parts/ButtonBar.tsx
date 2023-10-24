import React, { useState } from "react";
import {
  CancelFormButton,
  CreateFormButton,
  SaveFormButton,
  DeleteFormButton,
} from "./FormButtons";
import DeletePopup from "../../pottery/DeletePopup";

interface ButtonBarProps {
  potId: string;
  handleDeletePot: () => void;
  handleCancel: () => void;
  formIsValid: boolean;
  loading: boolean;
}

const ButtonBar: React.FC<ButtonBarProps> = ({
  potId,
  handleDeletePot,
  handleCancel,
  formIsValid,
  loading,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="button-bar">
      {potId !== "new" && (
        <SaveFormButton loading={loading} disabled={!formIsValid} />
      )}
      {potId !== "new" && <DeleteFormButton onClick={handleShow} />}
      {potId === "new" && (
        <CreateFormButton loading={loading} disabled={!formIsValid} />
      )}
      <CancelFormButton onClick={handleCancel} />
      <DeletePopup
        show={show}
        handleClose={handleClose}
        confirmedAction={handleDeletePot}
      />
    </div>
  );
};

export default ButtonBar;
