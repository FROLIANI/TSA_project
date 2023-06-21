import React, { useState, useRef } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Stack,
  Icon,
  NativeBaseProvider,
  TextArea,
  Text,
  ScrollView,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { getDatabase, ref, set, push } from "firebase/database";
import moment from 'moment';


const SendRequest = () => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vendor, setVendor] = useState("");
  const [reason, setReason] = useState("");

  const [dateError, setDateError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [vendorError, setVendorError] = useState("");
  const [reasonError, setReasonError] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const dateInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const vendorInputRef = useRef(null);
  const textareaRef = useRef(null);

  const database = getDatabase();

  const handleSendRequest = () => {
    let isValid = true;

    if (!date || !moment(date,
      ['DD/MM/YYYY',
        'MM/DD/YYYY',
        'YYYY/MM/DD',
        'DD-MM-YYYY',
        'MM-DD-YYYY',
        'YYYY-MM-DD',
        'DD.MM.YYYY',
        'MM.DD.YYYY',
        'YYYY.MM.DD',
        'YYYY.M.D',
        'D/M/YYYY',
        'D.M.YYYY'],
      true).isValid()) {
      isValid = false;
      setDateError("Please enter a valid date.");
    } else {
      setDateError("");
    }

    if (!name) {
      isValid = false;
      setNameError("Please enter a name.");
    } else {
      setNameError("");
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
      isValid = false;
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }

    if (!vendor) {
      isValid = false;
      setVendorError("Please enter a vendor.");
    } else {
      setVendorError("");
    }

    if (!reason) {
      isValid = false;
      setReasonError("Please enter a reason.");
    } else {
      setReasonError("");
    }

    if (!isValid) {
      setPopupMessage("Please fill in all required fields.");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        setPopupMessage("");
      }, 3000);

      return;
    }

    // Create a new user object
    const workerDetails = {
      date,
      name,
      email,
      vendor,
      reason,
    };

    const usersRef = ref(database, "TSA/Worker_Request");

    // Insert user data into Firebase using push
    push(usersRef, workerDetails)
      .then(() => {
        alert("Request Sent successfully!");
        resetData();
      })
      .catch((error) => {
        alert("Request error", error);
      });
  };

  const resetData = () => {
    setDate("");
    setName("");
    setEmail("");
    setVendor("");
    setReason("");

    setDateError("");
    setNameError("");
    setEmailError("");
    setVendorError("");
    setReasonError("");

    setShowPopup(false);
    setPopupMessage("");
  };

  return (
    <ScrollView>
      <View>
        <Box safeArea p="2" w="90%" maxW="290" py="8" marginLeft={10} >
          <Heading
            textAlign={"center"}
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Send the Request
          </Heading>
          <Heading
            textAlign={"center"}
            mt="1"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="medium"
            size="xs"
          >
            Fill the request
          </Heading>
          <VStack space={3} mt="5">
            <FormControl isRequired isInvalid={dateError !== ""}>
              <FormControl.Label>Date</FormControl.Label>
              <Input
                type="date"
                placeholder="Enter date"
                ref={dateInputRef}
                value={date}
                onChangeText={(text) => {
                  setDate(text);
                  setDateError("");
                }}
              />
              <FormControl.ErrorMessage>{dateError}</FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={nameError !== ""}>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                type="text"
                placeholder="Enter name"
                ref={nameInputRef}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setNameError("");
                }}
              />
              <FormControl.ErrorMessage>{nameError}</FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={emailError !== ""}>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                type="email"
                placeholder="Enter valid email Address"
                ref={emailInputRef}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError("");
                }}
              />
              <FormControl.ErrorMessage>{emailError}</FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={vendorError !== ""}>
              <FormControl.Label>Vendor</FormControl.Label>
              <Input
                type="text"
                placeholder="Enter your vendor"
                ref={vendorInputRef}
                value={vendor}
                onChangeText={(text) => {
                  setVendor(text);
                  setVendorError("");
                }}
              />
              <FormControl.ErrorMessage>{vendorError}</FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={reasonError !== ""}>
              <FormControl.Label>Reason</FormControl.Label>
              <TextArea
                type="text"
                ref={textareaRef}
                placeholder="Enter Comment"
                value={reason}
                onChangeText={(text) => {
                  setReason(text);
                  setReasonError("");
                }}
              />
              <FormControl.ErrorMessage>{reasonError}</FormControl.ErrorMessage>
            </FormControl>

            {showPopup && (
              <Box bg="red.200" p={2} mt={2}>
                <Text color="red.800">{popupMessage}</Text>
              </Box>
            )}

            <Stack style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
              <Button variant="subtle" endIcon={<Icon as={Ionicons} size="md" onPress={resetData} />}>
                Reset
              </Button>

              <Button size="md" colorScheme="indigo" onPress={handleSendRequest}>
                Send
              </Button>
            </Stack>
          </VStack>
        </Box>
      </View>
    </ScrollView>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <SendRequest />
    </NativeBaseProvider>
  );
};
