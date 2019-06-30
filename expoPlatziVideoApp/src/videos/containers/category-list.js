import React, { PureComponent } from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import Empty from "../components/empty";
import Separator from "../../sections/components/horizontal-separator";
import Category from "../components/category";
import Layout from "../components/category-list-layout";

function mapStateToProps(state) {
  return {
    list: state.videos.categoryList
  };
}

class CategoryList extends PureComponent {
  keyExtractor = item => item.id.toString();

  renderEmtpy = () => <Empty text="No hay sugerencias." />;

  itemSeparator = () => <Separator />;

  viewCategory = item => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "Category",
        params: {
          genre: item.genres[0]
        }
      })
    );
  };

  renderItem = ({ item }) => {
    return (
      <Category
        {...item}
        onPress={() => {
          this.viewCategory(item);
        }}
      />
    );
  };

  render() {
    return (
      <Layout title="Categorias">
        <FlatList
          horizontal
          keyExtractor={this.keyExtractor}
          data={this.props.list}
          ListEmptyComponent={this.renderEmtpy}
          ItemSeparatorComponent={this.itemSeparator}
          renderItem={this.renderItem}
        />
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(CategoryList);
