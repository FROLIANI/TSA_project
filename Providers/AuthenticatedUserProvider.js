// UserProvider.js
import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';

const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        // Make an API call to the server to fetch the user's role
        // Replace 'fetchUserRoleFromServer' with your actual server request logic
        const role = await fetchUserRoleFromServer(token);

        setUserRole(role);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <UserContext.Provider value={userRole}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
