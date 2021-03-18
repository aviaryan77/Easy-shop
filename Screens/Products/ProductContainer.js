import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Dimensions , Button} from "react-native";
import { Loader } from "../../Shared/Loader";
import { Container, Text, Header, Item, Input } from "native-base";
import ProductList from "./ProductList";
import { SearchedProduct } from "./SearchedProduct";
import { Banner } from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";

import Icon from "react-native-vector-icons/FontAwesome";
var { height, width } = Dimensions.get("screen");

// axios.get('https://shopee-server.herokuapp.com/api/v1/products')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

//const data = require("../../assets/data/products.json");
//const productsCategories = require("../../assets/data/categories.json");

export const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltereded] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);
      setFocus(false);
      setActive(-1);

      //products
      axios
        //.get("https://shopee-server.herokuapp.com/api/v1/products")
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsFiltereded(res.data);
          setProductsCtg(res.data);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.warn("API CALL ERROR1");
        });

      //category
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.warn("API CALL ERROR2");
        });

      return () => {
        setProducts([]);
        setProductsFiltereded([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

  const searchProduct = (text) => {
    setProductsFiltereded(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
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
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <>
      {loading == false ? (
        <Container>
          {/* <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder="Search"
                onFocus={openList}
                onChangeText={(text) => {
                  searchProduct(text);
                }}
              />
              {focus == true ? (
                <Icon onPress={onBlur} name="ios-close" />
              ) : null}
            </Item>
          </Header> */}
          <Searchbar
          
            placeholder="Search"
            onFocus={openList}
            
            returnKeyType="next"


            onChangeText={(text) => {
              searchProduct(text);
            }}
            clearIcon="shopping-search"
          />
          {focus ===true ? (<>
            <Button title="clear" onPress={onBlur} />
            <SearchedProduct
              navigation={props.navigation}
              productsFiltered={productsFiltered}
            />
            </>
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
                        key={item._id}
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
      ) : (
        <Container style={[styles.center, { backgroundColor: "f2f2f2" }]}>
          <Loader />
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },

  listContainer: {
    //height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});
