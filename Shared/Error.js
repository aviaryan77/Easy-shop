import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Error = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems:"center",
    margin:10,

  },
  Text:{
color:"red",
  }
});

export default Error
