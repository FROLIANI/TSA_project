
import React, { useState, useRef } from "react";
import {
  Input, Stack, NativeBaseProvider, StatusBar, Box, HStack, IconButton, Icon, Text,
  TextArea, Button
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet,ScrollView,View } from 'react-native';
import { getDatabase, ref, set, push } from "firebase/database";
import { useNavigation } from '@react-navigation/native';


const database = getDatabase();

export { database, ref, set };
const VendorAssignTask = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sex, setSex] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');

  //Constant for reset
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const sexInputRef = useRef(null);
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const locationInputRef = useRef(null);
  const commentInputRef = useRef(null);

  //To reset
  const resetData = () => {
    //for reset
    if (nameInputRef.current) {
      nameInputRef.current.clear();
    }
    if (emailInputRef.current) {
      emailInputRef.current.clear();
    }
    if (phoneInputRef.current) {
      phoneInputRef.current.clear();
    }

    if (sexInputRef.current) {
      sexInputRef.current.clear();
    }
    if (dateInputRef.current) {
      dateInputRef.current.clear();
    }
    if (timeInputRef.current) {
      timeInputRef.current.clear();
    }
    if (descriptionInputRef.current) {
      descriptionInputRef.current.clear();
    }
    if (locationInputRef.current) {
      locationInputRef.current.clear();
    }
    if (commentInputRef.current) {
      commentInputRef.current.clear();
    }
  };

  const handleCreate = () => {
    // Create a new user object
    const user = {
      name,
      email,
      phone,
      sex,
      date,
      time,
      description,
      location,
      comment,
    };

    const usersRef = ref(database, 'TSA/TaskAssigned');
    // Insert user data into Firebase using push
    push(usersRef, user)
      .then(() => {
        alert('Task  sent successfully!');
      })
      .catch((error) => {
        alert('Error task data: ', error);
      });
  };

  const navigation = useNavigation();
  const handleManageTask = () => {
  navigation.navigate("VendorManageTaskScreen")
  }

  return ( <ScrollView>
    <View>
     <Stack space={4} w="75%" maxW="300px" mx="auto">
    <StatusBar style={styles.bar} />
    <Box style={styles.boxbar} />

    <HStack style={styles.hstack} px="1" py="3"  >
      <HStack alignItems="center">
        <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
        <Text color="white" fontSize="20" fontWeight="bold">
          Assign Duty
        </Text>
      </HStack>
      <HStack>
        <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
      </HStack>
    </HStack>


    <Input variant="underlined" placeholder="Name"
      value={name} onChangeText={(text) => setName(text)}
      ref={nameInputRef}
    />

    <Input variant="underlined" placeholder="Email Address"
      value={email} onChangeText={(text) => setEmail(text)}
      ref={emailInputRef}
    />

    <Input variant="underlined" placeholder="Phone Number"
      value={phone} onChangeText={(text) => setPhone(text)}
      ref={phoneInputRef}
    />

    <Input variant="underlined" placeholder="Sex"
      value={sex} onChangeText={(text) => setSex(text)}
      ref={sexInputRef}
    />

    <Input variant="underlined" placeholder="Date"
      value={date} onChangeText={(text) => setDate(text)}
      ref={dateInputRef}
    />

    <Input variant="underlined" placeholder="Time"
      value={time} onChangeText={(text) => setTime(text)}
      ref={timeInputRef}
    />

    <Input variant="underlined" placeholder="Task Description"
      value={description} onChangeText={(text) => setDescription(text)}
      ref={descriptionInputRef}
    />

    <Input variant="underlined" placeholder="Location/Site"
      value={location} onChangeText={(text) => setLocation(text)}
      ref={locationInputRef}
    />

    <div style={styles.div}>

      <p style={styles.paragraph}>Admin Comment</p>
      <TextArea style={styles.box} placeholder="Important Instructions" w="100%" maxW="500"
        value={comment} onChangeText={(text) => setComment(text)}
        ref={commentInputRef}
      />
      <div style={styles.button} >

        <Button size="md" onPress={resetData}>
          RESET
        </Button>

        <Button onPress={handleCreate} size="md" colorScheme="success">
          SUBMIT
        </Button>
      </div>

      <Button onPress={handleManageTask} size="md" colorScheme="secondary" style={styles.ManageButton}>
          MANAGE TASK HERE
        </Button>
    </div>
  </Stack>
  </View>
  </ScrollView>
  )
};

const styles = StyleSheet.create({

  bar: {
    backgroundColor: "##dbeafe",
    width: "100%",
    barStyle: "light-content"
  },

  boxbar: {
    backgroundColor: "blue"
  },

  hstack: {
    backgroundColor: '#0369a1',
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "350",
  },

  div: {
    boxShadow: 'yellow',
    paddingTop: '4',
    flexDirection: 'column'
  },

  paragraph: {
    fontFamily: 'sans-serif',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 3
  },

  box: {
    width: '100%',
    height: '100%',
  },

  button: {
    display: "flex",
    marginRight: 10,
    paddingTop: 10,
    justifyContent: 'space-between'
  },

  ManageButton:{
    marginBottom:8,
    marginTop:8
  }
  
})

export default () => {
  return (
    <NativeBaseProvider>
      <VendorAssignTask />
    </NativeBaseProvider>
  );
};
