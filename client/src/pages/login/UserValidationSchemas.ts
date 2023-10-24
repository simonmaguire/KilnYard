import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

export const registerValidationSchema = Yup.object().shape({
  email: Yup.string().email("must be a valid email").required(),
  username: Yup.string().required(),
  password: Yup.string().password(),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), ""], "Passwords don't match."),
});

export const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});
