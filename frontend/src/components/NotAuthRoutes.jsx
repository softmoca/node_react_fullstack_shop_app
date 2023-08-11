import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const NotAuthRoutes = ({ isAuth }) => {
  //isAuth를 props로 받아온다.
  return isAuth ? <Navigate to={"/"} /> : <Outlet />;
};

export default NotAuthRoutes;
