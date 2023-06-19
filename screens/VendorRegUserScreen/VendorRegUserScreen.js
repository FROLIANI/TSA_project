import React, { useState, useEffect } from "react";
import { Input, Icon, Stack, Pressable, Button, NativeBaseProvider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { getDatabase, ref, push, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const database = getDatabase();

export { database, ref, set };

const VendorRegisterWorker = () => {
  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [vendorType, setVendorType] = useState('');
  const [registerdate, setRegisterdate] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const [show, setShow] = useState('');
  const [errorMessages, setErrorMessages] = useState({});

  //For password
  const [passwordMatch, setPasswordMatch] = useState(true);

  const auth = getAuth();

  const handleCreate = () => {
    const errors = {};

    if (name.trim() === '') {
      errors.name = '*Name is required';
    }
    if (phone.trim() === '') {
      errors.phone = '* Phone Number is required';
    }
    if (dob.trim() === '') {
      errors.dob = '* Date Of Birth is required';
    }
    if (email.trim() === '') {
      errors.email = '*Email is required';
    }
    if (gender.trim() === '') {
      errors.gender = '*Gender is required';
    }
    if (vendorType.trim() === '') {
      errors.vendorType = '*Vendor Type is required';
    }
    if (registerdate.trim() === '') {
      errors.registerdate = '*Register Date is required';
    }
    if (password.trim() === '') {
      errors.password = '*Password is required';
    }
    if (cpassword.trim() === '') {
      errors.cpassword = '*Confirm Password is required';
    }

    setErrorMessages(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    if (password !== cpassword) {
      setErrorMessages({ ...errors, cpassword: "*Password does not match" });
      setPasswordMatch(false);
      return;
    }

    setPasswordMatch(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User registration successful, get the generated UID
        const { user } = userCredential;
        const uid = user.uid;

        // Create a new user object
        const userObj = {
          name,
          phone,
          dob,
          email,
          gender,
          vendorType,
          registerdate,
          role: "Worker",
        };

        // Insert user data into Firebase Realtime Database
        const usersRef = ref(database, 'TSA/Worker');
        push(usersRef, userObj)
          .then(() => {
            alert('Worker registered successfully!');
          })
          .catch((error) => {
            alert('Error worker data in db: ' + error.message);
          });
      })
      .catch((error) => {
        alert('Error registering worker: ' + error.message);
      });
  };

  //Handle to navigate to view user data
  const navigation = useNavigation();
  const handleViewUser = () => {
    navigation.navigate('VendorViewUserDetails')
  }

  return (<View style={styles.container}>
    <Text style={styles.heading}> Vendor Register Telecom Worker</Text>
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}> Register Here!</Text>
    </View>

    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Stack space={4} w="100%" alignItems="center">
        <Input w={{
          base: "75%",
          md: "25%"
        }} InputLeftElement={<Icon as={<MaterialIcons name="person" />}
          size={5} ml="2" color="muted.400" />} placeholder="Name"
          value={name} onChangeText={(text) => setName(text)}
          style={errorMessages.name ? styles.inputError : null}
        />
        {errorMessages.name && <Text style={styles.errorText}>{errorMessages.name}</Text>}


        <Input w={{
          base: "75%",
          md: "25%"
        }} InputLeftElement={<Icon as={<MaterialIcons name="phone-android" />}
          size={5} ml="2" color="muted.400" />} placeholder="Phone Number"
          value={phone} onChangeText={(text) => setPhone(text)}
          style={errorMessages.phone ? styles.inputError : null}
        />
        {errorMessages.phone && <Text style={styles.errorText}>{errorMessages.phone}</Text>}

        <Input w={{
          base: "75%",
          md: "25%"
        }} InputLeftElement={<Icon as={<MaterialIcons name="person" />}
          size={5} ml="2" color="muted.400" />} placeholder=" dob"
          value={dob} onChangeText={(text) => setDob(text)}
          style={errorMessages.dob ? styles.inputError : null}
        />
        {errorMessages.dob && <Text style={styles.errorText}>{errorMessages.dob}</Text>}

        <Input w={{
          base: "75%",
          md: "25%"
        }} InputLeftElement={<Icon as={<MaterialIcons name="email" />}
          size={5} ml="2" color="muted.400" />} placeholder="email"
          value={email} onChangeText={(text) => setemail(text)}
          style={errorMessages.email ? styles.inputError : null}
        />
        {errorMessages.email && <Text style={styles.errorText}>{errorMessages.email}</Text>}

        <Input w={{
          base: "75%",
          md: "25%"
        }} InputLeftElement={<Icon as={<MaterialIcons name="person-pin-circle" />}
          size={5} ml="2" color="muted.400" />} placeholder=" gender"
          value={gender} onChangeText={(text) => setGender(text)}
          style={errorMessages.gender ? styles.inputError : null}
        />
        {errorMessages.gender && <Text style={styles.errorText}>{errorMessages.gender}</Text>}


        <Input w={{
          base: "75%",
          md: "25%"
        }} InputLeftElement={<Icon as={<MaterialIcons name="bookmark-border" />}
          size={5} ml="2" color="muted.400" />} placeholder="Vendor Type"
          value={vendorType} onChangeText={(text) => setVendorType(text)}
          style={errorMessages.vendorType ? styles.inputError : null}
        />
        {errorMessages.vendorType && <Text style={styles.errorText}>{errorMessages.vendorType}</Text>}


        <Input w={{
          base: "75%",
          md: "25%"
        }} InputLeftElement={<Icon as={<MaterialIcons name="calendar-today" />}
          size={5} ml="2" color="muted.400" />} placeholder="Date Registerd"
          value={registerdate} onChangeText={(text) => setRegisterdate(text)}
          style={errorMessages.registerdate ? styles.inputError : null}
        />
        {errorMessages.registerdate && <Text style={styles.errorText}>{errorMessages.registerdate}</Text>}


        <Input w={{
          base: "75%",
          md: "25%"
        }} type={show ? "text" : "password"}
          InputLeftElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
              size={5} mr="2" color="muted.400"
            />
          </Pressable>} placeholder="Password"
          value={password} onChangeText={(text) => setPassword(text)}
          style={errorMessages.password ? styles.inputError : null}
        />
        {errorMessages.password && <Text style={styles.errorText}>{errorMessages.password}</Text>}


        <Input w={{
          base: "75%",
          md: "25%"
        }} type={show ? "text" : "password"}
          InputLeftElement={<Pressable onPress={() => setShow(!show)}>

            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
              size={5} mr="2" color="muted.400"
            />
          </Pressable>} placeholder="Confirm Password"
          value={cpassword} onChangeText={(text) => setCpassword(text)}
          style={[errorMessages.cpassword ? styles.inputError : null,
          !passwordMatch ? styles.inputError : null
          ]}

        />
        {errorMessages.cpassword && <Text style={styles.errorText}>{errorMessages.cpassword}</Text>}
        {!passwordMatch && (
          <Text style={styles.errorText}></Text>
        )}

        <Button style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>SAVE</Text>
        </Button>

        <Button style={styles.buttonSave} onPress={handleViewUser}>
          <Text style={styles.buttonText}>VIEW HERE</Text>
        </Button>

      </Stack>
    </ScrollView>
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    backgroundColor: 'blue',
    padding: 3,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8
  },

  buttonSave: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    backgroundColor: 'green',
    padding: 3,
    paddingTop: 10,
    paddingBottom: 10,
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
    shapeMargin: 'corner',
    fontSize: 24

  },


  inputError: {
    borderWidth: 1,
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    fontSize: 8,
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -16
  },

});

export default () => {
  return (
    <NativeBaseProvider>
      <VendorRegisterWorker />
    </NativeBaseProvider>
  );
};