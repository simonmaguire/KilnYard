import React from "react";
import { Form, Container, Col, Row } from "react-bootstrap";
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

function ThrowingSection({ addImage, images, deleteImage }: Tprops) {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<IPotInfo>();

  return (
    <div className="form-section">
      <h3 className="section-header">Throwing</h3>
      <Container>
        <Row>
          <Col>
            <Form.Group className="form-group max-width-200">
              <Form.Label id="throw-date-label">Date</Form.Label>
              <Controller
                name="throwing_date"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="date"
                    aria-labelledby="throwing-date-label"
                    value={dateStringToComponentValue(field.value)}
                    onChange={async (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      field.onChange(e);
                      await trigger([
                        "trim_date",
                        "throwing_date",
                        "result_date",
                      ]);
                    }}
                  />
                )}
              />
              <ErrorMessage
                className="error-text"
                errors={errors}
                name="throwing_date"
                as="p"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="form-group max-width-200">
              <Form.Label>Clay Weight</Form.Label>
              <div className="input-field-container">
                <Controller
                  name="clay_weight"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      className="tst-outline"
                      type="text"
                      aria-label="clay-weight"
                      autoComplete="off"
                    />
                  )}
                />
                <p className="unit-label">oz.</p>
              </div>
              <ErrorMessage
                className="error-text"
                errors={errors}
                name="clay_weight"
                as="p"
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="form-group max-width-200">
              <Form.Label>Thrown Height</Form.Label>
              <div className="input-field-container">
                <Controller
                  name="throwing_height"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      aria-label="throwing-height"
                      autoComplete="off"
                    />
                  )}
                />
                <p className="unit-label">in.</p>
              </div>
              <ErrorMessage
                className="error-text"
                errors={errors}
                name="throwing_height"
                as="p"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="form-group max-width-200">
              <Form.Label>Thrown Width</Form.Label>
              <div className="input-field-container">
                <Controller
                  name="throwing_width"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      aria-label="throwing-width"
                      autoComplete="off"
                    />
                  )}
                />
                <p className="unit-label">in.</p>
              </div>
              <ErrorMessage
                className="error-text"
                errors={errors}
                name="throwing_width"
                as="p"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="form-group">
          <Form.Label>Throwing Notes</Form.Label>
          <Controller
            name="throwing_notes"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                {...field}
                as="textarea"
                aria-label="throwing-notes"
                autoComplete="off"
              />
            )}
          />
          <ErrorMessage
            className="error-text"
            errors={errors}
            name="throwing_notes"
            as="p"
          />
        </Form.Group>
        <ImageGroup
          addImage={addImage}
          deleteImage={deleteImage}
          images={images}
          section="throwing"
        />
      </Container>
    </div>
  );
}

export default ThrowingSection;
