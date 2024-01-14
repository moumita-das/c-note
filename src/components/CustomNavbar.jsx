import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import "./CustomNavbar.scss";

const CustomNavbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="brand col-2">
        <img src={Logo} />
      </div>
      <ul className="col-7">
        <li>
          <Link
            className={`nav-item ${
              location.pathname === "/home" || location.pathname === "/"
                ? "active"
                : ""
            }`}
            to="/home"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`nav-item ${
              location.pathname === "/upload" ? "active" : ""
            }`}
            to="/upload"
          >
            Upload
          </Link>
        </li>
      </ul>
      <div className="col-3 text-end">
        <Link
          className={`nav-item ${
            location.pathname === "/login" ? "active" : ""
          }`}
          to="/login"
        >
          Login / Sign up
        </Link>
      </div>
    </nav>
  );
};

export default CustomNavbar;
