// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Blog from "./components/Blog";
import Post from "./components/Post";
import Profile from "./components/Profile";
import Login from "./pages/Login";

// Fake authentication simulation
const isAuthenticated = false; // toggle true/false to test

// Protected Route component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Blog dynamic routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Post />} />

        {/* Protected Routes */}
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Catch all */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;