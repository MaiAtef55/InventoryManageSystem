import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const Guest = () => {
  const auth = getAuthUser();
  return <>{auth && auth.type === 'user' ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default Guest;