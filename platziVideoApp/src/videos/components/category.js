import React from "react";
import { Text, ImageBackground, StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    width: 250,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  genre: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,.75)",
    textShadowOffset: {
      width: 2,
      height: 2
    },
    ...Platform.select({
      ios: {
        textShadowRadius: 0
      },
      android: {
        textShadowRadius: 10,
        elevation: 1
      }
    })
  }
});

function category(props) {
  return (
    <ImageBackground
      style={styles.wrapper}
      source={{ uri: props.background_image }}
    >
      <Text style={styles.genre}>{props.genres[0]}</Text>
    </ImageBackground>
  );
}

export default category;
