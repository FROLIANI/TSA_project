import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

const database = getDatabase();

const CheckUserDetails = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const usersRef = ref(database, 'TSA/Worker');
        const unsubscribe = onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            const updatedUsers = data ? Object.entries(data).map(([id, user]) => ({ id, ...user })) : [];
            setUsers(updatedUsers);
        });

        return () => {
            update(usersRef);
            unsubscribe();
        };
    }, []);

    const renderDataItem = ({ item }) => (
        <View style={styles.itemContainer}>

            <Text style={styles.itemText}>Name: {item.name}</Text>
            <Text style={styles.itemText}>Email: {item.email}</Text>
            <Text style={styles.itemText}>Phone: {item.phone}</Text>
            <Text style={styles.itemText}>Date of Birth: {item.dob}</Text>
            <Text style={styles.itemText}>Gender: {item.gender}</Text>
            <Text style={styles.itemText}>VendorType: {item.vendorType}</Text>
            <Text style={styles.itemText}>Register Date: {item.registerdate}</Text>
           
        </View>
    );

    //Handle navigate to back
      const navigation = useNavigation();
    const handleBackButton = () => {
        navigation.navigate("UserHomeScreen")
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f5f5f5', paddingTop: 20 }}>
            <Text style={{
                fontSize: 20, fontWeight: 'bold', textAlign: "center", marginVertical: 10,
                backgroundColor: 'grey', paddingTop: 10, paddingBottom: 10
            }}>
                Welcome Worker!
            </Text>

            <Text style={{
                fontSize: 18, fontWeight: 'bold', textAlign: "center", marginVertical: 10,
                paddingTop: 10, paddingBottom: 10
            }}>
                Here your View  Registration Details!
            </Text>

            <FlatList
                data={users}
                renderItem={renderDataItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ alignItems: "center" }} // Center vertically
            />
            <View style={{ marginBottom: 20, backgroundColor: 'green' }}>
                <Button title="Back Home" onPress={handleBackButton} color="blue" />
            </View>

        </View>
    );
};

export default () => {
    return (
        <CheckUserDetails />
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    itemContainer: {
        marginBottom: 10,
        backgroundColor: "#eaeaea",
        padding: 20,
        borderRadius: 5,
        alignItems: "flex-start", // Center horizontally
    },
    itemText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        textAlign: "center", // Center text
    },
});
