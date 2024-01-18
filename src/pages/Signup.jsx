import React, { useState } from "react";
import Layout from "./Layout";
import { UserCircle, User, Lock, KeyIcon } from "lucide-react";
import loginBg from "../assets/images/login-bg.png";
import ErrorToast from "../components/ErrorToast";

import "./Login.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [stepNum, setStepNum] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const sendOtpButtonClicked = () => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      setError("Please enter all details.");
      return false;
    }
    setLoading(true);
    fetch("http://127.0.0.1:8000/send_otp", {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.message === "failed") {
          setError("We have run into an error. Please try later.");
        } else if (res.message === "success") {
          setStepNum(2);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const verifyOtpButtonClicked = () => {
    if (email.trim().length === 0 || otp.trim().length === 0) {
      setError("Please enter all details.");
      return false;
    }
    fetch("http://127.0.0.1:8000/verify_otp", {
      method: "POST",
      body: JSON.stringify({
        email,
        otp,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.message === "failed") {
          setError("We have run into an error. Please try later.");
        } else if (res.message === "success") {
          setStepNum(2);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  let display;
  if (stepNum === 0)
    display = (
      <div className="form-wrapper">
        <UserCircle size={60} />
        <h2>CREATE ACCOUNT</h2>
        <div class="form-group">
          <User />
          <div className="input-container">
            <input
              id="form_name1"
              class="form-control"
              type="text"
              required
              autoComplete="new-password"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              id="form_name2"
              class="form-control"
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label for="form_name2">
              Password<span class="gl-form-asterisk"></span>
            </label>
          </div>
        </div>
        <button
          className={`btn customBtn`}
          onClick={() => {
            sendOtpButtonClicked();
          }}
        >
          {loading ? <div class="lds-dual-ring"></div> : "Send OTP"}
        </button>
      </div>
    );

  if (stepNum === 2)
    display = (
      <div className="form-wrapper">
        <UserCircle size={60} />
        <h2>Verify OTP</h2>

        <div class="form-group" style={{ marginBottom: "20px" }}>
          <KeyIcon size={20} />
          <div className="input-container">
            <input
              id="form_name2"
              class="form-control"
              type="password"
              required
              autoComplete="new-password"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
            <label for="form_name2">
              OTP<span class="gl-form-asterisk"></span>
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
      {error && (
        <ErrorToast
          error={error}
          resetError={() => {
            setError(false);
          }}
        />
      )}
    </Layout>
  );
};

export default Signup;
