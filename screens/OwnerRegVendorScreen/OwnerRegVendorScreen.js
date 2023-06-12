import React, { useState } from "react";
import { Input, Icon, Stack, Pressable, Button, NativeBaseProvider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";
import { getDatabase, ref, push, set } from 'firebase/database';

const database = getDatabase();

export { database, ref, set };

const HttRegisterVendor = () => {
  const [name, setName] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [contact, setContact] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [address, setAddress] = useState('');
  const [vendorType, setVendorType] = useState('');
  const [registerdate, setRegisterdate] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const [show, setShow] = useState('');

  const handleCreate = () => {
    // Create a new user object
    const user = {
      name,
      vendorId,
      contact,
      contactDetails,
      address,
      vendorType,
      registerdate,
      password,
      cpassword
    };

    const usersRef = ref(database, 'TSA/Vendor');

    // Insert user data into Firebase using push
    push(usersRef, user)
      .then(() => {
        alert('Vendor Registered successfully!');
      })
      .catch((error) => {
        alert('Error register data: ', error);
      });
  };

  return <Stack space={4} w="100%" alignItems="center">
    <div style={styles.heading}> Htt Register Vendor</div>
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}> Register Here!</Text>
    </View>
    <Input w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<MaterialIcons name="person" />}
      size={5} ml="2" color="muted.400" />} placeholder="Name"
      value={name} onChangeText={(text) => setName(text)} />

    <Input w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<MaterialIcons name="email" />}
      size={5} ml="2" color="muted.400" />} placeholder="Vendor Id"
      value={vendorId} onChangeText={(text) => setVendorId(text)} />

    <Input w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<MaterialIcons name="person" />}
      size={5} ml="2" color="muted.400" />} placeholder="Contact"
      value={contact} onChangeText={(text) => setContact(text)} />


    <Input w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<MaterialIcons name="calendar-today" />}
      size={5} ml="2" color="muted.400" />} placeholder="contactDetails"
      value={contactDetails} onChangeText={(text) => setContactDetails(text)} />


    <Input w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<MaterialIcons name="person-pin-circle" />}
      size={5} ml="2" color="muted.400" />} placeholder="address"
      value={address} onChangeText={(text) => setAddress(text)} />



    <Input w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<MaterialIcons name="bookmark-border" />}
      size={5} ml="2" color="muted.400" />} placeholder="Vendor Type"
      value={vendorType} onChangeText={(text) => setVendorType(text)} />


    <Input w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<MaterialIcons name="calendar-today" />}
      size={5} ml="2" color="muted.400" />} placeholder="Date Registerd"
      value={registerdate} onChangeText={(text) => setRegisterdate(text)} />


    <Input w={{
      base: "75%",
      md: "25%"
    }} type={show ? "text" : "password"}
      InputRightElement={<Pressable onPress={() => setShow(!show)}>
        <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
          size={5} mr="2" color="muted.400" />
      </Pressable>} placeholder="Password"
      value={password} onChangeText={(text) => setPassword(text)} />


    <Input w={{
      base: "75%",
      md: "25%"
    }} type={show ? "text" : "password"}
      InputRightElement={<Pressable onPress={() => setShow(!show)}>
        <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
          size={5} mr="2" color="muted.400" />
      </Pressable>} placeholder="Confirm Password"
      value={cpassword} onChangeText={(text) => setCpassword(text)} />


    <Button style={styles.button} onPress={handleCreate}>
      <Text style={styles.buttonText}>SAVE</Text>
    </Button>
  </Stack>;
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    backgroundColor: 'blue',
    padding: 3,
    paddingTop: 3,
    borderRadius: 8
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700'
  },

  titleContainer: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 2,
    paddingHorizontal: 20,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    paddingTop: 1
  },

  heading: {
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
    fontWeight: "bold",
    backgroundColor: "darkblue",
    height: 50,
    width: '100%',
    textAlign: 'center',
    paddingTop: 10,
    shapeMargin: 'corner'
  }

});

export default () => {
  return (
    <NativeBaseProvider>
      <HttRegisterVendor />
    </NativeBaseProvider>
  );
};