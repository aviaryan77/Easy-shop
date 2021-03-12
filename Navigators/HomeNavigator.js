import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ProductContainer } from "../Screens/Products/ProductContainer";
import { SingleProduct } from "../Screens/Products/SingleProduct";

const Stack = createStackNavigator();

export const HomeNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={ProductContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={SingleProduct}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
