import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    justifyContent: "center",
    color: "#fff",
    marginBottom: "2rem",
    backgroundColor: "#ffffffff"
  };

  return (
    <nav style={navStyle}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/services">Services</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
export default Navbar;
