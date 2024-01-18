import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import Logo from "../assets/images/logo.png";
import { Home, PlusSquare, Users } from "lucide-react";
import "./CustomNavbar.scss";

const CustomNavbar = () => {
  const { userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoggedIn = !!userToken;
  return (
    <nav className="navbar row">
      <a className=" brand " href="/">
        <img
          src={Logo}
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt=""
        />
        <h4>Hi-Notes</h4>
      </a>
      <ul className="col-7">
        {isLoggedIn && (
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
        )}
        {isLoggedIn && (
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
        )}

        {!isLoggedIn ? (
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
        ) : (
          <li>
            <Link
              className={`nav-item ${
                location.pathname === "/login" ? "active" : ""
              }`}
              to="#"
              onClick={(e) => {
                dispatch(logout());
                e.preventDefault();
              }}
            >
              <Users />
              <p>Logout</p>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default CustomNavbar;
