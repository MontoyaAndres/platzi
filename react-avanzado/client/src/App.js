import React from "react";

import { GlobalStyles } from "./styles/GlobalStyles";
import { ListOfCategories } from "./components/ListOfCategories";
import { ListOfPhotoCards } from "./components/ListOfPhotoCards";
import { Logo } from "./components/Logo";

function App() {
  return (
    <>
      <GlobalStyles />
      <Logo />
      <ListOfCategories />
      <ListOfPhotoCards />
    </>
  );
}

export default App;
