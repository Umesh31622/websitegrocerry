import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          {/* <img src="/logo.png" alt="Logo" /> */}
          <span>Grocerry</span>
        </Link>

        {/* Desktop Nav Items */}
        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          {/* <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li> */}
           <li>
            <Link to="/about" onClick={closeMenu}>
              Analytics
            </Link>
          </li> 
          {/* <li>
            <Link to="/services" onClick={closeMenu}>
              Services
            </Link>
          </li> */}
          {/* <li>
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </li> */}
          {/* <li>
            <Link to="/login" className="btn-login" onClick={closeMenu}>
              Login
            </Link>
          </li> */}
        </ul>

        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
}
