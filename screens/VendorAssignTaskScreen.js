import React from "react";
import {
  Input, Stack, Center, NativeBaseProvider, StatusBar, Box, HStack, IconButton, Icon, Text,
  TextArea, Button
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from 'react-native';
import BottomAssigntasknavigator from '../components/BottomAssigntasknavigator'


const Vendor = () => {
  return <Stack space={4} w="75%" maxW="300px" mx="auto">
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


    <Input variant="underlined" placeholder="Name" />
    <Input variant="underlined" placeholder="Sex" />
    <Input variant="underlined" placeholder="Date" />
    <Input variant="underlined" placeholder="Time" />
    <Input variant="underlined" placeholder="Task Description(pdf doc)" />
    <Input variant="underlined" placeholder="Location/Site" />
    <div style={styles.div}>
      <p style={styles.paragraph}>Admin Comment</p>
      <TextArea style={styles.box} placeholder="Important Instructions" w="100%" maxW="500" />
      <div style={styles.button} >
        <Button size="md">
          RESET
        </Button>
        <Button size="md" colorScheme="success">
          SUBMIT
        </Button>
      </div>
    </div>
  </Stack>;
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
  }
})

export default () => {
  return (
    <NativeBaseProvider>
      <Vendor />
      <BottomAssigntasknavigator />
    </NativeBaseProvider>
  );
};
