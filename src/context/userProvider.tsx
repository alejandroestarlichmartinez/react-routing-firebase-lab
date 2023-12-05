import { createContext, useState, ReactNode, useEffect } from "react";
import { auth } from "../firebaseConfig";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

interface UserContextType {
  user: any; // Update the type based on your actual user object structure
  registerUser: (email: string, password: string) => Promise<UserCredential>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  logOutUser: () => Promise<void>; // Updated the return type to Promise<void>
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  registerUser: () => Promise.resolve({} as UserCredential),
  loginUser: () => Promise.resolve({} as UserCredential),
  logOutUser: () => Promise.resolve(), // Updated the return value
  loading: false,
  setLoading: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        const { uid, email, photoURL, displayName } = user;
        setUser({ uid, email, photoURL, displayName });
      } else {
        setUser(null);
      }
    });
    return () => unsuscribe();
  }, []);

  const registerUser = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const logOutUser = () => signOut(auth); // Fixed the function name

  return (
    <UserContext.Provider value={{ user, registerUser, loginUser, logOutUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
