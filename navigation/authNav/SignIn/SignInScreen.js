import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
  Icon,
  Modal,
} from "native-base";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { UserContext } from "../../../Providers/UserContext";
import { useNavigation } from "@react-navigation/native";

const firebaseConfig = {
  apiKey: "AIzaSyBadbWypGwvbspbZnETnhRuyGa4Otc4M_M",
  authDomain: "tsa123-76b2e.firebaseapp.com",
  projectId: "tsa123-76b2e",
  storageBucket: "tsa123-76b2e.appspot.com",
  messagingSenderId: "857914660045",
  appId: "1:857914660045:web:e3b944b7898868bf7d8584",
  measurementId: "G-M345CGEJ8K",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const emailString = email.trim();
  const passwordString = password.trim();
  const userRoleContext = useContext(UserContext);
  const [userRole, setUserRole] = useState("");
  const userRoleRef = ref(db, "TSA/Vendor");

  useEffect(() => {
    const unsubscribe = onValue(userRoleRef, (snapshot) => {
      const userData = snapshot.val();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        console.log(userId, "User ID");
        const role = userData[userId]?.role;
        const id = Object.keys(userData)[0];
        const user = userData[id];
        const userRole = user.role;
        console.log(userRole);
        setUserRole(userRole);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
    // Validate email if it's empty
    if (emailString === "") {
      setEmailError("Email cannot be empty");
      return;
    }

    // Validate email format
    if (!validateEmail(emailString)) {
      setEmailError("Invalid email format");
      return;
    }

    // Validate password if it's empty
    if (passwordString === "") {
      setPasswordError("Password cannot be empty");
      return;
    }

    if (passwordString.length < 5) {
      setPasswordError("Password must be at least 5 characters long");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User Credentials ", user);

        // Fetch the vendors collection from the database
        const databaseRef = ref(getDatabase(app), "TSA/Vendor");
        onValue(
          databaseRef,
          (snapshot) => {

            // Iterate over each vendor document in the snapshot
            snapshot.forEach((vendorSnapshot) => {
              const vendor = vendorSnapshot.val();
              const role = vendor.role;
              console.log("Snapshot Value", role);

              if (user.uid === vendorSnapshot.key) {
                if (role === "Admin") {
                  navigation.navigate("BottomOwner");
                } else if (role === "Vendor") {
                  navigation.navigate("BottomVendor");
                } else if (role === "Worker") {
                  navigation.navigate("BottomUser");
                }
              }
            });
          },
          (error) => {
            console.log("error", error);
          }
        );
      })
      .catch((error) => {
        console.log("error during login ", error);
      });
  };

  return (
    <Center w="100%">
      <Box safeArea p='2' w='90%' maxW='290' py='8'>
        <Box
          bg={{
            source: require("../../../assets/mnara.jpg"),
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            borderRadius: 10,
          }}
        >
          <Image
            source={require("../../../assets/mnara.jpg")}
            style={{
              width: 60,
              height: 60,
              marginRight: 5,
              marginBottom: 20,
            }}
          />
          <Text
            style={{
              color: "blue",
              fontSize: 20,
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 35,
            }}
          >
            <Text style={{ color: "purple", fontSize: 25 }}>Telecom</Text> Site{" "}
            <Text style={{ color: "#a78bfa" }}>Access</Text>
          </Text>
        </Box>

        <Image
          source={require("../../../assets/Tsa.jpeg")}
          style={{
            width: 210,
            height: 150,
            marginBottom: 20,
            alignSelf: "center",
            borderRadius: 10,
          }}
        />

        <Heading
          size='lg'
          color='coolBlack.800'
          _dark={{
            color: "warmBlack.50",
          }}
          fontWeight='semibold'
        >
          SIGN IN
        </Heading>
        <Heading
          paddingTop={3}
          mt='1'
          color='coolBlack.600'
          _dark={{
            color: "warBlack.200",
          }}
          fontWeight='medium'
          size='xs'
        >
          TSA User Credentials Only!
        </Heading>
        <VStack space={3} mt='5'>
          <FormControl isInvalid={emailError !== ""}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              onChangeText={(text) => setEmail(text)}
              value={email}
              InputLeftElement={<LeftIcon name='mail' />}
            />
            <FormControl.ErrorMessage>{emailError}</FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={passwordError !== ""}>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
              type='password'
              InputLeftElement={<LeftIcon name='lock-closed' />}
            />
            <FormControl.ErrorMessage>{passwordError}</FormControl.ErrorMessage>
          </FormControl>

          <Button onPress={handleSignIn} bg='blue.600' mt='2'>
            LOGIN
          </Button>
        </VStack>
        <Button
          onPress={() => navigation.navigate("ForgotTab")}
          bg='amber.400'
          mt='2'
        >
          RESET PASSWORD
        </Button>
      </Box>

      {/* Pop-up Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body
            bg={modalMessage === "Login successful!" ? "green.500" : "red.500"}
            color='white'
          >
            <Text>{modalMessage}</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default function SignInScreen() {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <SignIn />
      </Center>
    </NativeBaseProvider>
  );
}
