import React, { useEffect } from "react";
import { Text } from "react-native";

import Home from "./src/screens/containers/home";
import Header from "./src/sections/components/header";
import SuggestionList from "./src/videos/containers/suggestion-list";
import { getSuggestion } from "./utils/api";

const App = () => {
  useEffect(async () => {
    const movies = await getSuggestion(10);
  });

  return (
    <Home>
      <Header />
      <Text>Buscador</Text>
      <Text>Categorias</Text>
      <SuggestionList />
    </Home>
  );
};

export default App;
