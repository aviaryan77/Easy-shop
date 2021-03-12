import React from "react";
import { TouchableOpacity, View, Dimensions, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";
var { width } = Dimensions.get("window");

const ProductList = (props) => {
  const { item } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("ProductDetail", { item: item });
      }}
      style={styles.container}
    >
      <View style={styles.view}>
        <ProductCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    width: "50%",
  },
  view: {
    width: width / 2,
    backgroundColor: "gainsboro",
  },
});
