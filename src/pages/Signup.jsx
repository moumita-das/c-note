import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, sendOTP, verifyOTP } from "../features/auth/authActions";

import Layout from "./Layout";
import { UserCircle, User, Lock, KeyIcon } from "lucide-react";
import loginBg from "../assets/images/login-bg.png";
import ErrorToast from "../components/ErrorToast";

import "./Login.scss";

const Signup = () => {
  const { loading, userToken, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [stepNum, setStepNum] = useState(1);
  const [formError, setFormError] = useState(false);
  const sendOtpButtonClicked = () => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      setFormError("Please enter all details.");
      return false;
    }
    dispatch(
      sendOTP({
        email,
      })
    );
  };
  const verifyOtpButtonClicked = () => {
    if (email.trim().length === 0 || otp.trim().length === 0) {
      setFormError("Please enter all details.");
      return false;
    }
    dispatch(
      verifyOTP({
        email,
        otp,
      })
    );
  };
  const createAccountBtnClicked = () => {
    if (firstName.trim().length === 0 || lastName.trim().length === 0) {
      setFormError("Please enter all details.");
      return false;
    }
    dispatch(
      registerUser({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      })
    );
  };
  useEffect(() => {
    if (success === true) setStepNum((prevState) => prevState + 1);
  }, [success]);
  useEffect(() => {
    console.log(userToken);
    if (userToken) navigate("/");
  }, [userToken]);
  let display;
  if (stepNum === 1)
    display = (
      <div className="form-wrapper">
        <UserCircle size={60} />
        <h2>CREATE ACCOUNT</h2>
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
          className={`btn customBtn`}
          onClick={() => {
            sendOtpButtonClicked();
          }}
        >
          {loading ? <div className="lds-dual-ring"></div> : "Send OTP"}
        </button>
      </div>
    );

  if (stepNum === 2)
    display = (
      <div className="form-wrapper">
        <UserCircle size={60} />
        <h2>Verify OTP</h2>

        <div className="form-group" style={{ marginBottom: "20px" }}>
          <KeyIcon size={20} />
          <div className="input-container">
            <input
              id="form_name2"
              className="form-control"
              type="password"
              required
              autoComplete="new-password"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
            <label for="form_name2">
              OTP<span className="gl-form-asterisk"></span>
            </label>
          </div>
        </div>
        <button
          className={`btn customBtn`}
          onClick={() => {
            verifyOtpButtonClicked();
          }}
        >
          {loading ? <div class="lds-dual-ring"></div> : "Verify"}
        </button>
      </div>
    );
  else if (stepNum === 3)
    display = (
      <div className="form-wrapper">
        <UserCircle size={60} />
        <h2>ENTER DETAILS</h2>
        <div className="form-group">
          <User />
          <div className="input-container">
            <input
              id="form_name1"
              className="form-control"
              type="text"
              required
              autoComplete="new-password"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <label htmlFor="form_name1">
              First Name<span className="gl-form-asterisk"></span>
            </label>
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: "20px" }}>
          <User size={20} />
          <div className="input-container">
            <input
              id="form_name2"
              className="form-control"
              type="text"
              required
              autoComplete="new-password"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <label htmlFor="form_name2">
              Last Name<span className="gl-form-asterisk"></span>
            </label>
          </div>
        </div>
        <button
          className={`btn customBtn`}
          onClick={() => {
            createAccountBtnClicked();
          }}
        >
          {loading ? <div className="lds-dual-ring"></div> : "Get Started"}
        </button>
      </div>
    );
  console.log(stepNum);
  return (
    <Layout>
      <div id="login-container">
        <div className="form-container">
          <div
            className="image-wrapper"
            style={{ backgroundImage: `url(${loginBg})` }}
          ></div>
          {display}
        </div>
      </div>
      {error && <ErrorToast error={error} />}
      {formError && <ErrorToast error={formError} />}
    </Layout>
  );
};

export default Signup;
