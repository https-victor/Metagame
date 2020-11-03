import React, { useContext } from "react";
import { Routes, Route, Navigate, useNavigate, Link, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import { AuthContext } from "./Auth/AuthState";
import { Spin } from 'antd';
import Library from "../pages/Library";
import Interface from "../pages/Interface";
import Footer from "../components/Footer";
import Header from "../components/Header";


export const PrivateRoute = ({
  component: Component,
  redirectTo,
  path,
  invert,
  layout = "main",
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
        <Route path={path} element={
          <>
            {layout === "main" || layout === "footerless" ? <Header /> : null}
            <Component />
            {layout === "main" || layout === "headerless" ? <Footer /> : null}
          </>
        }>
          {loading ? "Loading" : ''}
          {children}
        </Route>
      );
    }
  }
};


const LandingPage: React.FC = () => {
  return (
    <div>Inicio<Link to="/metagame">Logar</Link></div>
  )
}

function getMetagameRoutes() {
  return (<>
    <PrivateRoute path="/metagame/login" invert redirectTo="/metagame" component={Login} />
    <PrivateRoute
      path="/metagame"
      redirectTo="/metagame/login"
      component={Dashboard}
    >
      <Route path="profile/:userId" element={<Profile />} />
      <Route path="library" element={<Library />} />
    </PrivateRoute>
    <Route path="interface/:userId/:pcId" element={< Interface />} />
  </>
  );
}

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<LandingPage />} />
      {/* <PrivateRoute path="/" redirectTo="/metagame/login" invert layout="none" component={LandingPage} /> */}
      {getMetagameRoutes()}
      {/* <PrivateRoute path="/metagame/login" invert redirectTo="/metagame" component={Login} />
      <PrivateRoute
        path="/metagame"
        redirectTo="/metagame/login"
        component={Dashboard}
      >
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="library" element={<Library />} />
      </PrivateRoute> */}
      <Route path="interface/:userId/:pcId" element={< Interface />} />
    </Routes>
  );
}
