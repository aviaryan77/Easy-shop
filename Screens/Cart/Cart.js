import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Container, Text, Left, Right, H1 } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import CartItem from "./CartItem";
import EasyButton from "../../Shared/StyledComponents/EasyButton"

// Redux
import { connect } from "react-redux";
import * as actions from "../../redux/Actions/cartActions";
import { SwipeListView } from "react-native-swipe-list-view";
var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  var total = 0;
  //  {props.price.toFixed(2)}
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });
  return (
    <>
      {props.cartItems.length ? (
        <Container>
          <H1 style={{ alignSelf: "center" }}>Cart</H1>
          <SwipeListView
            data={props.cartItems}
            renderItem={(data) => <CartItem item={data} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => props.removeFromCart(data.item)}
                >
                  <Icon name="trash" color={"white"} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>&#x20B9;{total.toFixed(2)}</Text>
            </Left>
            <Right>
                <EasyButton
                  danger
                  medium
                  onPress={() => props.clearCart()}
                >
                  <Text style={{ color: 'white' }}>Clear</Text>
                </EasyButton>
            </Right>
            <Right>
              {/* {context.stateUser.isAuthenticated ? ( */}
                <EasyButton
                  primary
                  medium
                  onPress={() => props.navigation.navigate('Checkout')}
                >
                <Text style={{ color: 'white' }}>Checkout</Text>
                </EasyButton>
              {/* ) : (
                <EasyButton
                  secondary
                  medium
                  onPress={() => props.navigation.navigate('Login')}
                >
                <Text style={{ color: 'white' }}>Login</Text>
                </EasyButton>
              )} */}
                
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
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
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
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
