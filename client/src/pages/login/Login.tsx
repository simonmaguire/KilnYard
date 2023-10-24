import { useEffect, useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { isUserAuth, login } from "../../API";
import { Form, Col } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router";
import { ErrorMessage } from "@hookform/error-message";
import { loginValidationSchema } from "./UserValidationSchemas";
import { Container } from "react-bootstrap";
import { userContext } from "../../AppState/context";
import { ActionTypes } from "../../AppState/actions";

const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(userContext);

  const loginUser = (data: { username: string; password: string }) => {
    login(data).then(() => {
      isUserAuth().then((res) => {
        dispatch({
          type: ActionTypes.login,
          payload: { id: res.data.userId, username: res.data.username },
        });
      });
    });
  };

  useEffect(() => {
    isUserAuth().then((res) =>
      res.data.isLoggedIn ? navigate("/pottery") : null
    );
  }, [state.id]);

  const methods = useForm<{ username: string; password: string }>({
    mode: "onChange",
    resolver: yupResolver(loginValidationSchema),
  });

  return (
    <div id="login-form">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(loginUser)}>
          <Container>
            <Col>
              <Form.Group className="form-group auth-input">
                <Form.Label>Username</Form.Label>
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
            </Col>
            <button type="submit">Submit</button>
          </Container>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
//
//
