import "react-native-gesture-handler";
import React from "react";

// import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

// Navigators
import { MainNavigator } from "./Navigators/MainNavigator";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

import { Header } from "./Shared/Header";
//LogBox.ignoreAllLogs(true);

// Context API
import Auth from "./Context/store/Auth";

import Toast from "react-native-toast-message";

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <MainNavigator />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}
