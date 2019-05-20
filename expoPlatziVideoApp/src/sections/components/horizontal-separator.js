import React from "react";
import { View } from "react-native";

function HorizontalSeparator() {
  return <View style={styles.separator} />;
}

const styles = {
  separator: {
    flex: 1,
    marginHorizontal: 5
  }
};

export default HorizontalSeparator;
