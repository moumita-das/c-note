import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./Switch.scss";

const Switch = ({ falseState, trueState, handleChange, label }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleToggle = () => {
    handleChange(!isChecked);
    setIsChecked(!isChecked);
  };
  return (
    <Form className="switch-form-wrapper">
      <Form.Label>{label}</Form.Label>
      <label className="switch">
        <input
          type="checkbox"
          id="togBtn"
          checked={isChecked}
          onChange={() => {}}
        />
        <div className="slider round" onClick={handleToggle}>
          <span className="on">{trueState}</span>
          <span className="off">{falseState}</span>
        </div>
      </label>
    </Form>
  );
};

export default Switch;
