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
import CategoryFilter from "./CategoryFilter";

var { height } = Dimensions.get("window");

const data = require("../../assets/data/products.json");
const productsCategories = require("../../assets/data/categories.json");

export const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltereded] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltereded(data);
    setFocus(false);
    setCategories(productsCategories);
    setProductsCtg(data);
    setActive(-1);
    setInitialState(data);

    return () => {
      setProducts([]);
      setProductsFiltereded([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState();
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
  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category.$oid === ctg),
              setActive(true),
            ),
          ];
    }
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
        <SearchedProduct
          navigation={props.navigation}
          productsFiltered={productsFiltered}
        />
      ) : (
        <ScrollView>
          <View>
            <Banner />
          </View>
          <View>
            <CategoryFilter
              categories={categories}
              categoryFilter={changeCtg}
              productsCtg={productsCtg}
              active={active}
              setActive={setActive}
            />
          </View>
          {productsCtg.length > 0 ? (
            <View style={styles.listContainer}>
              {productsCtg.map((item) => {
                return (
                  <ProductList
                    navigation={props.navigation}
                    key={item._id.$oid}
                    item={item}
                  />
                );
              })}
            </View>
          ) : (
            <View style={[styles.center, { height: height / 2 }]}>
              <Text> No Products Found !</Text>
            </View>
          )}
        </ScrollView>
      )}
    </Container>
  );
};

//export default ProductContainer;

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    // justifyContent: "center",
    alignItems: "center",
  },
});
