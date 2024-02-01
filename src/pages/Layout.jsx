import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserDetailsQuery } from "../services/auth/authService";
import CustomNavbar from "../components/CustomNavbar";
import { setCredentials } from "../features/auth/authSlice";

const Layout = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { data, isFetching, error } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  });
  useEffect(() => {
    console.log(error);
    if (data) dispatch(setCredentials(data));
    else if (error && location.pathname != "/signup") navigate("/login");
  }, [data, dispatch, error]);
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
