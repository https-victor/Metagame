import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import { AuthContext } from "./Auth/AuthState";

const PrivateRoute = ({
  component: Component,
  redirectTo,
  isLoggedIn,
  path,
  children,
  ...props
}: any) => {
  if (!isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }
  return (
    <Route path={path} element={<Component />}>
      {children}
    </Route>
  );
};

export default function MainRoutes() {
  const { loggedIn } = useContext(AuthContext);
  console.log(loggedIn);
  return (
    <Routes>
      <PrivateRoute path="/login" isLoggedIn={!loggedIn} redirectTo="/" component={<Login />} />
      <PrivateRoute
        path="/*"
        isLoggedIn={loggedIn}
        redirectTo="/login"
        component={Dashboard}
      >
        <Route path="profile/:userId" element={<Profile />} />
      </PrivateRoute>
    </Routes>
  );
}
