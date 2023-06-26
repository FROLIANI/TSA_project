import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, StyleSheet, Text, ScrollView } from 'react-native';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { Input, Stack, NativeBaseProvider } from 'native-base'
import { useNavigation } from '@react-navigation/native';


const database = getDatabase();


const UpdateVendor = () => {
  const [userData, setUserData] = useState([]);
  const [updatedUserData, setUpdatedUserData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const dataRef = ref(database, `TSA/Worker`);
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

  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate('VendorHomeScreen')
  }

  const handleUpdate = (userId) => {
    const updatedUser = updatedUserData.find((item) => item.id === userId);
    if (updatedUser) {
      const updatedData = {
        name: updatedUser.name,
        email: updatedUser.email,
        vendorType: updatedUser.vendorType,
        registerdate: updatedUser.registerdate,
        dob: updatedUser.dob,
        gender: updatedUser.gender,
        phone: updatedUser.phone,
      };

      update(ref(database, `TSA/Worker/${userId}`), updatedData)
        .then(() => {
          alert('Worker successfully updated');
        })
        .catch((error) => {
          alert('Error updating Worker: ', error);
        });
    }
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
        value={item.dob}
        placeholder='dob'
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

      <Input
        variant="outline"
        value={item.gender}
        placeholder='gender'
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

      <Input
        variant="outline"
        value={item.email}
        placeholder='Email'
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

      <Input
        variant="outline"
        value={item.phone}
        placeholder='phone'
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
          marginBottom={20}
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
      <Text style={styles.headerText}>Update Worker Details</Text>

      <ScrollView style={styles.scrollView}>
        <FlatList
          data={updatedUserData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderFooter}
          style={styles.list}
        />
      </ScrollView>
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
  container: {
    paddingTop: 5,
    paddingBottom: 5
  },

  itemContainer: {
    marginBottom: 10,
  },

  footer: {
    marginTop: 5,
    height: 40,
    width: 300,
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: 'blue',
    paddingTop: 4,
    paddingBottom: 5
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

  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
});
