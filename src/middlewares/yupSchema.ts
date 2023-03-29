import * as yup from "yup";

// Login Schema
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required()
    .test("isvalidEmail", "Invalid e-Mail", (arg) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(arg)
    ),
  password: yup.string().trim().required().min(8).max(16),
});

// Staff Schema
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

// New Block Schema
export const newBlockSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .trim()
    .min(3, "Invalid Name")
    .matches(/^[a-zA-Z][a-zA-Z ]*$/, "Invalid Name"),
  code: yup
    .string()
    .required("Block code is required")
    .trim()
    .matches(/^[A-Z]$/, "Invalid block code"),
  numberOfRooms: yup
    .number()
    .required("Number of rooms is required")
    .positive()
    .integer()
    .min(10, "Minimum 10 rooms")
    .max(20, "Maximum 20 rooms"),
});

// Notice Schema
export const noticeSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .trim()
    .min(5, "Title must be longer than 5 characters"),
  message: yup
    .string()
    .required("Message is required")
    .trim()
    .min(10, "Message must be longer than 10 characters")
    .max(200, "Message must be shorter than 200 characters"),
  audience: yup.object().shape({
    student: yup
      .bool()
      .required("Specify audience")
      .oneOf([true, false], "Specify audience"),
    staff: yup
      .bool()
      .required("Specify audience")
      .oneOf([true, false], "Specify audience"),
  }),
  date: yup.date(),
});
