import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { Input, Stack, NativeBaseProvider } from 'native-base'

const database = getDatabase();


const UpdateUser = () => {
  const [userData, setUserData] = useState([]);
  const [updatedUserData, setUpdatedUserData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const dataRef = ref(database, 'TSA/worker');
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

  const handleBack = () => {
    // Handle the back button press here
    console.log('Back button pressed');
  };

  const handleUpdate = (item) => {
    const updatedData = {
      name: item.name,
      email: item.email,
      phone: item.phone,
      dob: item.dob,
      gender: item.gender,
      VendorType: item.VendorType,
      registerdate: item.registerdate,
      password: item.password,
      cpassword: item.cpassword,
    };

    update(ref(database, `TSA/worker/${item.id}`), updatedData)
      .then(() => {
        alert('Data successfully updated');
      })
      .catch((error) => {
        alert('Error updating data: ', error);
      });
  };

  const renderItem = ({ item }) => (
    <Stack space={4} w="75%" maxW="300px" mx="auto" mb={4}>
      <Input size="xl"
        placeholder='name'
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
        placeholder='Gender'
        value={item.gender}
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, gender: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />

      <Input size="xl"
        placeholder='Date of Birth'
        value={item.dob}
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, dob: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />

      <Input size="xl"
        placeholder='Vendor Type'
        value={item.VendorType}
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, VendorType: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />

      <Input size="xl"
        placeholder='Registerd Date'
        value={item.registerdate}
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, registerdate: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />

      <Input size="xl"
        placeholder='Password'
        value={item.password}
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, password: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />

      <Input size="xl"
        placeholder='Confirm password'
        value={item.cpassword}
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, cpassword: text };
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

         {/* Button for Update */}
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
      <Text style={styles.headerText}>Update User Details</Text>
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
