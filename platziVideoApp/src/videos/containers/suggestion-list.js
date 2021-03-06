import React from "react";
import { FlatList } from "react-native";

import Layout from "../components/suggestion-list-layout";
import Empty from "../components/empty";
import Separator from "../../sections/components/vertical-separator";
import Suggestion from "../components/suggestion";

const suggestionList = ({ list }) => {
  function keyExtractor(item) {
    return item.id.toString();
  }

  return (
    <Layout title="Recomendado para ti">
      <FlatList
        keyExtractor={keyExtractor}
        data={list}
        ListEmptyComponent={() => <Empty text="No hay sugerencias" />}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => <Suggestion {...item} />}
      />
    </Layout>
  );
};

export default suggestionList;
