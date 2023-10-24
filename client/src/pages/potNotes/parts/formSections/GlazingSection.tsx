import { Form, Container } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function GlazingSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPotInfo>();

  return (
    <div className="form-section">
      <h3 className="section-header">Glazing</h3>
      <Container>
        <Form.Group className="form-group">
          <Form.Label>Glazes</Form.Label>
          <Controller
            name="glazes"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                {...field}
                type="text"
                aria-label="glazes"
                autoComplete="off"
              />
            )}
          />
          <ErrorMessage
            className="error-text"
            errors={errors}
            name="glazes"
            as="p"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Glaze Notes</Form.Label>
          <Controller
            name="glaze_notes"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                {...field}
                as="textarea"
                aria-label="glaze-notes"
                autoComplete="off"
              />
            )}
          />
          <ErrorMessage
            className="error-text"
            errors={errors}
            name="glaze_notes"
            as="p"
          />
        </Form.Group>
      </Container>
    </div>
  );
}

export default GlazingSection;
