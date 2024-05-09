import React from 'react';
import {View, Text} from 'react-native';
import {Button, Card, Title} from 'react-native-paper';
import {useState, useContext, useEffect, useCallback, useMemo} from 'react';
import Styles from './Styles';
const ProductDetails = () => {
  const [data, setData] = useState([]);
  const filePath = 'https://dummyjson.com/products/1';
  useEffect(() => {
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setData(d);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);
  return (
    <View>
      <Text style={Styles.header}>Product Details</Text>
      <Card style={{marginVertical: 10}}>
        <Card.Cover source={{uri: data.thumbnail}} />
        <Card.Content>
          <Title>{data.title}</Title>
          <Text>Description: {data.description}</Text>
          <Text>Price: {data.price}</Text>
          <Text>Discount: {data.discountPercentage} off</Text>
          <Text>Rating: {data.rating}</Text>
          <Text>Stock: {data.stock}</Text>
          <Text>Brand: {data.brand}</Text>
          <Text>Category: {data.category}</Text>
          <View style={Styles.detailButtonContainer}>
            <Button mode="contained">Delete</Button>
            <Button mode="contained">Cancel</Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ProductDetails;
