import { Button } from "react-bootstrap";

interface IButtonProps {
  onClick: () => void;
}

interface IFormSubmitButtonProps {
  loading: boolean;
  disabled: boolean;
}

export const CancelFormButton = ({ onClick }: IButtonProps) => {
  return (
    <Button variant="outline-primary" onClick={onClick}>
      Cancel
    </Button>
  );
};

export const CreateFormButton = ({
  disabled,
  loading,
}: IFormSubmitButtonProps) => {
  return (
    <Button variant="outline-primary" type="submit" disabled={disabled}>
      {!loading ? "Create" : "...Loading"}
    </Button>
  );
};

export const SaveFormButton = ({
  disabled,
  loading,
}: IFormSubmitButtonProps) => {
  return (
    <Button variant="outline-primary" type="submit" disabled={disabled}>
      {!loading ? "Save" : "...Loading"}
    </Button>
  );
};

export const DeleteFormButton = ({ onClick }: IButtonProps) => {
  return (
    <Button variant="outline-primary" onClick={onClick}>
      Delete Pot
    </Button>
  );
};
