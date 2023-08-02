import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./CustomNavbar.scss";

const CustomNavbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <h2>CNote</h2>
      <ul>
        {/* <li>
          <Link to="/login">Login</Link>
        </li> */}
        <li>
          <Link
            className={`${location.pathname === "/home" ? "active" : ""}`}
            to="/home"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`${location.pathname === "/upload" ? "active" : ""}`}
            to="/upload"
          >
            Upload
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default CustomNavbar;
