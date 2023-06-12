

import React, { useState, useEffect } from 'react';
import { View,  Button, FlatList, StyleSheet, Text } from 'react-native';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { Input, Stack, NativeBaseProvider, TextArea } from 'native-base'

const database = getDatabase();

const handleBack = () => {
  // Handle the back button press here
  console.log('Back button pressed');
};


const UpdateUser = () => {
  const [userData, setUserData] = useState([]);
  const [updatedUserData, setUpdatedUserData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const dataRef = ref(database, 'TSA/TaskAssigned');
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const userArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setUserData(userArray);
          setUpdatedUserData(userArray);
        } else {
          setUserData([]);
          setUpdatedUserData([]);
        }
      });
    };

    fetchData();
  }, []);

  const handleUpdate = (item) => {
    const updatedData = {
      name: item.name,
      email: item.email,
      phone: item.phone,
      sex: item.sex,
      date: item.date,
      time: item.time,
      description: item.description,
      location: item.location,
      comment: item.comment,
    };

    update(ref(database, `TSA/TaskAssigned/${item.id}`), updatedData)
      .then(() => {
        alert('Task successfully updated');
      })
      .catch((error) => {
        alert('Error updating Task: ', error);
      });
  };

  const renderItem = ({ item }) => (
    <Stack space={4} w="75%" maxW="300px" mx="auto" mb={4}>
      <Input size="xl"
        placeholder='Name'
        value={item.name}
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, name: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />
      <Input size="xl"
        placeholder='Email Address'
        value={item.email}
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, email: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />

      <Input size="xl"
        placeholder='Phone Number'
        value={item.phone}
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, phone: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />

      <Input size="xl"
        placeholder='Sex'
        value={item.sex}
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, sex: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />

      <Input size="xl"
        placeholder='Date of Assigned Task'
        value={item.date}
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, date: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />

      <Input size="xl"
        placeholder='Time Assigned Task'
        value={item.time}
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, time: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />

         <TextArea size="xl"  w="100%" maxW="100%"
        placeholder='Description'
        value={item.description}
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, description: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />

      <Input size="xl"
        placeholder='Location'
        value={item.location}
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, location: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />

      <TextArea size="xl"  w="100%" maxW="100%"
        placeholder='Commentation of Task'
        value={item.comment}
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, comment: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />
    </Stack>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
       <View style={styles.buttonContainer}>

        {/* Button for back */}
       <Button 
        color="blue"
        title="Back"
        onPress={handleBack}
        style={styles.button}
        />

        {/* Button for update */}
      <Button
        paddingBottom={5}
        color={'green'}
        title="Update"
        onPress={() => {
          updatedUserData.forEach((item) => handleUpdate(item));
        }}
        style={styles.button}
      />


        </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Update User Task</Text>
      <FlatList
        data={updatedUserData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderFooter}
        style={styles.list}
      />
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <UpdateUser />
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  footer: {
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: 'blue',
    paddingTop: 10,
    paddingBottom: 10
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,

  },
});
