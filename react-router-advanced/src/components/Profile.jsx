// src/components/Profile.jsx
import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ProfileDetails from "./profile/ProfileDetails";
import ProfileSettings from "./profile/ProfileSettings";

function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>
      <nav>
        <Link to="details">Details</Link> |{" "}
        <Link to="settings">Settings</Link>
      </nav>

      {/* Nested Routes */}
      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
}

export default Profile;
