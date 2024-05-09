import React, {useEffect, useState} from 'react';
import {FlatList, Image, ScrollView, View} from 'react-native';
import {Button, Text, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Styles from './Styles';

const Products = () => {
  const [data, setData] = useState([]);
  const filePath = 'https://dummyjson.com/products';

  useEffect(() => {
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setData(d.products);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const Item = ({data}) => (
    <View style={Styles.rowContainer}>
      <View style={Styles.imageContainer}>
        <Image style={Styles.image} source={{uri: data.thumbnail}} />
      </View>
      <View style={Styles.contentContainer}>
        <Text style={Styles.title}>Title: {data.title}</Text>
        <Text style={Styles.text}>Description: {data.description}</Text>
        <Text style={Styles.text}>Price: {data.price}</Text>
        <Text style={Styles.discount}>
          Discount: {data.discountPercentage} off
        </Text>
        <Text style={Styles.text}>Rating: {data.rating}</Text>
        <Text style={Styles.text}>Stock: {data.stock}</Text>
        <Text style={Styles.text}>Brand: {data.brand}</Text>
        <Text style={Styles.text}>Category: {data.category}</Text>
        <View style={Styles.buttonRow}>
          <Button buttonColor="blue" textColor="#fff">
            Detail
          </Button>
          <Button buttonColor="blue" textColor="#fff">
            Add
          </Button>
          <Button buttonColor="blue" textColor="#fff">
            Delete
          </Button>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={Styles.container}>
      <Title style={Styles.header}>Products List</Title>
      <FlatList
        data={data}
        renderItem={({item}) => <Item data={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default Products;
