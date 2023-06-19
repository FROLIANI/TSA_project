import React, { useState, useContext, useEffect, } from "react";
import {
  Box, Heading, VStack, FormControl, Input, Button,
  Center, NativeBaseProvider, Icon, Modal
} from "native-base";
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Ionicons } from '@expo/vector-icons';
import { Image, Text } from "react-native";
import { getDatabase, ref, set, get } from "firebase/database";

import { UserContext } from '../../../Providers/UserContext';

//Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBadbWypGwvbspbZnETnhRuyGa4Otc4M_M",
  authDomain: "tsa123-76b2e.firebaseapp.com",
  projectId: "tsa123-76b2e",
  storageBucket: "tsa123-76b2e.appspot.com",
  messagingSenderId: "857914660045",
  appId: "1:857914660045:web:e3b944b7898868bf7d8584",
  measurementId: "G-M345CGEJ8K"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const SignIn = () => {
  //const userId = route.params.userId;
  const userRole = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const emailString = email.toString().trim();
  const passwordString = password.toString().trim();

  const userRoleContext = useContext(UserContext);

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  useEffect(() => {
    let timer;
    if (showModal) {
      timer = setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showModal]);

  const LeftIcon = ({ name }) => (
    <Icon
      as={<Ionicons name={name} />}
      size={5}
      ml={2}
      color="blue.500" // Set the color to blue
    />
  );


  const navigation = useNavigation();

  const handleSignIn = async () => {

    // Validate email if is empty
    if (emailString === '') {
      setEmailError("Email cannot be empty");
      return;
    }

    // Validate email format
    if (!validateEmail(emailString)) {
      setEmailError("Invalid email format");
      return;
    }

    // Validate password if empty
    if (passwordString === '') {
      setPasswordError("Password cannot be empty");
      return;
    }

    if (passwordString.length < 5) {
      setPasswordError("Password must be at least 5 characters long");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, emailString, passwordString);
      const user = userCredential.user;
      // You can fetch additional user data from the Realtime Database based on the user's ID
      const snapshot = await get(ref(database, `users/${user.uid}`));
      const userData = snapshot.val();
      if (userData) {
        const userRole = userData.role;
        // fetchDataBasedOnRole(userRole);

        // Update the userRole in the UserContext
        userRoleContext.setUserRole(userRole);

        //  Check user role and navigate to the respective page
        if (userRole === 'Admin') {
          setIsLoading(false);
          setShowModal(true);
          setModalMessage("Login successful!");
          navigation.navigate('BottomOwner');

        } else if (userRole === 'Vendor') {
          setIsLoading(false);
          setShowModal(true);
          setModalMessage("Login successful!");
          navigation.navigate('BottomVendor');

        } else if (userRole === 'Worker') {
          navigation.navigate('BottomUser');
          setIsLoading(false);
          setShowModal(true);
          setModalMessage("Login successful!");
        }
        else {
          setShowModal(true);
          setModalMessage("User data not found. Please try again.");
        }
      }
    } catch (error) {
      setShowModal(true);
      setModalMessage("Wrong email or password. Please try again.");
      console.log(error);
    }
  };

  return <Center w="100%">
    <Box safeArea p="2" w="90%" maxW="290" py="8">
      <Image source={require("../../../assets/Tsa.jpeg")}
        style={
          {
            width: 210,
            height: 150,
            marginBottom: 20,
            alignSelf: 'center',
            borderRadius: 10,
          }
        } />

      <Heading size="lg" color="coolBlack.800" _dark={{
        color: "warmBlack.50"
      }} fontWeight="semibold">
        SIGN IN
      </Heading>
      <Heading paddingTop={3} mt="1" color="coolBlack.600" _dark={{
        color: "warBlack.200"
      }} fontWeight="medium" size="xs">
        TSA User Credentials Only!
      </Heading>
      <VStack space={3} mt="5">

        <FormControl isInvalid={emailError !== ""}>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            onChangeText={(text) => setEmail(text)}
            value={email}
            InputLeftElement={
              <LeftIcon name="mail" />
            }
          />
          <FormControl.ErrorMessage>{emailError}</FormControl.ErrorMessage>
        </FormControl >

        <FormControl isInvalid={passwordError !== ""}>
          <FormControl.Label>Password</FormControl.Label>
          <Input secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
            type="password"
            InputLeftElement={
              <LeftIcon name="lock-closed" />
            }
          />
          <FormControl.ErrorMessage>{passwordError}</FormControl.ErrorMessage>
        </FormControl>

        <Button
          onPress={handleSignIn}
          bg="blue.600"
          mt="2"
          startIcon={<LeftIcon name="log-in" color="blue" />}
          colorScheme="blue"
        >
          LOGIN
        </Button>

      </VStack>
      <Button
        onPress={() => navigation.navigate("ForgotTab")}
        bg="blue.600"
        mt="2"
        startIcon={<LeftIcon name="lock-closed" color="white" />}
        colorScheme="blue"
      >
        RESET PASSWORD
      </Button>

    </Box>

    {/* Pop-up Modal */}
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Body bg={modalMessage === "Login successful!" ? "green.500" : "red.500"} color="white">
          <Text >{modalMessage}</Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  </Center>;
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <SignIn />
      </Center>
    </NativeBaseProvider>
  );
};
