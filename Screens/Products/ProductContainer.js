import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { Container, Text, Header, Icon, Item, Input } from "native-base";
import ProductList from "./ProductList";
import { SearchedProduct } from "./SearchedProduct";
import { Banner } from "../../Shared/Banner";

var { height } = Dimensions.get("window");

const data = require("../../assets/data/products.json");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltereded] = useState([]);
  const [focus, setFocus] = useState();

  useEffect(() => {
    setProducts(data);
    setProductsFiltereded(data);
    setFocus(false);
    return () => {
      setProducts([]);
      setProductsFiltereded([]);
      setFocus();
    };
  }, []);

  const searchProduct = (text) => {
    setProductsFiltereded(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase())),
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onFocus={openList}
            onChangeText={(text) => {
              searchProduct(text);
            }}
          />
          {focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
        </Item>
      </Header>
      {focus == true ? (
        <SearchedProduct productsFiltered={productsFiltered} />
      ) : (
        <ScrollView>
          <View>
            <Banner />
          </View>

          <View style={styles.container}>
            <FlatList
              // horizontal
              numColumns={2}
              // numberOfColumns={2}
              data={products}
              renderItem={({ item }) => (
                <ProductList key={item.name} item={item} />
              )}
              keyExtractor={(item) => item.name}
            />
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 1,
  },
});
