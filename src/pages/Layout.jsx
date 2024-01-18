import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserDetailsQuery } from "../services/auth/authService";
import CustomNavbar from "../components/CustomNavbar";

const Layout = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  });
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  console.log(data);
  return (
    <>
      <CustomNavbar />
      <div
        style={{
          height: "100%",
        }}
        className="container"
      >
        {props.children}
      </div>
    </>
  );
};

export default Layout;
