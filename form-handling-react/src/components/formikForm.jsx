import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password too short").required("Password is required"),
});

export default function FormikForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    // Simulate API call
    console.log("Submitted (Formik):", values);
    setTimeout(() => {
      alert("User registered successfully!");
      resetForm();
      setSubmitting(false);
    }, 500);
  };

  return (
    <div>
      <h2>Registration (Formik)</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="username" placeholder="Username" />
            <ErrorMessage name="username" component="div" style={{ color: "red" }} />

            <Field name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" style={{ color: "red" }} />

            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" style={{ color: "red" }} />

            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
