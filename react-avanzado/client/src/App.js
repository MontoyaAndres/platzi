import React, { Suspense, useContext } from "react";
import { Router, Redirect } from "@reach/router";

import { GlobalStyles } from "./styles/GlobalStyles";
import { Logo } from "./components/Logo";
import { NavBar } from "./components/NavBar";
import { Loading } from "./components/Loading";

// routes
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { Favs } from "./pages/Favs";
import { Profile } from "./pages/Profile";
import { NotRegistered } from "./pages/NotRegistered";
import { NotFound } from "./pages/NotFound";

import { Context } from "./Context";

function App() {
  const { isAuth } = useContext(Context);

  return (
    <Suspense fallback={<Loading />}>
      <GlobalStyles />
      <Logo />
      <Router>
        <NotFound default />
        <Home path="/" />
        <Home path="/pet/:id" />
        <Detail path="/detail/:id" />
        {!isAuth && <NotRegistered path="/login" />}
        {!isAuth && <Redirect from="/favs" to="/login" />}
        {!isAuth && <Redirect from="/user" to="/login" />}
        {isAuth && <Redirect from="/login" to="/" noThrow />}

        <Favs path="favs" />
        <Profile path="user" />
      </Router>
      <NavBar />
    </Suspense>
  );
}

export default App;
