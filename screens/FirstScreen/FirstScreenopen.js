import React, { useEffect, useRef } from 'react';
import { Image, View, StyleSheet,Text,Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function App() {
const rotation = useRef(new Animated.Value(0)).current;
const navigation = useNavigation();

useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 9000, // Adjust the duration of the rotation animation
        useNativeDriver: true,
      })
    );

    rotateAnimation.start();

    return () => rotateAnimation.stop();
  }, []);

  React.useEffect(() => {
    const loadingTime = 9000; // 9 seconds
    const timeout = setTimeout(() => {
      navigation.navigate("SignInScreen")
    }, loadingTime);
    return () => clearTimeout(timeout);
  }, []);

  const interpolatedRotateAnimation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { transform: [{ rotate: interpolatedRotateAnimation }] }]}>
      <Image source={require('../../assets/Tsa.jpeg')} style={styles.logo} />
      <Text style={styles.text}>Welcome!</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5f9ea0',
  },

  logoContainer: {
    width: 200,
    height: 200,
    borderRadius: 100, // Make the container circular by setting half of width/height as the borderRadius
    backgroundColor: 'blue', // Add a background color to the container
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 200,
    height: 100,
    borderRadius:100,
    overflow:'hidden',
    alignSelf: 'center', 
    resizeMode: 'contain', 
  },

  text: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
