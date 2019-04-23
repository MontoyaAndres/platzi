import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: "56.25%"
  },
  video: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black"
  },
  overlay: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});

const layout = ({ loading, loader, controls, children }) => (
  <View style={styles.container}>
    <View style={styles.video}>{children}</View>
    <View style={styles.overlay}>{loading && loader}</View>
    {controls}
  </View>
);

export default layout;
