import React from "react";
import CustomNavbar from "../components/CustomNavbar";

const Layout = (props) => {
  return (
    <>
      <CustomNavbar />
      <div
        style={{
          height: "100%",
          marginTop: "5px",
          background: "var(--color-light)",
        }}
        className="container"
      >
        {props.children}
      </div>
    </>
  );
};

export default Layout;
