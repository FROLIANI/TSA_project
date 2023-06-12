import React, { useEffect, useState } from 'react';
import { Box, FlatList, Heading, HStack, VStack, Text, Spacer, Button, NativeBaseProvider } from "native-base";
import { getDatabase, ref, onValue, update, remove, set } from 'firebase/database';
import { View, StyleSheet, ScrollView } from 'react-native'

const database = getDatabase();

const VendorList = () => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isActivated, setActivated] = useState(false);

    useEffect(() => {
        const usersRef = ref(database, 'TSA/Vendor');
        const unsubscribe = onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            const updatedUsers = data ? Object.entries(data).map(([id, user]) => ({ id, ...user })) : [];
            setUsers(updatedUsers);
        });

        const handleDataChange = (snapshot) => {
            const dataValue = snapshot.val();
            setActivated(dataValue?.isActive || false);
        };

        if (selectedUser && selectedUser.id) {
            const dataRef = ref(database, `TSA/Vendor/${selectedUser.id}`);
            const dataListener = onValue(dataRef, handleDataChange);

            return () => {
                remove(usersRef);
                remove(dataRef);
                unsubscribe();
            };
        }

        return () => {
            remove(usersRef);
            unsubscribe();
        };
    }, [selectedUser]);

    const handleActivate = async (userId) => {
        const newActivationValue = !isActivated;

        const userRef = ref(database, `TSA/Vendor/${userId}`);
        try {
            // Update the 'isActive' property of the data item in Firebase Realtime Database
            const dataRef = ref(database, 'TSA/Vendor/${userId}');
            await set(dataRef, { isActive: newActivationValue });
            console.log('Activation done');
        } catch (error) {
            console.error('Error activation :', error);
        }
    };

   
    //Handle update
    const handleUpdate = (user) => {
        setSelectedUser(user);
        // Perform the update logic here
        console.log('User update:', user);
    };

    const handleDelete = async (userId) => {
        try {
            const userRef = ref(database, `TSA/Vendor/${userId}`);
            await remove(userRef);
            alert('User deleted successfully');
        } catch (error) {
            alert('Error deleting user:', error);
        }
    };

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.scrollContainer}>
                    <Box>
                        <View style={styles.titleContainer}>
                            <div style={styles.heading}> Welcome, Vendor List Details</div>
                            <Text style={styles.titleText}> Vendor List!</Text>
                        </View>
                        <Heading bg="teal.200" fontSize="md" p="3" pb="5">
                            <HStack space={[4, 1]} justifyContent="space-between">
                                <VStack><Text>Name</Text></VStack>
                                <VStack><Text>Vendor Id</Text></VStack>
                                <VStack><Text>Date Registered</Text></VStack>
                                <VStack><Text pl="6">Action</Text></VStack>
                            </HStack>
                        </Heading>

                        <FlatList
                            data={users}
                            renderItem={({ item }) => (
                                <Box
                                    borderBottomWidth="1"
                                    _dark={{ borderColor: "muted.50" }}
                                    borderColor="muted.800"
                                    pl={["0", "4"]}
                                    pr={["0", "5"]}
                                    py="2"
                                >
                                    <HStack p="3" space={[1, 1]} justifyContent="space-between">
                                        <VStack>
                                            <Text
                                                _dark={{ color: "warmGray.50" }}
                                                color="coolGray.800"
                                                bold
                                            >
                                                {item.name}
                                            </Text>
                                        </VStack>
                                        <Spacer />
                                        <VStack>
                                            <Text
                                                _dark={{ color: "warmGray.50" }}
                                                color="coolGray.800"
                                                bold
                                            >
                                                {item.vendorId}
                                            </Text>
                                        </VStack>
                                        <Spacer />
                                        <VStack>
                                            <Text
                                                _dark={{ color: "warmGray.50" }}
                                                color="coolGray.800"
                                                bold
                                            >
                                                {item.registerdate}
                                            </Text>
                                        </VStack>
                                        <Spacer />
                                        <VStack>
                                            <Button
                                                backgroundColor={'amber.200'}
                                                title={isActivated ? 'Deactivate Data' : 'Activate Data'}
                                                onPress={() => handleActivate(item.id)}
                                            >
                                                Activate
                                            </Button>
                                            <Text>Status: {isActivated ? 'Active' : 'Inactive'}</Text>
                                            <Button
                                                width={12}
                                                marginBottom={4}
                                                height={6}
                                                onPress={() => handleUpdate(item)}
                                            >
                                                update
                                            </Button>
                                            <Button
                                                width={12}
                                                marginBottom={3}
                                                height={6}
                                                onPress={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </Button>
                                        </VStack>
                                    </HStack>
                                </Box>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />

                        {selectedUser && (
                            <View>
                                <Text>Selected User: {selectedUser.name}</Text>
                            </View>
                        )}
                    </Box>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        overflow: 'auto',
    },
    titleContainer: {
        backgroundColor: "#f2f2f2",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
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
        height: 50,
        width: '100%',
        textAlign: 'center',
        paddingTop: 18,
        shapeMargin: 'corner'
    }
})

export default () => {
    return (
        <NativeBaseProvider>
            <VendorList />
        </NativeBaseProvider>
    );
};
