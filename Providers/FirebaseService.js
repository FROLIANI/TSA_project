// firebaseService.js
import firestore from '@react-native-firebase/firestore';

export const getUserRole = async (userId) => {
  const userDoc = await firestore().collection('users').doc(userId).get();
  return userDoc.data()?.role || 'user';
};
