import React, { useEffect, useState } from 'react';
import { Box, FlatList, Heading, HStack, VStack, Text, Spacer, Button, NativeBaseProvider } from "native-base";
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const database = getDatabase();
const ManageUserTaskGiven = () => {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const usersRef = ref(database, 'TSA/TaskAssigned');
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
    navigation.navigate("VendorUpdateTaskScreen")
  };

  //Handle delete
  const handleDelete = async (userId) => {
    try {
      const userRef = ref(database, `TSA/TaskAssigned/${userId}`);
      await remove(userRef);
      alert('Task deleted successfully');
    } catch (error) {
      alert('Error deleting Task:', error);
    }
  };

  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate('VendorAssignTaskScreen')
  }

  return <Box>
    <Text style={{
      fontSize: 20, fontWeight: 'bold', textAlign: "center", marginVertical: 10,
      backgroundColor: 'grey', paddingTop: 10, paddingBottom: 10
    }}>
      Manage Task Assigned To worker
    </Text>
    <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 18, fontWeight: 'bold', textAlign: "center" }}>
      View Task For Action
    </Text>

    <Heading bg="teal.300" fontSize="md" p="2" pb="5">
      <HStack space={[12, 2]} justifyContent="space-between">
        <VStack><Text>Name</Text></VStack>
        <VStack><Text>Task</Text></VStack>
        <VStack><Text>Location</Text></VStack>
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
                {item.description}
              </Text>
            </VStack>
            <Spacer />

            <VStack>
              <Text _dark={{
                color: "warmGray.50"
              }} color="coolGray.800" bold>
                {item.location}
              </Text>
            </VStack>
            <Spacer />

            <VStack>
              <Button width={12} height={6} onPress={() => handleUpdate(item)}  > update </Button>
            </VStack>

            <VStack>
              <Button width={12} height={6} onPress={() => handleDelete(item.id)}> Delete </Button>
            </VStack>
          </HStack>
        </Box>
      }
      //Provide a unique key for each item
      keyExtractor={item => item.id.toString()} />
    {selectedUser && (
      <View>
        <Text>Selected User: {selectedUser.name}</Text>
        {/* Render additional details or navigate to a different screen */}
      </View>
    )}

    <Button
      marginTop={5}
      onPress={handleBack}
      colorScheme="blue"
      _text={{ color: "white" }}
    >
      Back
    </Button>
  </Box>;
};

export default () => {
  return (
    <NativeBaseProvider>
      <ManageUserTaskGiven />
    </NativeBaseProvider>
  );
};
