import React from "react";
import { FlatList, Text } from "react-native";

import Layout from "../components/suggestion-list-layout";

const suggestionList = () => {
  const list = [
    {
      key: "0",
      title: "leo"
    },
    {
      key: "1",
      title: "nidas"
    }
  ];

  return (
    <Layout title="Recomendado para ti">
      <FlatList
        data={list}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </Layout>
  );
};

export default suggestionList;
