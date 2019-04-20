import React from "react";
import { FlatList, Text } from "react-native";

import Layout from "../components/suggestion-list-layout";
import Empty from "../components/empty";
import Separator from "../components/vertical-separator";
import Suggestion from "../components/suggestion";

const suggestionList = () => {
  const list = [
    {
      title: "Avengers",
      key: "0"
    },
    {
      title: "queso",
      key: "1"
    }
  ];

  return (
    <Layout title="Recomendado para ti :(">
      <FlatList
        data={list}
        ListEmptyComponent={() => <Empty text="No hay sugerencias" />}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => <Suggestion {...item} />}
      />
    </Layout>
  );
};

export default suggestionList;
