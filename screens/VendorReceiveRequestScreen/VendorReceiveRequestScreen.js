

import React, { useEffect, useState } from 'react';
import { Box, FlatList, Heading, HStack, VStack, Text, Spacer, Button, NativeBaseProvider } from "native-base";
import { getDatabase, ref, onValue, update, set } from 'firebase/database';
import { View,StyleSheet } from 'react-native'

const database = getDatabase();

const VendorConfirmUserDetails = () => {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [verifytStatus, setVerifyStatus] = useState(null);
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
      update(usersRef);
      unsubscribe();
    };
  }, []);


  function handleVerify(userId) {
    console.log("userId:", userId);
    const confirmation = confirm("Are you sure you want to Verify this user?");
    if (confirmation) {
      // Perform the accept action
      update(ref(database, `Worker_Request/${userId}`), {
      }).then(() => {
        setVerifyStatus("Verified");
      }).catch((error) => {
        console.error("Error verfy user:", error);
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
      update(ref(database, `Worker_Request/${userId}`), {
      }).then(() => {
        setRejectStatus("rejected");
      }).catch((error) => {
        console.error("Error rejecting user:", error);
      });
    }
  }


  return <Box>
   <View style={styles.titleContainer}>
      <div style={styles.heading}>Request Fowarded Approvement</div>
      <Text style={styles.titleText}> Approval User Request</Text>
    </View>
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
              <Button width={12} height={6} disabled={verifytStatus !== null} onPress={() => handleVerify()}
                marginBottom={3} > Verify </Button>

              <Button width={12} height={6} disabled={rejectStatus !== null} onPress={() => handleReject()}
                marginBottom={3}> Reject </Button>
              {verifytStatus && <p>{verifytStatus}</p>}
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

const styles = StyleSheet.create({
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    paddingTop: 10
  },
  heading: {
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
    fontWeight: "bold",
    backgroundColor: "darkblue",
    height: 50,
    width: '100%',
    textAlign: 'center',
    paddingTop: 18,
    shapeMargin: 'corner'
  }
});

export default () => {
  return (
    <NativeBaseProvider>
      <VendorConfirmUserDetails />
    </NativeBaseProvider>
  );
};
