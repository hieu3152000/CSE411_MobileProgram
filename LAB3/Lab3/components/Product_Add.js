import React, {useState} from 'react';
import {View, TextInput, Alert} from 'react-native';
import {Button, Text, Title} from 'react-native-paper';
import Styles from './Styles';
import {Header} from 'react-native/Libraries/NewAppScreen';

const ProductAdd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = () => {
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        discountPercentage: discountPercentage,
        rating: rating,
        stock: stock,
        brand: brand,
        category: category,
        image: image,
      }),
    })
      .then(res => res.json())
      .then(console.log);
    Alert.alert('Add sucessful');
    setTitle('');
    setDescription('');
    setPrice('');
    setDiscountPercentage('');
    setRating('');
    setStock('');
    setBrand('');
    setCategory('');
    setImage('');
  };

  return (
    <View style={Styles.formContainer}>
      <Text style={Styles.header}>Add a Products</Text>
      <Text style={Styles.label}>Title</Text>
      <TextInput
        style={Styles.input}
        placeholder="Enter Title Here"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={Styles.label}>Description</Text>
      <TextInput
        style={Styles.input}
        placeholder="Enter Description Here"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={Styles.label}>Price</Text>
      <TextInput
        style={Styles.input}
        placeholder="Enter Price Here"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Text style={Styles.label}>Discount</Text>
      <TextInput
        style={Styles.input}
        placeholder="Enter Discount Percentage Here "
        value={discountPercentage}
        onChangeText={setDiscountPercentage}
        keyboardType="numeric"
      />
      <Text style={Styles.label}>Rating</Text>
      <TextInput
        style={Styles.input}
        placeholder="Enter Rating Here"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />
      <Text style={Styles.label}>Stock</Text>
      <TextInput
        style={Styles.input}
        placeholder="Enter Stock Here"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />
      <Text style={Styles.label}>Brand</Text>
      <TextInput
        style={Styles.input}
        placeholder="Enter Brand Here"
        value={brand}
        onChangeText={setBrand}
      />
      <Text style={Styles.label}>Category</Text>
      <TextInput
        style={Styles.input}
        placeholder="Enter Category Here"
        value={category}
        onChangeText={setCategory}
      />
      <Text style={Styles.label}>Image</Text>
      <TextInput
        style={Styles.input}
        placeholder="Image URL..."
        value={image}
        onChangeText={setImage}
      />
      <Button mode="contained" buttonColor="blue" onPress={handleSubmit}>
        Add Product
      </Button>
    </View>
  );
};

export default ProductAdd;
