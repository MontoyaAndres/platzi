import React, { useState, useEffect } from "react";
import { Text } from "react-native";

import Home from "./src/screens/containers/home";
import Header from "./src/sections/components/header";
import SuggestionList from "./src/videos/containers/suggestion-list";
import CategoryList from "./src/videos/containers/category-list.js";
import { getSuggestion, getMovies } from "./utils/api";

const App = () => {
  const [suggestionList, setSuggestionList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  async function fetchSuggestion() {
    const response = await getSuggestion(10);
    setSuggestionList(response);
  }

  async function fetchCategory() {
    const response = await getMovies();
    setCategoryList(response);
  }

  useEffect(() => {
    fetchSuggestion();
  }, [suggestionList]);

  useEffect(() => {
    fetchCategory();
  }, [categoryList]);

  return (
    <Home>
      <Header />
      <Text>Buscador</Text>
      <CategoryList list={categoryList} />
      <SuggestionList list={suggestionList} />
    </Home>
  );
};

export default App;
