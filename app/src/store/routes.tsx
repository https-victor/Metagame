import React, { useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import { AuthContext } from "./Auth/AuthState";
import { Spin } from 'antd';
import Library from "../pages/Library";
import Interface from "../pages/Interface";

const PrivateRoute = ({
  component: Component,
  redirectTo,
  path,
  invert,
  children,
  ...props
}: any) => {
  const { authenticated, loading } = useContext(AuthContext);
  if (loading) {
    return <Spin />
  } else {
    if (invert ? Boolean(authenticated) : Boolean(!authenticated)) {
      return <Navigate to={redirectTo} />;
    } else {
      return (
        <Route path={path} element={<Component />}>
          {loading ? "Loading" : ''}
          {children}
        </Route>
      );
    }
  }
};

export default function MainRoutes() {
  return (
    <Routes>
      <PrivateRoute path="/login" invert redirectTo="/" component={Login} />
      <PrivateRoute
        path="/*"
        redirectTo="/login"
        component={Dashboard}
      >
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="library" element={<Library />} />
      </PrivateRoute>
      <PrivateRoute path="interface/:userId/:pcId" redirectTo="/login" component={Interface} />
    </Routes>
  );
}
