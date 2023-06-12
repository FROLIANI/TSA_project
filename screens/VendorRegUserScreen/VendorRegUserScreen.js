


import React, { useState } from "react";
import { Input, Icon, Stack, Pressable, Button, NativeBaseProvider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
import { getDatabase, ref, push, set } from 'firebase/database';

const database = getDatabase();

export { database, ref, set };

const RegisterUser = () => {

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [dob, setDob] = useState('');
const [gender, setGender] = useState('');
const [vendorType, setVendorType] = useState('');
const [registerdate, setRegisterdate] = useState('');
const [password, setPassword] = useState('');
const [cpassword, setCpassword] = useState('');

const [show, setShow] = useState('');

const handleCreate = () => {
  // Create a new user object
  const user = {
    name,
    email,
    phone, 
    dob,
    gender,
    vendorType,
    registerdate,
    password,
    cpassword
  };

 
    const usersRef = ref(database, 'TSA/worker');

    // Insert user data into Firebase using push
    push(usersRef, user)
      .then(() => {
        alert('Data inserted successfully!');
      })
      .catch((error) => {
        alert('Error inserting data: ', error);
      });
};


  return <Stack space={4} w="100%" alignItems="center">
    <h1 style={styles.titleText}>Register User</h1>
    <Input w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<MaterialIcons name="person" />}
      size={5} ml="2" color="muted.400" />} placeholder="Name"
      value={name} onChangeText={(text) => setName(text)}  />

    <Input  w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<MaterialIcons name="email" />}
      size={5} ml="2" color="muted.400" />} placeholder="Email address"
        value={email} onChangeText={(text) => setEmail(text)}  />

    <Input  w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<MaterialIcons name="phone" />}
      size={5} ml="2" color="muted.400" />} placeholder="Phone number" 
      value={phone} onChangeText={(text) => setPhone(text)}  />


    <Input  w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<MaterialIcons name="calendar-today" />}
      size={5} ml="2" color="muted.400" />} placeholder="Date of birth" 
      value={dob} onChangeText={(text) => setDob(text)}  />


    <Input w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<MaterialIcons name="person-pin-circle" />}
      size={5} ml="2" color="muted.400" />} placeholder="Gender" 
      value={gender} onChangeText={(text) => setGender(text)}  />

      

    <Input  w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<MaterialIcons name="bookmark-border" />}
      size={5} ml="2" color="muted.400" />} placeholder="Vendor Type"
      value={vendorType} onChangeText={(text) => setVendorType(text)}  />


    <Input  w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<MaterialIcons name="calendar-today" />}
      size={5} ml="2" color="muted.400" />} placeholder="Date Registerd" 
      value={registerdate} onChangeText={(text) => setRegisterdate(text)}  />


    <Input  w={{
      base: "75%",
      md: "25%"
    }} type={show ? "text" : "password"}
      InputRightElement={<Pressable onPress={() => setShow(!show)}>
        <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
          size={5} mr="2" color="muted.400" />
      </Pressable>} placeholder="Password" 
            value={password} onChangeText={(text) => setPassword(text)}  />


    <Input  w={{
      base: "75%",
      md: "25%"
    }} type={show ? "text" : "password"}
      InputRightElement={<Pressable onPress={() => setShow(!show)}>
        <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
          size={5} mr="2" color="muted.400" />
      </Pressable>} placeholder="Confirm Password" 
                 value={cpassword} onChangeText={(text) => setCpassword(text)}  />


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

  titleText: {
    fontWeight: 'bold',
    fontSize: 20,

  },

});

export default () => {
  return (
    <NativeBaseProvider>
      <RegisterUser />
    </NativeBaseProvider>
  );
};