import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Modal
} from "react-native";
import EasyButton from '../../Shared/StyledComponents/EasyButton'

import Icon from "react-native-vector-icons/FontAwesome";

var { width } = Dimensions.get("screen");

const ListItem = (props) => {
const [modalVisible, setModalVisible] =useState(false)

  return (
    <View>
      <Modal 
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={()=>{
        setModalVisible(false)
      }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modelView}>
            <TouchableOpacity 
            underlayColor="#E8E8E8"
            onPress={()=>{
              setModalVisible(false)
              
            }}
            style={{alignSelf:"flex-end", position:"absolute", top: 5, right:10}}
            >
                <Icon name="close" size={20} />

            </TouchableOpacity>
            <Button title="Edit" 
            onPress={()=>{
              props.navigation.navigate("ProductForm"),
              setModalVisible(false )
            }}
            />
            <Button title="Delete" color="red"
            // Delete
            />
          </View>
        </View>

      </Modal>
      <TouchableOpacity
      onPress={()=>{
        props.navigation.navigate("ProductDetail", {item:props})
      }}
      onLongPress={()=>{
        setModalVisible(true)
      }}
      style={[styles.container, {
          backgroundColor:props.index%2==0?"white":"gainsboro"
      }]}
      >
        <Image
        style={styles.image}
          source={{
            uri: props.image
              ? props.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
          resizeMode="contain"
        />
        <Text  style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {props.name}
        </Text>
        <Text style={styles.item}>{props.brand}</Text>
        
        <Text  style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {props.category.name}
        </Text>
        <Text>&#x20B9; {props.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: "wrap",
    margin:3,
    width: width / 6,
  },
  centeredView:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modelView:{
    margin:20,
    backgroundColor:"white",
    borderRadius:20,
    padding:35,
    alignItems:"center",
    shadowColor:"#000",
    shadowOffset:{
      width: 0,
      height:2
    },
    shadowOpacity:0.26,
    shadowRadius:3.84,
    elevation:5
  }
});

export default ListItem;
