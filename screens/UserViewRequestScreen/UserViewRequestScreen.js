import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';


const database = getDatabase();

const RecieveTaskAssigned = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = ref(database, 'TSA/Worker_Request');
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

      <Text style={styles.itemText}>Date: {item.date}</Text>
      <Text style={styles.itemText}>Name: {item.name}</Text>
      <Text style={styles.itemText}>Email: {item.email}</Text>
      <Text style={styles.itemText}>Vendor: {item.vendor}</Text>
      <Text style={styles.itemText}>Reason: {item.reason}</Text>
     
    </View>
  );

  const navigation = useNavigation();

  const handleBackButton = () => {
    navigation.navigate("UserSendRequestScreen")

  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5', paddingTop: 20 }}>
      <Text style={{
        fontSize: 20, fontWeight: 'bold', textAlign: "center", marginVertical: 10,
        backgroundColor: 'grey', paddingTop: 10, paddingBottom: 10
      }}>
        VIEW YOUR REQUEST
      </Text>

      <FlatList
        data={users}
        renderItem={renderDataItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ alignItems: "center" }} // Center vertically
      />
      <View style={{ marginBottom: 20, backgroundColor: 'green' }}>
        <Button title="Back" onPress={handleBackButton} color="blue" />
      </View>

    </View>
  );
};

export default () => {
  return (
    <RecieveTaskAssigned />
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
