import React from "react";
import { FlatList } from "react-native";

import Empty from "../components/empty";
import Separator from "../../sections/components/horizontal-separator";
import Suggestion from "../components/suggestion";
import Layout from "../components/category-list-layout";

const categoryList = ({ list }) => {
  function keyExtractor(item) {
    return item.id.toString();
  }

  return (
    <Layout title="Categorías">
      <FlatList
        horizontal
        keyExtractor={keyExtractor}
        data={list}
        ListEmptyComponent={() => <Empty text="No hay sugerencias" />}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => <Suggestion {...item} />}
      />
    </Layout>
  );
};

export default categoryList;
