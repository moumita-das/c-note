import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { Home, PlusSquare, Users } from "lucide-react";
import "./CustomNavbar.scss";

const CustomNavbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar row">
      <a class=" brand " href="/">
        <img
          src={Logo}
          width="50"
          height="50"
          class="d-inline-block align-top"
          alt=""
        />
        <h4>Hi-Notes</h4>
      </a>
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
            <Home />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link
            className={`nav-item ${
              location.pathname === "/upload" ? "active" : ""
            }`}
            to="/upload"
          >
            <PlusSquare />
            <p>Upload</p>
          </Link>
        </li>
        <li>
          <Link
            className={`nav-item ${
              location.pathname === "/login" ? "active" : ""
            }`}
            to="/login"
          >
            <Users />
            <p>Login</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default CustomNavbar;
