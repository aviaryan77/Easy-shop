import React from "react";
import { Text, View, SafeAreaView, Image, StyleSheet } from "react-native";

export const Header = (props) => {
  return (
    <View style={styles.header}>
      <Image
        style={{ height: 50 }}
        resizeMode="contain"
        source={require("../assets/Logo.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 2,
    marginTop: 20,
    borderWidth: 1,
  },
});
