import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthActionResponseT, ContextT } from "@/utils/types";
import {
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext<ContextT | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<(FirebaseUser & { name: string }) | null>(
    null
  );
  const [isAuthenticated, setAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  //logout
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (e) {
      return { success: false, msg: (e as Error).message };
    }
  };

  //signup
  const signUp = async (
    username: string,
    email: string,
    password: string
  ): Promise<AuthActionResponseT> => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        userId: res.user.uid,
      });

      return { success: true, data: res.user };
    } catch (e) {
      return { success: false, msg: (e as Error).message };
    }
  };

  //signin
  const signIn = async (
    email: string,
    password: string
  ): Promise<AuthActionResponseT> => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, data: res.user };
    } catch (e) {
      console.log(e);
      return { success: false, msg: (e as Error).message };
    }
  };

  useEffect(() => {
    //onAuthstatechange
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthenticated(true);
        const name = await userData(user.uid);
        setUser({ ...user, name });
      } else {
        setAuthenticated(false);
        setUser(null);
      }
    });

    const userData = async (uid: string) => {
      const data = await getDoc(doc(db, "users", uid));
      return data.data()?.username;
    };

    return unsub;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, logout, signUp, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
