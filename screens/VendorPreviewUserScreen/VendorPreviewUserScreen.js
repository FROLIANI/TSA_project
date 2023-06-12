

import React, { useEffect, useState } from 'react';
import { Box, FlatList, Heading, HStack, VStack, Text, Spacer, Button, NativeBaseProvider } from "native-base";
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { View } from 'react-native'

const database = getDatabase();

const PreviewUser = () => {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const usersRef = ref(database, 'TSA/worker');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const updatedUsers = data ? Object.entries(data).map(([id, user]) => ({ id, ...user })) : [];
      setUsers(updatedUsers);
    });

    return () => {
      remove(usersRef);
      unsubscribe();
    };
  }, []);

  //Handle update
  
  const handleUpdate = (user) => {
    setSelectedUser(user);
    // Perform the update logic here
    console.log('User update:', user);
  };

  //Handle delete
  const handleDelete = async (userId) => {
    try {
      const userRef = ref(database, `TSA/worker/${userId}`);
      await remove(userRef);
    alert('User deleted successfully');
    } catch (error) {
      alert('Error deleting user:', error);
    }
  };

  const handleBack = () => {
    console.log('Back previously')
  };
  return <Box>
   <Text style={{
        fontSize: 20, fontWeight: 'bold', textAlign: "center", marginVertical: 10,
        backgroundColor: 'blue', paddingTop: 10, paddingBottom: 10
      }}>
        Vendor Preview User
      </Text>
    <Heading bg="teal.200" fontSize="md" p="5" pb="3">
      <HStack space={[20, 1]} justifyContent="space-between">
        <VStack><Text>Name</Text></VStack>
        <VStack><Text>Email</Text></VStack>
        <VStack><Text pl="6">Action</Text></VStack>

      </HStack>
    </Heading>

    <FlatList
      data={users}
      renderItem={({
        item
      }) => <Box borderBottomWidth="1" _dark={{
        borderColor: "muted.50"
      }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
          <HStack p="3" space={[1, 1]} justifyContent="space-between"
          >
            <VStack>
              <Text _dark={{
                color: "warmGray.50"
              }} color="coolGray.800" bold>
                {item.name}
              </Text>
            </VStack>
            <Spacer />

            <VStack>
              <Text _dark={{
                color: "warmGray.50"
              }} color="coolGray.800" bold>
                {item.email}
              </Text>
            </VStack>
            <Spacer />

            <VStack>
              <Button width={12} height={6} onPress={() => handleUpdate(item)}  > update </Button>
            </VStack>

            <VStack>
              <Button width={12} height={6} backgroundColor={'red.700'} onPress={() => handleDelete(item.id)}> Delete </Button>
            </VStack>
          </HStack>
        </Box>
      }

      //Provide a unique key for each item
      keyExtractor={item => item.id.toString()} />
      <Box p={3} >
        <Button width={'80%'} height={30} alignSelf={'center'} padding={5} onPress={handleBack}>
            BACK
          </Button>
          </Box>
    {selectedUser && (
      <View>
        <Text>Selected User: {selectedUser.name}</Text>
        {/* Render additional details or navigate to a different screen */}
      </View>
    )}
  </Box>;
};

export default () => {
  return (
    <NativeBaseProvider>
      <PreviewUser />
    </NativeBaseProvider>
  );
};
