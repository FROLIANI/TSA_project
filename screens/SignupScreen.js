import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { View, TextInput, Logo, Button, FormErrorMessage } from '../components';
import { Images, Colors, auth } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { signupValidationSchema } from '../utils';

export const SignupScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('');

  const {
    passwordVisibility,
    handlePasswordVisibility,
    rightIcon,
    handleConfirmPasswordVisibility,
    confirmPasswordIcon,
    confirmPasswordVisibility
  } = useTogglePasswordVisibility();

  const handleSignup = async values => {
    const { email, password } = values;

    createUserWithEmailAndPassword(auth, email, password).catch(error =>
      setErrorState(error.message)
    );
  };

  return (
    <View isSafe style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        {/* LogoContainer: consits app logo and screen title */}
        <View style={styles.logoContainer}>
          <Logo uri={Images.logo} />
          <Text style={styles.screenTitle}>Create a new account!</Text>
        </View>
        {/* Formik Wrapper */}
        <Formik
          initialValues={{
            name:'',
            email: '',
            password: '',
            confirmPassword: '',
            sex:'',
            phone_number:'',
            Telecom_vendor:'',
            Date_Registered:''

          }}
          validationSchema={signupValidationSchema}
          onSubmit={values => handleSignup(values)}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            handleBlur
          }) => (
            <>
              {/* Input fields */}
              <TextInput
                name='name'
                // leftIconName='email'
                placeholder='Enter Full name'
                autoCapitalize='none'
                keyboardType='text-name'
                textContentType='text-name'
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
              <FormErrorMessage 
              error={errors.name} 
              visible={touched.name} />

              <TextInput
                name='email'
                leftIconName='email'
                placeholder='Enter email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              <FormErrorMessage 
              error={errors.email} 
              visible={touched.email} />

              <TextInput
                name='password'
                leftIconName='key-variant'
                placeholder='Enter password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType='newPassword'
                rightIcon={rightIcon}
                handlePasswordVisibility={handlePasswordVisibility}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              <FormErrorMessage
                error={errors.password}
                visible={touched.password}
              />
              <TextInput
                name='confirmPassword'
                leftIconName='key-variant'
                placeholder='Enter password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={confirmPasswordVisibility}
                textContentType='password'
                rightIcon={confirmPasswordIcon}
                handlePasswordVisibility={handleConfirmPasswordVisibility}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
              />
              <FormErrorMessage
                error={errors.confirmPassword}
                visible={touched.confirmPassword}
              />

               <TextInput
                name='Sex'
                // leftIconName='gender'
                placeholder='Enter Gender'
                autoCapitalize='none'
                keyboardType='default'
                textContentType='text'
                autoFocus={true}
                value={values.sex}
                onChangeText={handleChange('sex')}
                onBlur={handleBlur('sex')}
              />
              <FormErrorMessage 
              error={errors.sex} 
              visible={touched.sex} />

              <TextInput
                name='Phone Number'
                // leftIconName='email'
                placeholder='Enter Phone Number'
                autoCapitalize='none'
                keyboardType='phone-pad'
                textContentType='numeric'
                autoFocus={true}
                value={values.phone_number}
                onChangeText={handleChange('phone_number')}
                onBlur={handleBlur('phone_number')}
              />
              <FormErrorMessage 
              error={errors.phone_number} 
              visible={touched.phone_number} />

              <TextInput
                name='Telecom Vendor'
                // leftIconName='email'
                placeholder='Enter Telecom Vendor'
                autoCapitalize='none'
                keyboardType='text'
                textContentType='text'
                autoFocus={true}
                value={values.Telecom_vendor}
                onChangeText={handleChange('Telecom_vendor')}
                onBlur={handleBlur('Telecom_vendor')}
              />
              <FormErrorMessage 
              error={errors.Telecom_vendor} 
              visible={touched.Telecom_vendor} />

              <TextInput
                name='date'
                // leftIconName='date'
                placeholder='Enter Date  Registered'
                autoCapitalize='none'
                keyboardType='date'
                textContentType='date'
                autoFocus={true}
                value={values.Date_Registered}
                onChangeText={handleChange('Date_Registered')}
                onBlur={handleBlur('Date_Registered')}
              />
              <FormErrorMessage 
              error={errors.Date_Registered} 
              visible={touched.Date_Registered} />

              {/* Display Screen Error Mesages */}
              {errorState !== '' ? (
                <FormErrorMessage error={errorState} visible={true} />
              ) : null}
              {/* Signup button */}
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Signup</Text>
              </Button>
            </>
          )}
        </Formik>
        {/* Button to navigate to Login screen */}
        <Button
          style={styles.borderlessButtonContainer}
          borderless
          title={'Already have an account?'}
          onPress={() => navigation.navigate('Login')}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12
  },
  logoContainer: {
    alignItems: 'center'
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    paddingTop: 20
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700'
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
