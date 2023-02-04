import React from "react";
import { Outlet } from "react-router-dom";
import LoginPage from "../../features/account/LoginPage";
import { useAppSelector } from "../../store/store";

export default function AuthGuard() {
  const { isLoggedIn } = useAppSelector((state) => state.account);

  return isLoggedIn ? <Outlet/> : <LoginPage/>
}
