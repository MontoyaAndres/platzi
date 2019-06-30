import React, { PureComponent } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

import Search from "../../sections/containers/search";

class Lucky extends PureComponent {
  componentDidMount() {
    this.focus = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("white");
    });
  }

  componentWillUnmount() {
    this.focus.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>🍀</Text>
        <Search />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Lucky;
