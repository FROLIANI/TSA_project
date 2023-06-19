import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { color } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const MainHeader = () => {
  return (
    <View style={styles.mainHeaderContainer}>
      <Text style={styles.mainHeaderText}>NEED FOR HELP!</Text>
    </View>
  );
};

const BaseCard = ({ title, content }) => {
  return (
    <View style={styles.baseCard}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardDivider} />
      <View style={styles.contentContainer}>{content}</View>
    </View>
  );
};

const VendorCard = () => {

  //For vendor
  const email = 'httmanager@example.com';
  const phoneNumber = '+255718658450/+255718658450';
  const address = '12 Mpwapwa,Dodoma, Tanzania';

  const HandleEmailPress = () => {
    Linking.openURL(`mailto:${email}`);
  }
  const HandlePhonePress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const HandleAddressPress = () => {
    Linking.openURL(`https://maps.google.com/?q=${address}`);
  };

  return (
    <ScrollView>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Details to Contact</Text>
        <View style={styles.cardDivider} />

        <Text style={styles.EmailText}>Email:</Text>
        <TouchableOpacity onPress={HandleEmailPress}>
          <Text style={styles.emailLink}> {email}</Text>
        </TouchableOpacity>

        <Text style={styles.PhoneText}>Phone Number:</Text>
        <TouchableOpacity onPress={HandlePhonePress}>
          <Text style={styles.link}>{phoneNumber}</Text>
        </TouchableOpacity>

        <Text style={styles.AddressText}>Address:</Text>
        <TouchableOpacity onPress={HandleAddressPress}>
          <Text style={styles.link}>{address}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const UserCard = () => {
  const email = 'vendormanager@example.com';
  const phoneNumber = '+255678902914/+255624594623';
  const address = '12 Hazina,Mp, Dom';

  const HandleEmailPress = () => {
    Linking.openURL(`mailto:${email}`);
  }
  const HandlePhonePress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const HandleAddressPress = () => {
    Linking.openURL(`https://maps.google.com/?q=${address}`);
  };
  return (
    <ScrollView>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Details to Contact</Text>
        <View style={styles.cardDivider} />
        <Text style={styles.EmailText}>Email:</Text>
        <TouchableOpacity onPress={HandleEmailPress}>
          <Text style={styles.emailLink}> {email}</Text>
        </TouchableOpacity>

        <Text style={styles.PhoneText}>Phone Number:</Text>
        <TouchableOpacity onPress={HandlePhonePress}>
          <Text style={styles.link}>{phoneNumber}</Text>
        </TouchableOpacity>

        <Text style={styles.AddressText}>Address:</Text>
        <TouchableOpacity onPress={HandleAddressPress}>
          <Text style={styles.link}>{address}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const App = () => {
  const navigation = useNavigation();
  const handleBackButton = () => {
    navigation.navigate("SignInScreen")
  };

  return (
    <View style={styles.container}>
      <ScrollView >

        <MainHeader />
        <BaseCard title="For Vendor only" content={<VendorCard />} />
        <BaseCard title="For Telecom Worker Only" content={<UserCard />} />
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },

  mainHeaderContainer: {
    marginTop: 5,
    alignItems: 'center',
  },

  mainHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  baseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },

  cardDivider: {
    height: 1,
    backgroundColor: '#000000',
    marginBottom: 10,
  },

  contentContainer: {
    marginTop: 10,
  },

  emailLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 20,
  },

  EmailText: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  PhoneText: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: 'bold'
  },

  AddressText: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: 'bold'
  },

  backButton: {
    alignSelf: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
    minWidth: "50%"
  },

  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white"
  },

});

export default App;
