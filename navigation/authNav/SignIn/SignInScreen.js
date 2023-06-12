import React, { useState, useContext, useEffect, } from "react";
import {
  Box, Heading, VStack, FormControl, Input, Button,
  Center, NativeBaseProvider, Icon, Modal
} from "native-base";
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Ionicons } from '@expo/vector-icons';
import { Image, Text } from "react-native";

import { getUserRole } from '../../../Providers/FirebaseService';
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
// Create a reference to the database
const auth = getAuth(app);


const SignIn = () => {
  //const userId = route.params.userId;
  const userRole = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchUserRole = async (userId) => {
      try {
        const userType = await getUserRole(userId);
        setIsLoading(false);

        if (userType === 'admin') {
          navigation.navigate('BottomOwner');
        } else if (userType === 'vendor') {
          navigation.navigate('BottomOwner');
        } else if (userType === 'HttOwner') {
          navigation.navigate('BottomOwner');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserRole();
  }, []);

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



  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful
        const user = userCredential.user;
        setShowModal(true);
        setModalMessage("Login successful!");
        navigation.navigate('BottomOwner');
    
    
      })
      .catch((error) => {
        // Login failed
        const errorCode = error.code;
        const errorMessage = error.message;
        setShowModal(true);
        setModalMessage("Wrong email or password. Please try again.");

      });
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
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            onChangeText={(text) => setEmail(text)}
            value={email}
            InputLeftElement={
              <LeftIcon name="mail" />
            }

          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
            type="password"
            InputLeftElement={
              <LeftIcon name="lock-closed" />
            }
          />

        </FormControl>
        <Button onPress={handleSignIn} bg="blue.600" mt="2">
          LOGIN
        </Button>
      </VStack>
      <Button onPress={() => { navigation.navigate('ForgotTab') }} bg="blue.600" mt="2">
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
