
import react, { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box, Heading, VStack, FormControl, Input, Button, Stack, Icon, NativeBaseProvider, TextArea } from "native-base";
import { View, Text, ScrollView } from 'react-native';
import { getDatabase, ref, set, push } from 'firebase/database';

const database = getDatabase();

export { database, ref, set, push };

const SendRequest = () => {

  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [vendor, setVendor] = useState('');
  const [reason, setReason] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const dateInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const vendorInputRef = useRef(null);
  const textareaRef = useRef(null);
  const documentInputRef = useRef(null);

  const [dateError, setDateError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [vendorError, setVendorError] = useState("");
  const [reasonError, setReasonError] = useState("");

  const handlesendRequest = () => {
    let isValid = true;

    if (!date) {
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

    if (!email) {
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
      return;

      setDateError("");
      setNameError("");
      setEmailError("");
      setVendorError("");
      setReasonError("");
    }

    // Create a new user object
    const workerDetails = {
      date,
      name,
      email,
      vendor,
      reason,
      document,
    };

    const usersRef = ref(database, 'TSA/Worker_Request');

    // Insert user data into Firebase using push
    push(usersRef, workerDetails)
      .then(() => {
        alert('Request Sent successfully!');
      })
      .catch((error) => {
        alert('Request error', error);
      });
  };

  const resetData = () => {
    setSelectedFile(null);
    setShowPopup(false);
    setPopupMessage('');

    //for reset
    if (dateInputRef.current) {
      dateInputRef.current.clear();
    }
    if (nameInputRef.current) {
      nameInputRef.current.clear();
    }
    if (emailInputRef.current) {
      emailInputRef.current.clear();
    }
    if (vendorInputRef.current) {
      vendorInputRef.current.clear();
    }
    if (textareaRef.current) {
      textareaRef.current.clear();
    }
    if (documentInputRef.current) {
      documentInputRef.current.clear();
    }
  };

  return (
    <ScrollView>
      <View>
        <Box safeArea p="2" w="90%" maxW="290" py="8" marginLeft={10} >
          <Heading textAlign={'center'} size="lg" color="coolGray.800" _dark={{
            color: "warmGray.50"
          }} fontWeight="semibold" >
            Send the Request
          </Heading>
          <Heading textAlign={'center'} mt="1" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }} fontWeight="medium" size="xs">
            Fill the request
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
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

            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input type="text"
                placeholder="Enter name"
                ref={nameInputRef}
                value={name} onChangeText={(text) => setName(text)}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input type="email"
                placeholder="Enter valid email Address"
                ref={emailInputRef}
                value={email} onChangeText={(text) => setEmail(text)}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Vendor</FormControl.Label>
              <Input type="text"
                placeholder="Enter your vendor"
                ref={vendorInputRef}
                value={vendor} onChangeText={(text) => setVendor(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Reason</FormControl.Label>
              <TextArea type="text"
                ref={textareaRef}
                placeholder="Enter Comment"
                value={reason} onChangeText={(text) => setReason(text)}
              />

            </FormControl>

            <Stack style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>

              <Button variant="subtle" endIcon={<Icon as={Ionicons} size="md" onPress={resetData} />}> Reset</Button>

              <Button size="md" colorScheme="indigo" onPress={handlesendRequest} >Send </Button>
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


