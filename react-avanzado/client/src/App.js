import React from "react";
import { Router } from "@reach/router";

import { GlobalStyles } from "./styles/GlobalStyles";
import { Logo } from "./components/Logo";
import { NavBar } from "./components/NavBar";

// routes
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { Favs } from "./pages/Favs";
import { Profile } from "./pages/Profile";
import { NotRegistered } from "./pages/NotRegistered";

function App() {
  return (
    <>
      <GlobalStyles />
      <Logo />
      <Router primary={false}>
        <Home path="/" />
        <Home path="/pet/:id" />
        <Detail path="/detail/:id" />
        <Favs path="/favs" />
        <Profile path="/user" />
      </Router>
      <NavBar />
    </>
  );
}

export default App;
