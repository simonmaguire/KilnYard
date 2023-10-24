import { Form, Container } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";
import { dateStringToComponentValue } from "../../utility/utilityFunctions";
import { ErrorMessage } from "@hookform/error-message";

function TrimmingSection() {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<IPotInfo>();

  return (
    <div className="form-section">
      <h3 className="section-header">Trimming</h3>
      <Container>
        <Form.Group className="form-group max-width-200">
          <Form.Label id="trim-date-label">Date</Form.Label>
          <Controller
            name="trim_date"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="date"
                aria-labelledby="trim-date-label"
                value={dateStringToComponentValue(field.value)}
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(e);
                  await trigger(["throwing_date", "trim_date", "result_date"]);
                }}
              />
            )}
          />
          <ErrorMessage
            className="error-text"
            errors={errors}
            name="trim_date"
            as="p"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Greenware Decorations</Form.Label>
          <Controller
            name="green_decorations"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="text"
                aria-label="green-decorations"
                autoComplete="off"
              />
            )}
          />
          <ErrorMessage
            className="error-text"
            errors={errors}
            name="green_decorations"
            as="p"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Trimming Notes</Form.Label>
          <Controller
            name="trim_notes"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                {...field}
                as="textarea"
                aria-label="trim-notes"
                autoComplete="off"
              />
            )}
          />
          <ErrorMessage
            className="error-text"
            errors={errors}
            name="trim_notes"
            as="p"
          />
        </Form.Group>
      </Container>
    </div>
  );
}

export default TrimmingSection;
