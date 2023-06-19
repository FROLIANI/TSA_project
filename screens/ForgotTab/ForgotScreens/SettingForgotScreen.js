import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Card = () => {
  const navigation = useNavigation();

  //Handle back to login
  const HandleLoginButton = () => {
    navigation.navigate("SignInScreen")
  }

  //Handle navigate to help 
  const HandleHelpButton = () => {
    navigation.navigate("HelpForgotScreen")
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Instructions How To Reset Password</Text>
        </View>
        <Text style={styles.instructions}>
          <b>Step 1:</b> Enter your valid Email Address that
          <br />  was Registered by your Telecom Vendor.
        </Text>
        <Text style={styles.instructions}>
          <b>Step 2:</b> Then click the below button written <b>"Reset Password"</b> so
          that to send your new password to your Gmail.
        </Text>

        <Text style={styles.instructions}>
          <b>Step 3:</b> Now leave the page the page, Go open your search Engine like Google
          chrome,Mozila or Safari
          to browse to your Gmail.
        </Text>

        <Text style={styles.instructions}>
          <b>Step 4:</b> Open to inbox for your Gmail,Get your new password,then back to
          <b>"Sign In"</b>
          then use same Email and New Reset password obtained for Login.
        </Text>

        <Text style={styles.instructions}>
          <b>Step 5:</b> For more instructions, Visit <b>"Help page"</b>
        </Text>

      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText} onPress={HandleLoginButton}>Back to Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: 'green', marginTop: 7 }]}>
          <Text style={styles.buttonText} onPress={HandleHelpButton}>Go for Help</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    backgroundColor: 'blue',
    paddingBottom: 8,
    paddingTop: 8,
  },

  instructions: {
    marginBottom: 8,
    fontSize: 18
  },

  button: {
    backgroundColor: 'blue',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 8,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },

  header: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 5,
    marginBottom: 8,
    paddingTop: 8,
    paddingBottom: 8
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default () => {
  return (
    <Card />
  )
}
