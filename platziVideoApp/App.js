import React from "react";
import { Text } from "react-native";

import Home from "./src/screens/containers/home";
import Header from "./src/sections/components/header";

const App = () => (
  <Home>
    <Header />
    <Text>Buscador</Text>
    <Text>Categorias</Text>
    <Text>sugerencias</Text>
  </Home>
);

export default App;
