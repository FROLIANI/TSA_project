import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, Image } from 'react-native';
import { Menu, HamburgerIcon, Box, Pressable, NativeBaseProvider } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';

function OwnerHomeScreen() {

  const auth = getAuth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('SignInScreen')
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };

  return <Box style={styles.container}>

    <Text
      style={styles.description}>Telecom Owner
    </Text>
    <Menu style={styles.Mymenu} trigger={triggerProps => {
      return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
        <HamburgerIcon />
      </Pressable>;
    }}>
      <Menu.Item>Home</Menu.Item>
      <Menu.Item><View style={styles.logoutContainer}>
        <Pressable onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View></Menu.Item>
    </Menu>
  </Box>;


}

const Separator = () => (
  <View style={styles.separator} />
);


const MyButton = () => {
  const navigation = useNavigation();

  const images = [
    require('../../assets/slide1.jpeg'),
    require('../../assets/slide5.jpeg'),
    require('../../assets/slide4.jpeg'),
    require('../../assets/slide3.jpeg'),

  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> Welcome TSA!<br/><i>The Service You Deserve</i></Text>
      </View>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/Tsa.jpeg')} style={styles.bigLogo} />

      </View>
      <Image source={images[currentImageIndex]} style={styles.logo} />

      <View style={styles.buttonContainer}>
        <Button
          title="REGISTER VENDOR"
          onPress={() => { navigation.navigate('OwnerRegVendorScreen') }}

        />
      </View>
      <Separator />
      <View>
        <Button
          title="USER REQUEST"
          color="#f194ff"
          onPress={() => { navigation.navigate('OwnerCheckVerification') }}
        />
      </View>
      <Separator />
      <View>
        <Button
          title="VENDOR LIST"
          color="darkgreen"
          onPress={() => { navigation.navigate('VendorListScreen') }}
        />
      </View>
    </SafeAreaView>
  )

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0891b2',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'blue',
    alignSelf: 'center',
    width: 375,
    maxWidth: '100%'
  },


  description: {
    color: 'white',
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  Mymenu: {
    fontSize: '30',
    alignItems: 'flex-end'
  },

  borderlessButtonContainer: {
    padding: '20',
  },

  logo: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: 10,
  },

  container1: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 3,
    borderBottomColor: '#737373',
    borderColor: 'none'
  },

  titleContainer: {
    alignItems: 'center',
    marginTop: 1,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  logo: {
    width: 358,
    height: 200,
    marginTop: 1,
    alignSelf: 'center',
    borderRadius: 10,
  },

  buttonContainer: {
    marginTop: 3,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 1,
  },

  bigLogo: {
    width: 200,
    height: 150,
    marginBottom: 1,
    borderRadius: 10,
  },
  logoutContainer: {
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  
  logoutText: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default () => {
  return (
    <NativeBaseProvider>
      <OwnerHomeScreen />
      <MyButton />
    </NativeBaseProvider>


  )
};






