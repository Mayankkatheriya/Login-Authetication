// Importing necessary dependencies from React and Firebase Authentication
import React, { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

// Creating a new context for authentication
const AuthContext = createContext();

// Creating a custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Defining the AuthProvider component
const AuthProvider = ({ children }) => {
  // Initializing Firebase Authentication
  const auth = getAuth();

  // Creating state to store the current user information
  const [currentUser, setCurrentUser] = useState({});

  // Function for user registration
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Function for user login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function for user logout
  const logOut = () => {
    return signOut(auth);
  };

  // Function for Google sign-in
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Signing in with Google using Firebase Authentication
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setCurrentUser(user);
      return user;
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error("Google Sign-In Error", error.message);
      throw error;
    }
  };

  // Function for resetting user password
  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Creating an object with authentication-related data and functions
  const authData = {
    currentUser,
    setCurrentUser,
    signUp,
    login,
    logOut,
    signInWithGoogle,
    resetPassword,
  };

  // Providing the authentication context to the children components
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

// Exporting the AuthProvider component as the default export
export default AuthProvider;
