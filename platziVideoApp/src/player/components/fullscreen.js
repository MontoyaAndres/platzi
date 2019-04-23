import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 10,
    height: 25,
    marginVertical: 5,
    marginLeft: 10
  }
});

function fullscreen({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      hitSlop={{
        left: 5,
        top: 5,
        bottom: 5,
        right: 5
      }}
    >
      <Icon name="fullscreen" size={20} color="#98ca3f" />
    </TouchableOpacity>
  );
}

export default fullscreen;
