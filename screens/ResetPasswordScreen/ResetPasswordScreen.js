
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { Icon,VStack,Input,NativeBaseProvider } from 'native-base';
import { useNavigation } from '@react-navigation/native';


//  initialized Firebase app and obtained the auth instance
const auth = getAuth();

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const [showResetStatus, setShowResetStatus] = useState(false);

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent successfully
        setResetStatus('Password reset email sent Seccessfully!');
        setShowResetStatus(true);

      })
      .catch(() => {
        // Error occurred while sending password reset email
        setResetStatus('Error! User Email not found');
        setShowResetStatus(true);
      });
  }

  const LeftIcon = ({ name }) => (
    <Icon
      as={<Ionicons name={name} />}
      size={5}
      ml={2}
      color="blue.500" // Set the color to blue
    />
  );

  useEffect(() => {
    if (showResetStatus) {
      const timer = setTimeout(() => {
        setShowResetStatus(false);
      }, 3000); // 3 seconds delay before hiding the reset status message

      return () => clearTimeout(timer);
    }
  }, [showResetStatus]);

  const navigation = useNavigation();

  return (<View isSafe style={styles.container}>
    <View style={styles.innerContainer}>
      <Text style={styles.screenTitle}>Reset your password</Text>
    </View>
<View>
    <Input
    height={35}
    width={'100%'}
    marginBottom= {1}
      placeholder="Enter Email Address"
      onChangeText={text => setEmail(text)}
      value={email}
      InputLeftElement={
        <LeftIcon name="mail" />
      }
    />
    </View>  
  

    <TouchableOpacity
      style={styles.button}
      onPress={handleResetPassword}
    >
      <Text style={styles.buttonText}>Reset Password</Text>
    </TouchableOpacity>

    {showResetStatus && <Text style={styles.resetStatus}>{resetStatus}</Text>}
    <Text
      style={styles.loginButtonText} onPress={() => navigation.navigate('SignInScreen')}>
      Go Back to Login
    </Text>


  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 12
  },
  innerContainer: {
    alignItems: 'center'
  },

  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: 'black',
    paddingTop: 20,
    paddingBottom:10
  },

  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8
  },

  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },

  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButtonText: {
    color: 'blue',
    fontSize: 18,
    textDecorationLine: 'none',
    textAlign: 'center',
    paddingTop: 5
  },

  resetStatus: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },

  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 8,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },

});
     
export default ()=>{
  return(
    <NativeBaseProvider>
<ResetPasswordScreen/>
</NativeBaseProvider>
  )
}

