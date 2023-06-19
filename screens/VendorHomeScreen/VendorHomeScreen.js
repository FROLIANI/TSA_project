import React from 'react'
import { Text, View, StyleSheet, Button, SafeAreaView, Alert } from 'react-native';
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
  return (<SafeAreaView style={styles.container1}>
    <View>
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
      <VendorHomeScreen />
      <MyButton />
    </NativeBaseProvider>
  )
};






