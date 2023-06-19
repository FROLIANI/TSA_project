import React from 'react'
import { Text, View, StyleSheet, Button, SafeAreaView, Image } from 'react-native';
import { Menu, HamburgerIcon, Box, Pressable, NativeBaseProvider } from "native-base";
import { useNavigation } from '@react-navigation/native';

function OwnerHomeScreen() {
  return <Box style={styles.container}>
    <Text
      style={styles.description}>Welcome User Home!
    </Text>
    <Menu style={styles.Mymenu} trigger={triggerProps => {
      return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
        <HamburgerIcon />
      </Pressable>;
    }}>
      <Menu.Item>Logout</Menu.Item>
      <Menu.Item>Profile</Menu.Item>
    </Menu>
  </Box>;
}

const Separator = () => (
  <View style={styles.separator} />
);


const MyButton = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>TSA</Text>
      </View>
      <Image
        source={require('../../assets/Tsa.jpeg')}
        style={styles.logo}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="SEND REQUEST"
          onPress={() => { navigation.navigate('UserSendRequestScreen') }}

        />
      </View>
      <Separator />
      <View>
        <Button
          title="FEEDBACK NOTIFICATION"
          color="#f194ff"
          onPress={() => { navigation.navigate('UserReceiveFeedbackScreen') }}
        />
      </View>
      <Separator />
      <View>
        <Button
          title="REQUEST HISTORY"
          color="darkgreen"
          onPress={() => { navigation.navigate('UserSendRequestScreen') }}
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
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderColor: 'none'
  },

  titleContainer: {
    alignItems: 'center',
    marginTop: 10,
  },

  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  logo: {
    width: 200,
    height: 150,
    marginTop: 1,
    alignSelf: 'center',
    borderRadius: 10,
  },

  buttonContainer: {
    marginTop: 20,
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






