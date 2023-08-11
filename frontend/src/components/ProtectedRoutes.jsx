import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isAuth }) => {
  //isAuth를 props로 받아온다.
  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
}; //outlet이 ProtectedPasge가 된다.

export default ProtectedRoutes;
