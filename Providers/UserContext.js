// UserContext.js
import React, { createContext, useEffect, useState } from 'react';
import { getUserRole } from '../Providers/FirebaseService';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('user'); // Default to 'user' role

  useEffect(() => {
    // Fetch the user's role after successful login
    const fetchUserRole = async (userId) => {
      const role = await getUserRole(userId);
      setUserRole(role);
    };

    // Assuming you have a way to get the authenticated user's ID
    const userId = 'USER_ID_HERE';
    fetchUserRole(userId);
  }, []);

  return (
    <UserContext.Provider value={userRole}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
