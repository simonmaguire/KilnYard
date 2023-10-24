import { Form } from "react-bootstrap";
import { CATEGORY_OPTIONS, STAGE_OPTIONS } from "../../utility/Constants";
import { useFormContext, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function GeneralSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPotInfo>();

  return (
    <div className="form-content">
      <Form.Group className="form-group half-width">
        <Form.Label>Name</Form.Label>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div>
              <Form.Control
                {...field}
                type="text"
                aria-label="name"
                autoComplete="off"
              />
            </div>
          )}
        />
        <ErrorMessage
          className="error-text"
          errors={errors}
          name="name"
          as="p"
        />
      </Form.Group>
      <Form.Group className="form-group half-width">
        <Form.Label>Clay</Form.Label>
        <Controller
          name="clay"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Control
              {...field}
              type="text"
              aria-label="clay"
              autoComplete="off"
            />
          )}
        />
        <ErrorMessage
          className="error-text"
          errors={errors}
          name="clay"
          as="p"
        />
      </Form.Group>
      <Form.Group className="form-group half-width">
        <Form.Label>Stage</Form.Label>
        <Controller
          name="stage"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Select {...field} aria-label="stage" className="tst2">
              <option value=""></option>
              {STAGE_OPTIONS.map((x, y) => (
                <option value={x} key={y}>
                  {x}
                </option>
              ))}
            </Form.Select>
          )}
        />
      </Form.Group>

      <Form.Group className="form-group half-width">
        <Form.Label>Category</Form.Label>
        <Controller
          name="category"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Select {...field} name="category" aria-label="category">
              <option value=""></option>
              {CATEGORY_OPTIONS.map((x, y) => (
                <option value={x} key={y}>
                  {x}
                </option>
              ))}
            </Form.Select>
          )}
        />
      </Form.Group>
    </div>
  );
}

export default GeneralSection;
