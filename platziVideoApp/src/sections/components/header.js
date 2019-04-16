import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 26,
    resizeMode: "contain"
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row"
  },
  right: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});

const header = ({ children }) => (
  <View>
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
        <View style={styles.right}>{children}</View>
      </View>
    </SafeAreaView>
  </View>
);

export default header;
