import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Text,
  Left,
  Right,
  H1,
  ListItem,
  Thumbnail,
  Body,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

// Redux
import { connect } from "react-redux";
import * as actions from "../../redux/Actions/cartActions";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  var total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });
  return (
    <>
      {props.cartItems.length ? (
        <Container>
          <H1 style={{ alignSelf: "center" }}>Cart</H1>
          {props.cartItems.map((data) => {
            return (
              <ListItem style={styles.listItem} key={Math.random()} avatar>
                <Left>
                  <Thumbnail
                    source={{
                      uri: data.product.image
                        ? data.product.image
                        : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                    }}
                  />
                </Left>
                <Body style={styles.body}>
                  <Left>
                    <Text>{data.product.name}</Text>
                  </Left>
                  <Right>
                    <Text>&#x20B9;{data.product.price}</Text>
                  </Right>
                </Body>
              </ListItem>
            );
          })}
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>&#x20B9;{total}</Text>
            </Left>
            <Right>
              <Button title="Clear" onPress={() => props.clearCart()} />
            </Right>
            <Right>
              <Button
                title="Checkout"
                onPress={() => props.navigation.navigate("Checkout")}
              />
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add Products to your cart</Text>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: "red",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
