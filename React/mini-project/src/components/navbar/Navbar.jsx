import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">TechApp</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/about">About</Link>

        {isLoggedIn ? (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;