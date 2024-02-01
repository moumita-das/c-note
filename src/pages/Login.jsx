import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authActions";
import Layout from "./Layout";
import "./Login.scss";
import { UserCircle, User, Lock } from "lucide-react";
import loginBg from "../assets/images/login-bg.png";
import ErrorToast from "../components/ErrorToast";

const Login = () => {
  const { userToken, loading, success, error } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (success && userToken) navigate("/");
  }, [userToken]);
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
            <div className="form-group">
              <User />
              <div className="input-container">
                <input
                  id="form_name1"
                  className="form-control"
                  type="text"
                  required
                  autoComplete="new-password"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label htmlFor="form_name1">
                  Email ID<span className="gl-form-asterisk"></span>
                </label>
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: "20px" }}>
              <Lock size={20} />
              <div className="input-container">
                <input
                  id="form_name2"
                  className="form-control"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label htmlFor="form_name2">
                  Password<span className="gl-form-asterisk"></span>
                </label>
              </div>
            </div>

            <button
              className="btn customBtn"
              onClick={() => {
                dispatch(loginUser({ email, password }));
              }}
            >
              {loading ? <div className="lds-dual-ring"></div> : "Login"}
            </button>
            <div className="extra-links">
              <Link to="/home">Forgot Password?</Link>
              <Link to="/signup">Create Account</Link>
            </div>
          </div>
        </div>
      </div>
      {error && <ErrorToast error={error} />}
    </Layout>
  );
};

export default Login;
