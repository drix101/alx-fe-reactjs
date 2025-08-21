import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import formikForm from "./components/formikForm";

function App() {
  return (
    <div>
      <h1>User Registration</h1>
      <RegistrationForm />
      <h1>Formik Registration</h1>
      <formikForm />
    </div>
  );
}

export default App;
