import React, {useState} from 'react';
import {ScrollView, View, TextInput} from 'react-native';
import {Button, Text, Title, Card} from 'react-native-paper';
import Styles from './Styles';

const ProductsSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  let filePath = 'https://dummyjson.com/products';

  const handleSearch = () => {
    if (value !== '')
      filePath = 'https://dummyjson.com/products/search?q=' + value;
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response not ok');
        }
        return response.json();
      })
      .then(d => {
        setData(d.products);
        console.log(d.products);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.headerContainer}>
        <Text style={Styles.header}>Search Page</Text>
      </View>
      <View style={Styles.searchContainer}>
        <TextInput
          style={Styles.input}
          placeholder="Enter search query"
          value={value}
          onChangeText={setValue}
        />
        <Button mode="contained" buttonColor="blue" onPress={handleSearch}>
          Search
        </Button>
      </View>
      <Text style={Styles.header}>Products List</Text>
      <ScrollView>
        {data.map(item => (
          <Card key={item.id} style={Styles.card}>
            <Card.Cover source={{uri: item.thumbnail}} />
            <Card.Content>
              <Title style={Styles.title}>Title: {item.title}</Title>
              <Text>Description: {item.description}</Text>
              <Text>Price: {item.price}</Text>
              <Text>Discount: {item.discountPercentage} off</Text>
              <Text>Rating: {item.rating}</Text>
              <Text>Stock: {item.stock}</Text>
              <Text>Brand: {item.brand}</Text>
              <Text>Category: {item.category}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProductsSearch;
