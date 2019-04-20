import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  separator: {
    borderTopWidth: 1
  }
});

const verticalSeparator = ({ color }) => (
  <View
    style={[styles.separator, { borderTopColor: color ? color : "#eaeaea" }]}
  />
);

export default verticalSeparator;
