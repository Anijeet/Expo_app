import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 4 characters long"),
    name: Yup.string().required("Name is required"),
});
