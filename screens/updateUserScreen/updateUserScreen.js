import React, { useEffect, useState } from 'react';
import { Box, FlatList, Heading, HStack, VStack, Text, Spacer, Button, NativeBaseProvider } from "native-base";
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const database = getDatabase();

const PreviewUser = () => {

  //Handle navigation
  const navigation = useNavigation();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = ref(database, 'TSA/Worker');
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
  const handleUpdate = (userId) => {
    const selectedUser = users.find(user => user.id === userId);
    navigation.navigate("updateUserScreen", { user: selectedUser });
  };

  //Handle delete
  const handleDelete = async (userId) => {
    try {
      const userRef = ref(database, `TSA/Worker/${userId}`);
      await remove(userRef);
      alert('User deleted successfully');
    } catch (error) {
      alert('Error deleting user:', error);
    }
  };

  //Navigate to Vendor Home 
  const handleBack = () => {
    navigation.navigate('VendorHomeScreen')
  };

  return <Box>
    <Text style={{
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: "center",
      marginVertical: 10,
      backgroundColor: 'blue',
      paddingTop: 10,
      paddingBottom: 10
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
      }} borderColor="muted.800"
        pl={["0", "4"]}
        pr={["0", "5"]} py="2"
      >
          <HStack p="3"
            space={[1, 1]}
            justifyContent="space-between"
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
              <Button width={12} height={6} onPress={() => handleUpdate(item.id)}> update </Button>
            </VStack>

            <VStack>
              <Button width={12} height={6} backgroundColor={'red.700'} onPress={() => handleDelete(item.id)}> Delete </Button>
            </VStack>
          </HStack>
        </Box>
      }

      //Provide a unique key for each item
      keyExtractor={item => item.id.toString()} />
    <View style={{ marginBottom: 20 }}>
      <Box p={3} >
        <Button
          width={'80%'}
          height={30}
          alignSelf={'center'}
          padding={5}
          marginBottom={20}
          onPress={handleBack}
        >
          BACK
        </Button>
      </Box>
    </View >

  </Box>;
};

export default () => {
  return (
    <NativeBaseProvider>
      <PreviewUser />
    </NativeBaseProvider>
  );
};
