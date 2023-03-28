import * as yup from "yup";

export const staffSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .trim()
    .matches(/^[a-zA-Z][a-zA-Z ]*$/, "Invalid Name"),
  email: yup
    .string()
    .trim()
    .required()
    .test("isvalidEmail", "Invalid e-Mail", (arg) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(arg)
    ),
  password: yup.string().trim().required().min(8).max(16),
  // .test("isPerfectPasswrod", "Enter a strong password", (arg) =>
  //   /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])(?!.*\s).{8,16})/.test(arg)
  // ),
  mobile: yup
    .string()
    .trim()
    .matches(/^[0-9]{10}$/, "Invalid mobile number"),
  role: yup.mixed().oneOf(["warden", "chef"]).required(),
  gender: yup.mixed().oneOf(["male", "female"]).required(),
  profilePic: yup.string().trim(),
  address: yup.object().shape({
    building: yup
      .string()
      .required()
      .trim()
      .matches(/^[a-zA-Z][a-zA-Z ]*$/, "Invalid Address"),
    city: yup
      .string()
      .required()
      .trim()
      .matches(/^[a-zA-Z][a-zA-Z ]*$/, "Invalid Address"),
    pin: yup.string().required().trim(),
    state: yup
      .string()
      .required()
      .trim()
      .matches(/^[a-zA-Z][a-zA-Z ]*$/, "Invalid Address"),
    country: yup
      .string()
      .required()
      .trim()
      .matches(/^[a-zA-Z][a-zA-Z ]*$/, "Invalid Address"),
  }),
});

export const login = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required()
    .test("isvalidEmail", "Invalid e-Mail", (arg) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(arg)
    ),
  password: yup.string().trim().required().min(8).max(16),
  // .test("isPerfectPasswrod", "Enter a strong password", (arg) =>
  //   /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])(?!.*\s).{8,16})/.test(arg)
  // ),
});
