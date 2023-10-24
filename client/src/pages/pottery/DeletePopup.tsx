import React from "react";
import { Button, Modal } from "react-bootstrap";

interface DeletePopopProps {
  show: boolean;
  handleClose: () => void;
  confirmedAction: () => void;
}

const DeletePopup: React.FC<DeletePopopProps> = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Pot?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        This creation will be permanently deleted. Are you sure?
      </Modal.Body>
      <Modal.Footer>
        <Button id="cancel-delete-btn" onClick={props.handleClose}>
          Nevermind
        </Button>
        <Button id="delete-btn" onClick={props.confirmedAction}>
          Delete Pot
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DeletePopup;
