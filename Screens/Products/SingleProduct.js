import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  Text,
} from "react-native";
import { Right, Container, H1, Left } from "native-base";

import Toast from "react-native-toast-message";

export const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availablity, setAvailablity] = useState("");
  console.warn(item);
  return (
    <Container style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
          />
        </View>
        <View style={styles.contentContainer}>
          <H1 style={styles.contentHeader}>{item.name}</H1>
          <Text style={styles.contentText}>{item.brand}</Text>
          {/* TODO Description */}
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Left>
          <Text style={styles.price}>&#x20B9;{item.price}</Text>
        </Left>
        <Right>
          <Button title="Add to Cart" onPress={() => {props.addItemToCart(item)},
          Toast.show({
            topOffset: 60,
            type:"success",
            text1:`${item.name}added to cart`,
            text2: "go to your cart to complete order"
          })
        
        } />
        </Right>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  wrapper: {
    marginBottom: 80,
    padding: 5,
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },
  price: {
    fontSize: 20,
    color: "red",
    margin: 20,
  },
});
