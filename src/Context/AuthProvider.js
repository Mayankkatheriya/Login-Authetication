import React, { createContext, useContext, useState } from "react";
// import { auth } from "../Firebase";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail  } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const auth = getAuth();
  
  const [currentUser, setCurrentUser] = useState({});

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    return signOut(auth)
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setCurrentUser(user);
      return user;
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error("Google Sign-In Error", error.message);
      throw error;
    }
  }

  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const authData = {
    currentUser,
    setCurrentUser,
    signUp,
    login,
    logOut,
    signInWithGoogle,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
