import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const Loader = (props) => {
  return (
    <View >
      <ActivityIndicator {...props} size={50} animating={true} color="blue" />
    </View>
  );
};