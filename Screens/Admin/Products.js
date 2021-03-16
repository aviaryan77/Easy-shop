import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator,
  StyleSheet, Button
} from "react-native";
import {Header, Item, Input} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {useFocusEffect} from '@react-navigation/native'
import axios from 'axios'
import baseURL from '../../assets/common/baseUrl'
import AsynStorage from '@react-native-community/async-storage'

var {height}= Dimensions.get("window")

const Products = (props) => {
  return (
    <View>
      <Text>Products Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Products;
