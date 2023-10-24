import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { getPot } from "../../API";
import { BLANK_POT } from "./utility/Constants";
import { initialValuesAsStrings } from "./utility/utilityFunctions";
import PotForm from "./PotForm";
import { Spinner } from "react-bootstrap";
import "./potNotes.css";

const OBJECTID_LENGTH = 24;

const PotNotes = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(true);
  const [potInfo, setPotInfo] = useState<IPotInfo>({
    ...BLANK_POT,
    _id: id || "",
  });

  const setIdAfterSave = (id: string) => {
    setPotInfo({ ...potInfo, _id: id });
  };

  const loadPot = (): void => {
    if (potInfo._id === "new") {
      setIsLoadingForm(false);
      return;
    }
    if (potInfo._id.length !== OBJECTID_LENGTH) {
      navigate("notfound", { state: { message: "Invalid Pot ID" } });
      return;
    }

    getPot(potInfo._id)
      .then(({ data: { pot } }: IPotInfo | any) => {
        if (!pot) {
          navigate("notfound", { state: { message: "Pot Not Found" } });
          return;
        }
        setPotInfo(initialValuesAsStrings(pot));
        setIsLoadingForm(false);
      })
      .catch(() => {
        setIsLoadingForm(false);
        navigate("/login", { relative: "route" });
      });
  };
  useEffect(loadPot, []);

  return (
    <div>
      <Container id="pot-form-container">
        {isLoadingForm ? (
          <Spinner
            id="loading-spinner"
            animation="border"
            variant="primary"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <PotForm potInfo={potInfo} setIdAfterSave={setIdAfterSave} />
        )}
      </Container>
    </div>
  );
};

export default PotNotes;
