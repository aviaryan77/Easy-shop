import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";
import { Header, Item, Input } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import ListItem from "./ListItem";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-community/async-storage";

var { width, height } = Dimensions.get("screen");
const ListHeader  = ()=>{
    return(
        <View 
        elevation={1}
        style={styles.listHeader}>
            <View style={styles.headerItem}></View>
            <View style={styles.headerItem}>
                <Text  style={styles.text}>Name</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={styles.text}>Brand</Text>
            </View >
            
            <View style={styles.headerItem}>
                <Text  style={styles.text}>Category</Text>
            </View>
            <View style={styles.headerItem}>
                <Text  style={styles.text}>Price</Text>
            </View>
        </View>
    )
}

const Products = (props) => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      //get token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseURL}products`).then((res) => {
        setProductList(res.data);
        setProductFilter(res.data);
        setLoading(false);
      });
      return () => {
        setProductList();
        setProductFilter();
        setLoading(true);
      };
    }, [])
  );

  
const searchProduct=(text)=>{
    if(text==""){
        setProductFilter(productList)
    }
    setProductFilter(
        productList.filter((i)=>
        i.name.toLowerCase().includes(text.toLowerCase()))
    )
}


  return (
    <View>
      <View>
        <Header searchBar rounded>
          <Item style={{ padding: 5 }}>
            <Icon name="search" />
            <Input
              placeholder="Search"
              onChangeText={(text)=>searchProduct(text)}
            />
          </Item>
        </Header>
      </View>
      {loading ? (
        <View style={styles.ActivityIndicator}>
          <ActivityIndicator  size="large" color="orange" />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <ListItem {...item} navigation={props.navigation} index={index} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader:{
      flexDirection:"row",
      padding:5,
      backgroundColor:"gainsboro",

  },
  headerItem:{
      margin:3,
      width: width/6,
  },
  text:{
      fontWeight:"bold"
  },
  ActivityIndicator:{
      alignItems:"center",
      justifyContent:"center",
      height:height/2
  }
});

export default Products;
