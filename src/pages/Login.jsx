import React from "react";
import Layout from "./Layout";
import "./Login.scss";
import { UserCircle, User, Lock } from "lucide-react";
import loginBg from "../assets/images/login-bg.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Layout>
      <div id="login-container">
        <div className="form-container">
          <div
            className="image-wrapper"
            style={{ backgroundImage: `url(${loginBg})` }}
          ></div>
          <div className="form-wrapper">
            <UserCircle size={60} />
            <h2>WELCOME</h2>
            <div class="form-group">
              <User />
              <div className="input-container">
                <input
                  id="form_name1"
                  class="form-control"
                  type="text"
                  required
                  autoComplete="new-password"
                />
                <label for="form_name1">
                  Email ID<span class="gl-form-asterisk"></span>
                </label>
              </div>
            </div>
            <div class="form-group" style={{ marginBottom: "20px" }}>
              <Lock size={20} />
              <div className="input-container">
                <input
                  id="form_name1"
                  class="form-control"
                  type="password"
                  required
                  autoComplete="new-password"
                />
                <label for="form_name1">
                  Password<span class="gl-form-asterisk"></span>
                </label>
              </div>
            </div>
            <button className="btn customBtn">Login</button>
            <div className="extra-links">
              <Link to="/home">Forgot Password?</Link>
              <Link to="/signup">Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
