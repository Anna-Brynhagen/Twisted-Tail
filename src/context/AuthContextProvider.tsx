import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  User,
  UserCredential,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { auth, usersCol } from '../services/firebase';
import { arrayUnion, doc, setDoc, updateDoc } from '@firebase/firestore';

interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setPhotoUrl: (url: string) => Promise<void>;
  setDisplayName: (name: string) => Promise<void>;
  setEmail: (email: string) => Promise<void>;
  setPassword: (password: string) => Promise<void>;
  userEmail: string | null;
  userName: string | null;
  userPhotoUrl: string | null;
  reloadUser: () => boolean;
  addHighscore: (score: number) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user || !user.uid) {
        throw new Error('User UID not available after signup.');
      }

      await setDoc(doc(usersCol, user.uid), {
        email: user.email || '',
        name: user.displayName || '',
        photo: user.photoURL || '',
        highscores: [],
      });

      console.log('User document successfully created in Firestore');
      return userCredential;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email, {
      url: window.location.origin + '/login',
    });
  };

  const setPhotoUrl = (photo: string) => {
    if (!currentUser) {
      throw new Error('You must be logged in to update your photo');
    }
    const docRef = doc(usersCol, currentUser.uid);
    updateDoc(docRef, {
      photo,
    });
    return updateProfile(currentUser, {
      photoURL: photo,
    });
  };

  const setDisplayName = (name: string) => {
    if (!currentUser) {
      throw new Error('You must be logged in to update your name');
    }
    const docRef = doc(usersCol, currentUser.uid);
    updateDoc(docRef, {
      name,
    });

    return updateProfile(currentUser, {
      displayName: name,
    });
  };

  const setEmail = (email: string) => {
    if (!currentUser) {
      throw new Error('You must be logged in to update your email');
    }
    const docRef = doc(usersCol, currentUser.uid);
    updateDoc(docRef, {
      email,
    });

    return updateEmail(currentUser, email);
  };

  const setPassword = (password: string) => {
    if (!currentUser) {
      throw new Error('You must be logged in to update your password');
    }
    return updatePassword(currentUser, password);
  };

  const addHighscore = async (score: number) => {
    if (!currentUser) {
      throw new Error('You must be logged in to view highscore');
    }

    const docRef = doc(usersCol, currentUser.uid);
    return updateDoc(docRef, {
      highscores: arrayUnion(score),
    });
  };

  const reloadUser = () => {
    if (!currentUser) {
      return false;
    }
    setUserName(currentUser.displayName);
    setUserEmail(currentUser.email);
    setUserPhotoUrl(currentUser.photoURL);

    return true;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setUserEmail(user.email);
        setUserName(user.displayName);
        setUserPhotoUrl(user.photoURL);
      } else {
        setUserEmail(null);
        setUserName(null);
        setUserPhotoUrl(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(currentUser);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        setPhotoUrl,
        setDisplayName,
        setEmail,
        setPassword,
        userEmail,
        userName,
        userPhotoUrl,
        reloadUser,
        addHighscore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
