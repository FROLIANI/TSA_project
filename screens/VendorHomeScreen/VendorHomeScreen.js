import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, Image } from 'react-native';
import { Menu, HamburgerIcon, Box, Pressable, NativeBaseProvider } from "native-base";
import { useNavigation } from '@react-navigation/native';

function VendorHomeScreen() {
  return <Box style={styles.container}>
    <Text
      style={styles.description}>Vendor Home Dashboard
    </Text>
    <Menu style={styles.Mymenu} trigger={triggerProps => {
      return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
        <HamburgerIcon />
      </Pressable>;
    }}>
      <Menu.Item>Home</Menu.Item>
      <Menu.Item>About</Menu.Item>
      <Menu.Item>LogOut</Menu.Item>
    </Menu>
  </Box>;
}

const Separator = () => (
  <View style={styles.separator} />
);

const MyButton = () => {
  const navigation = useNavigation();
  const images = [
    require('../../assets/home.jpeg'),
    require('../../assets/v1.jpeg'),
    require('../../assets/vendor1.jpeg'),
    require('../../assets/vendor22.jpeg'),
   
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



  return (<SafeAreaView style={styles.container1}>
<View style={styles.titleContainer}>
    <Text style={styles.title2}> Welcome TSA</Text>
    </View>
    <View>
      <View>
      <Image source={images[currentImageIndex]} style={styles.logo} />
      <View style={styles.TitleActionContainer}>
        <Text style={styles.TitleAction} >Here your Actions!</Text>
      </View>
      </View>

      <Button
        title="NEW USER?  ADD"
        color="green"
        onPress={() => { navigation.navigate('VendorRegUserScreen') }}
      />
    </View>
    <Separator />

    <View>
      <Button
        title="MANAGE VIEW USER DETAILS"
        color="grey"
        onPress={() => { navigation.navigate('VendorPreviewUserScreen') }}
      />
    </View>
    <Separator />

    <View>
      <Button
        title="REQUEST FOWARDED REVIEW"
        color="darkblue"
        onPress={() => { navigation.navigate('VendorReceiveRequestScreen') }}
      />
    </View>
    <Separator />

    <View>
      <Button
        title="TASK ASSIGN HERE"
        color="purple"
        onPress={() => { navigation.navigate('VendorAssignTaskScreen') }}
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
    alignSelf: 'baseline',
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
    alignItems: 'flex-start'
  },

  borderlessButtonContainer: {
    padding: '20',
  },

  container1: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 1,
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
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderColor: 'none'
  },

  logo: {
    width: 358,
    height: 200,
    marginTop: 2,
    marginBottom:70,
    alignSelf:'center',
    borderRadius: 10,
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  title2: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom:4
  },

  TitleActionContainer:{
    marginBottom: 3
  },

  TitleAction:{
    fontSize:15,
    textAlign:'center',
    fontWeight:'bold',

  }

});

export default () => {
  return (
    <NativeBaseProvider>
      <VendorHomeScreen />
      <MyButton />
    </NativeBaseProvider>
  )
};






