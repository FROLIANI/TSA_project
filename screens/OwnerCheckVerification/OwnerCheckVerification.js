import React, { useEffect, useState } from 'react';
import { Box, FlatList, Heading, HStack, VStack, Text, Spacer, Button, NativeBaseProvider } from "native-base";;
import { getDatabase, ref, onValue, remove, update, set } from 'firebase/database';
import { View } from 'react-native'

const database = getDatabase();

const PreviewUser = () => {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [acceptStatus, setAcceptStatus] = useState(null);
  const [rejectStatus, setRejectStatus] = useState(null);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const usersRef = ref(database, 'TSA/Worker_Request');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();

      //SET ID
      if (data && data.userId) {
        setUserId(data.userId);
      }

      const updatedUsers = data ? Object.entries(data).map(([id, user]) => ({ id, ...user })) : [];
      setUsers(updatedUsers);
    });

    return () => {
      remove(usersRef);
      unsubscribe();
    };
  }, []);


  function handleAccept(userId) {
    console.log("userId:", userId);
    const confirmation = confirm("Are you sure you want to accept this user?");
    if (confirmation) {
      // Perform the accept action
      update(ref(database, `TSA/Worker_Request/${userId}`), {
      }).then(() => {
        setAcceptStatus("accepted");
      }).catch((error) => {
        console.error("Error accepting user:", error);
      });
    }
    else {
      console.log("Invalid userId:", userId);
    }
  }

  function handleReject(userId) {
    console.log("userId:", userId);
    const confirmation = confirm("Are you sure you want to reject this user?");
    if (confirmation) {
      // Perform the reject action
      update(ref(database, `TSA/Worker_Request/${userId}`), {
      }).then(() => {
        setRejectStatus("rejected");
      }).catch((error) => {
        console.error("Error rejecting user:", error);
      });
    }
  }


  return <Box>
    <div fontSize={15} fontWeight={'bold'} textalign="center" >
      <h3 bg="blue.500"> Owner Received  User Request</h3>
    </div>
    <Heading bg="teal.200" fontSize="md" p="5" pb="3">
      <HStack space={[5, 1]} justifyContent="space-between">
        <VStack><Text>Date</Text></VStack>
        <VStack><Text>Name</Text></VStack>
        <VStack><Text>Vendor</Text></VStack>
        <VStack><Text>Reason</Text></VStack>
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
                {item.date}
              </Text>
            </VStack>
            <Spacer />

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
                {item.vendor}
              </Text>
            </VStack>
            <Spacer />

            <VStack>
              <Text _dark={{
                color: "warmGray.50"
              }} color="coolGray.800" bold>
                {item.reason}
              </Text>
            </VStack>
            <Spacer />

            <VStack display={'flex'} flexDirection={'column'}>
              <Button width={12} height={6} disabled={acceptStatus !== null} onPress={() => handleAccept()}
                marginBottom={3} > Accept </Button>

              <Button width={12} height={6} disabled={rejectStatus !== null} onPress={() => handleReject()}
                marginBottom={3}> Reject </Button>
              {acceptStatus && <p>{acceptStatus}</p>}
              {rejectStatus && <p>{rejectStatus}</p>}
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
  </Box>;
};

export default () => {
  return (
    <NativeBaseProvider>
      <PreviewUser />
    </NativeBaseProvider>
  );
};
