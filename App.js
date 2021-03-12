import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

// Navigators
import { MainNavigator } from "./Navigators/MainNavigator";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

import { Header } from "./Shared/Header";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}
