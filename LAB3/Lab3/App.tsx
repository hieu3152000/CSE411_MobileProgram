// App.tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// Import the Product component, ensure the path matches the location of the Product.js file
import Product from './components/Product'; // Assuming Product is stored in the components folder
import ProductAdd from './components/Product_Add';
import ProductsSearch from './components/Products_Search';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333' : '#FFF',
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      
          <ProductsSearch/> 
      
      
    </SafeAreaView>
  );
};

export default App;
