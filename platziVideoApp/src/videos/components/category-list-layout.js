import React from "react";
import { Text, StyleSheet, ImageBackground } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 10
  },
  title: {
    color: "#4c4c4c",
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold"
  }
});

function categoryListLayout({ title, children }) {
  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      style={styles.container}
    >
      <Text style={styles.title}>{title}</Text>
      {children}
    </ImageBackground>
  );
}

export default categoryListLayout;
