import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    marginHorizontal: 5
  }
});

function horizontalSeparator(props) {
  return <View style={styles.separator} />;
}

export default horizontalSeparator;
