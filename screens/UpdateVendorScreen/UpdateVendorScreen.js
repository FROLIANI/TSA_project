import React, { useState, useEffect } from 'react';
import { View,  Button, FlatList, StyleSheet, Text } from 'react-native';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { Input,Stack,NativeBaseProvider} from 'native-base'

const database = getDatabase();


const UpdateVendor = () => {
  const [userData, setUserData] = useState([]);
  const [updatedUserData, setUpdatedUserData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const dataRef = ref(database, 'TSA/Vendor');
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

  const handleBack =() =>{
    console.log('You back!')
  }

  const handleUpdate = (item) => {
    const updatedData = {
      name: item.name,
      vendorId: item.vendorId,
      contact: item.contact,
      contactDetails: item.contactDetails,
      address: item.address,
      vendorType: item.vendorType,
      registerdate: item.registerdate,
      password: item.password,
      cpassword: item.cpassword,
    };

    update(ref(database, `TSA/Vendor/${item.id}`), updatedData)
      .then(() => {
        alert('Vendor successfully updated');
      })
      .catch((error) => {
      alert('Error updating Vendor: ', error);
      });
  };

  const renderItem = ({ item }) => (
    <Stack space={4} w="80%" maxW="300px" mx="auto">

      <Input
        variant="outline"
        value={item.name}
        placeholder='name'
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
      <Input
        variant="outline"
        value={item.vendorId}
        placeholder='Vendor Id'
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, vendorId: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />
      <Input
        variant="outline"
        value={item.contact}
        placeholder='Contact'
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, contact: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />
      <Input
        variant="outline"
        value={item.address}
        placeholder='Address'
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, address: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />
      <Input
        variant="outline"
        value={item.contactDetails}
        placeholder='Contact Details'
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, contactDetails: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />

      <Input
        variant="outline"
        value={item.vendorType}
        placeholder='Vendor Type'
        onChangeText={(text) => {
          setUpdatedUserData((prevData) => {
            const updatedItem = { ...item, vendorType: text };
            const newData = prevData.map((data) =>
              data.id === item.id ? updatedItem : data
            );
            return newData;
          });
        }}
      />

      <Input
        variant="outline"
        value={item.registerdate}
        placeholder='Registerd Date'
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

      <Input
        variant="outline"
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

      <Input
        variant="outline"
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
    <View style={styles.buttonContainer}>

      <View style={styles.segment}>
        <Button
          size="sm"
           colorScheme="secondary"
          title="Back"
          onPress={handleBack}
        />
      </View>

      <View style={styles.space}></View>

    <View style={styles.segment}>
      <Button
      marginBottom = {20}
      color={'green'}
        title="Update"
        onPress={() => {
          updatedUserData.forEach((item) => handleUpdate(item));
        }}
      />
    </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Update Vendor Details</Text>
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
    <UpdateVendor />
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingTop:5,
    paddingBottom:5
  },

  itemContainer: {
    marginBottom: 10,
  },

  footer: {
    marginTop: 5,
    height:40,
    width:300,
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor:'blue',
    paddingTop:4,
    paddingBottom:5
  },

  segment: {
    width: 100,
    height: 30,
    backgroundColor: 'black',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  
  space: {
    width: 40, // Adjust the width as per your requirement
  },
});
