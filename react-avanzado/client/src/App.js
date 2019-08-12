import React, { Suspense } from "react";
import { Router } from "@reach/router";

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

import Context from "./Context";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <GlobalStyles />
      <Logo />
      <Router>
        <Home path="/" />
        <Home path="/pet/:id" />
        <Detail path="/detail/:id" />
      </Router>

      <Context.Consumer>
        {({ isAuth }) =>
          isAuth ? (
            <Router>
              <Favs path="favs" />
              <Profile path="user" />
            </Router>
          ) : (
            <Router>
              <NotRegistered path="favs" />
              <NotRegistered path="user" />
            </Router>
          )
        }
      </Context.Consumer>
      <NavBar />
    </Suspense>
  );
}

export default App;
