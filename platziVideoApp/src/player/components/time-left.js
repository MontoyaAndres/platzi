import React from "react";
import { Text, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  time: {
    color: "white",
    fontSize: 11
  }
});

function timeReadable(time) {
  const timeInMins = time / 60;
  const mins = Math.floor(timeInMins);
  let seconds = timeInMins % 1;
  seconds = (seconds * 60) / 1000;
  const timeReadable = (mins + seconds * 10)
    .toFixed(2)
    .toString()
    .replace(".", ":");

  return timeReadable;
}

function timeLeft(props) {
  return (
    <View>
      <Text style={styles.time}>
        {props.currentTime} / {timeReadable(props.duration)}
      </Text>
    </View>
  );
}

export default timeLeft;
