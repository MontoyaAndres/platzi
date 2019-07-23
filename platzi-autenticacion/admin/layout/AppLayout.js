import React, { useState, useEffect } from "react";

import AppNavbar from "./AppNavbar";
import AppFooter from "./AppFooter";

import AuthService from "../services/AuthService";
import isEmptyObject from "../utils/isEmptyObject";

import {
  generalStyles,
  visibilityStyles,
  semanticStyles
} from "../utils/globalStyles";

function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const authService = new AuthService();

  useEffect(() => {
    const profile = authService.getProfile();

    if (!isEmptyObject(profile)) {
      setIsAuthenticated(true);
      setLoggedUser({
        name: profile.display_name,
        email: profile.email,
        picture:
          profile && profile.images.length > 0
            ? profile.images[0].url
            : "/static/images/empty-posts.svg"
      });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  function handleLogin() {
    authService.login();
  }

  function handleLogout() {
    authService.logout();
    window.location.href = "/";
  }

  return (
    <div className="layout">
      <AppNavbar
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        loggedUser={loggedUser}
      />
      <main className="layout-content">{children}</main>
      <AppFooter />
      <style jsx global>
        {generalStyles}
      </style>
      <style jsx global>
        {visibilityStyles}
      </style>
      <style jsx global>
        {semanticStyles}
      </style>
    </div>
  );
}

export default Layout;
