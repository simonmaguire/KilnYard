import { Form, Container, Row, Col } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";
import { dateStringToComponentValue } from "../../utility/utilityFunctions";
import { ErrorMessage } from "@hookform/error-message";
import ImageGroup from "../ImageGroup";

type Tprops = {
  addImage: (section: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImage: (section: string, imageIndex: number) => void;
  images: sectionImages;
};

type sectionImages = {
  public_Ids: string[];
  newImages: File[];
};

function ResultSection({ addImage, images, deleteImage }: Tprops) {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPotInfo>();

  return (
    <div className="form-section">
      <h3 className="section-header">Results</h3>
      <Container>
        <Row>
          <Col>
            <Form.Group className="form-group max-width-200">
              <Form.Label id="result-date-label">Date</Form.Label>
              <Controller
                name="result_date"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="date"
                    value={dateStringToComponentValue(field.value)}
                    aria-labelledby="result-date-label"
                  />
                )}
              />
              <ErrorMessage
                className="error-text"
                errors={errors}
                name="result_date"
                as="p"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="form-group max-width-200">
              <Form.Label>Width</Form.Label>
              <div className="input-field-container">
                <Controller
                  name="result_width"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      aria-label="result-width"
                      autoComplete="off"
                    />
                  )}
                />
                <p className="unit-label">in.</p>
              </div>
              <ErrorMessage
                className="error-text"
                errors={errors}
                name="result_width"
                as="p"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="form-group max-width-200">
              <Form.Label>Height</Form.Label>
              <div className="input-field-container">
                <Controller
                  name="result_height"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      aria-label="result-height"
                      name="result_height"
                      autoComplete="off"
                    />
                  )}
                />
                <p className="unit-label">in.</p>
              </div>
              <ErrorMessage
                className="error-text"
                errors={errors}
                name="result_height"
                as="p"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="form-group">
          <Form.Label>Result Notes</Form.Label>
          <Controller
            name="result_notes"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                {...field}
                as="textarea"
                aria-label="result-notes"
                autoComplete="off"
              />
            )}
          />
          <ErrorMessage
            className="error-text"
            errors={errors}
            name="result_notes"
            as="p"
          />
        </Form.Group>
        <ImageGroup
          addImage={addImage}
          deleteImage={deleteImage}
          images={images}
          section="result"
        />
      </Container>
    </div>
  );
}

export default ResultSection;
