// App.js

import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View , Dimensions, Button } from 'react-native';
import App from './App';

const { width, height } = Dimensions.get('window');
const SplashScreen = () => (
  <View style={styles.container}>
    <Image
      source={require('../assets/HI0tKgZ.jpeg')}
      style={styles.image}
    />
  </View>
);

const index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for demonstration purposes
    setTimeout(() => {
      setLoading(false);
    }, 5000); // 2000 milliseconds (2 seconds)
  }, []);

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        // Your main app content goes here
        <App/>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'contain',
  },
});

export default index;
