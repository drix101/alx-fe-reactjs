import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <RegistrationForm />
      <hr />
      <FormikForm />
    </div>
  );
}

export default App;
