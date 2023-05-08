import React from 'react'
import { Text, View, StyleSheet, Button, SafeAreaView, Alert } from 'react-native';
import { Menu, HamburgerIcon, Box, Pressable, NativeBaseProvider} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNavigator from '../components/BottomNavigator'


function OwnerHomeScreen() {
  return <Box style={styles.container}>
    <Text
      style={styles.description}>Telecom Owner
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

const MyButton = () => (
  <SafeAreaView style={styles.container1}>
    <View>
      <Button
        title="REGISTER VENDOR"
        onPress={() => Alert.alert('Button pressed')}
      />
    </View>
    <Separator />
    <View>
      <Button
        title="USER REQUEST"
        color="#f194ff"
        onPress={() => Alert.alert('Button with adjusted color pressed')}
      />
    </View>
    <Separator />
    <View>
      <Button
        title="VENDOR LIST"
        color="darkgreen"
        onPress={() => Alert.alert('Button with adjusted color pressed')}
      />
    </View>
  </SafeAreaView>
);

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
});

export default () => {
  return (
    <NativeBaseProvider>
      <OwnerHomeScreen />
      <MyButton />
      <BottomNavigator />
    </NativeBaseProvider>


  )
};






