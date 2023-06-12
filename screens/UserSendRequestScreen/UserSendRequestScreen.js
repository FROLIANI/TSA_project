
import react, { useState,useRef  } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box, Heading, VStack, FormControl, Input, Button, Stack, Icon, NativeBaseProvider, TextArea } from "native-base";
import * as DocumentPicker from 'expo-document-picker';
import { View, Text, Modal } from 'react-native';
import { getDatabase, ref, set, push } from 'firebase/database';

const database = getDatabase();

export { database, ref, set, push };

const SendRequest = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [vendor, setVendor] = useState('');
  const [reason, setReason] = useState('');
  const [document, setcocument] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const dateInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const vendorInputRef = useRef(null);
  const textareaRef  = useRef(null);
  const documentInputRef = useRef(null);

  const handlesendRequest = () => {
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
    if (textareaRef .current) {
      textareaRef .current.clear();
    }
    if (documentInputRef.current) {
      documentInputRef.current.clear();
    }
  };

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });

      setSelectedFile(res);
    } catch (err) {
      console.log('Error while picking the file:', err);
    }
  };

  const uploadFile = async () => {
    try {
      if (selectedFile && selectedFile.name) {
        const formData = new FormData();
        formData.append('file', {
          uri: selectedFile.uri,
          type: selectedFile.type,
          name: selectedFile.name,
        });

        const response = await fetch('https://console.firebase.google.com/project/tsa123-76b2e/database/tsa123-76b2e-default-rtdb/data/~2F', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle the response from the server
        console.log('File upload response:', response);
      } else {
        console.log('No file selected');
      }
    } catch (error) {
      console.log('Error while uploading the file:', error);
    }
  };

  return <Box safeArea p="2" w="90%" maxW="290" py="8" marginLeft={10} >
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
        <Input type="date"
        placeholder="Enter  date"
        ref={dateInputRef}
          value={date} onChangeText={(text) => setDate(text)}
        />
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
         ref={textareaRef }
         placeholder="Enter Comment"
          value={reason} onChangeText={(text) => setReason(text)}
        />

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 14, marginBottom: 10, marginTop: 8, textAlign: 'center' }}>
            Upload Your Document</Text>
          <Button height={10} title="Select File" onPress={pickFile} 
            value={document} onChangeText={(text) => setcocument(text)}
          />

          {selectedFile && (
            <View>
              <Text>Selected File: {selectedFile.name}</Text>
            </View>
          )}
        </View>
      </FormControl>

      <Stack style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>

        <Button variant="subtle" endIcon={<Icon as={Ionicons} size="md" onPress={resetData} />}> Reset</Button>

        <Button size="md" colorScheme="indigo" onPress={handlesendRequest} >Send </Button>
      </Stack>
    </VStack>
  </Box >

};

export default () => {
  return (
    <NativeBaseProvider>
      <SendRequest />
    </NativeBaseProvider>
  );
};


