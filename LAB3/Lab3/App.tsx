// App.tsx
import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
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
import ProductDetails from './components/Product_Details';
import { BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333' : '#FFF',
    flex: 1,
  };
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'ProductList', title: 'Products', focusedIcon: 'folder' },
    { key: 'ProductAdd', title: 'Add', focusedIcon: 'folder' },
    { key: 'ProductSearch', title: 'Search', focusedIcon: 'find' },
    { key: 'ProductDetail', title: 'Detail', focusedIcon: 'calendar' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    ProductList: Product,
    ProductAdd: ProductAdd,
    ProductSearch: ProductsSearch,
    ProductDetail: ProductDetails,
  });

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <BottomNavigation 
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        />   
    </SafeAreaProvider>
  );
};

export default App;
