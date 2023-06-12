// firebaseAuth.js
import auth from '@react-native-firebase/auth';

export const loginUser = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user.uid;
  } catch (error) {
    throw new Error(error.message);
  }
};
