import React from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  Button,
} from "react-native";

//redux
import { connect } from "react-redux";

import Toast from "react-native-toast-message";

import EasyButton from "../../Shared/StyledComponents/EasyButton"
import * as actions from "../../redux/Actions/cartActions";

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
  const { name, price, image, countInStock } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image
            ? image
            : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
      </Text>
      <View style={styles.summary}>
      <Text style={styles.price}>&#x20B9; {price}</Text>
      {countInStock > 0 ? (
        <View style={{ marginBottom: 60 }}>
        <EasyButton 
        primary
        xs
        onPress={() => {
            props.addItemToCart(props),
            Toast.show({
                topOffset: 60,
                type: "success",
                text1: `${name} added to Cart`,
                text2: "Go to your cart to complete order"
            })
        }}
        >
            <Text style={{ color: "white"}}>Add</Text>
        </EasyButton>
    </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Currently Unailable</Text>
      )}
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

export default connect(null, mapDispatchToProps)(ProductCard);
const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "#FFF",
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 1.7 - 30,
    backgroundColor: "transparent",
    position: "absolute",
   // top: -45,
  },
  card: {
    marginBottom: 60,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  summary:{
flexDirection:"row",
justifyContent: "space-between",

  },
  price: {
    fontSize: 20,
    color: "orange",
    padding:10,
  },
});
