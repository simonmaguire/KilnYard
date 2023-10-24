import { useEffect, useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "./UserValidationSchemas";
import { register, isUserAuth } from "../../API";
import { Form, Col, Container } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { userContext } from "../../AppState/context";
import { ActionTypes } from "../../AppState/actions";

const setErrorsForDuplicateAccounts = (methods: any, message: string) => {
  methods.setError("username", {
    type: "custom",
    message: message,
  });
  methods.setError("email", {
    type: "custom",
    message: message,
  });
};

const Signup = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(userContext);

  const registerUser = (data: IUser) => {
    register(data).then((regInfo) => {
      if (regInfo.data.message == "Username or email has already been taken") {
        setErrorsForDuplicateAccounts(methods, regInfo.data.message);
      }

      isUserAuth().then((res) => {
        dispatch({
          type: ActionTypes.login,
          payload: { id: res.data.userId, username: res.data.username },
        });
        if (res.data.isLoggedIn) {
          navigate("/pottery");
        }
      });
    });
  };

  useEffect(() => {
    isUserAuth().then((res) =>
      res.data.isLoggedIn ? navigate("/pottery") : null
    );
  }, []);

  const methods = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(registerValidationSchema),
  });

  return (
    <div id="singup-form">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(registerUser)}>
          <Container>
            <Col>
              <Form.Group className="form-group auth-input">
                <Form.Label>User Name</Form.Label>
                <Controller
                  name="username"
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      autoComplete="off"
                      aria-label="username"
                    />
                  )}
                />
                <ErrorMessage
                  className="error-text"
                  errors={methods.formState.errors}
                  name="username"
                  as="p"
                />
              </Form.Group>
              <Form.Group className="form-group auth-input">
                <Form.Label>Email</Form.Label>
                <Controller
                  name="email"
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      autoComplete="off"
                      aria-label="email"
                    />
                  )}
                />
                <ErrorMessage
                  className="error-text"
                  errors={methods.formState.errors}
                  name="email"
                  as="p"
                />
              </Form.Group>
              <Form.Group className="form-group auth-input">
                <Form.Label>Password</Form.Label>
                <Controller
                  name="password"
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      autoComplete="off"
                      aria-label="password"
                    />
                  )}
                />
                <ErrorMessage
                  className="error-text"
                  errors={methods.formState.errors}
                  name="password"
                  as="p"
                />
              </Form.Group>
              <Form.Group className="form-group auth-input">
                <Form.Label>Confirm Password</Form.Label>
                <Controller
                  name="confirmPassword"
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      autoComplete="off"
                      aria-label="confirm-password"
                    />
                  )}
                />
                <ErrorMessage
                  className="error-text"
                  errors={methods.formState.errors}
                  name="confirmPassword"
                  as="p"
                />
              </Form.Group>
            </Col>
            <button type="submit">Submit</button>
          </Container>
        </form>
      </FormProvider>
    </div>
  );
};

export default Signup;
//
//
