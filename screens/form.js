import React, { useState } from 'react';
import { VStack, Button, Input, NativeBaseProvider, Center } from 'native-base';
import { ref, set } from "firebase/database";
import { db } from './config/firebase'


function BuildingAFormExample() {
  const [username, setname] = useState('');

  function Create() {
    set(ref(db, 'users/' + username), {
      username: username,
     
    }).then(() => {
      //Data is successful saved
      alert('Data is saved successful');
    }).catch(() => {
      //Error data is saved
      alert(errors);
    })

  }

  return <VStack width="90%" mx="3" maxW="300px">
    <label>Username</label>
    <Input value={username} placeholder="Enter name" onChangeText={
      (username) => { setname(username) }} />
      
    <Button onPress={Create} mt="5" colorScheme="cyan">
      Submit
    </Button>
  </VStack>;
}


function Example() {
  return <Center flex={1}>
    <BuildingAFormExample />
  </Center>;
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};
