import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from 'app/config/firebase';
import { setUserProfileData } from './firestoreService';

export const signInWithEmail = (creds) =>
  signInWithEmailAndPassword(auth, creds.email, creds.password);

export const signOutFirebase = () => signOut(auth);

export const signUpInFirebase = async (creds) => {
  try {
    await createUserWithEmailAndPassword(auth, creds.email, creds.password);

    await updateProfile(auth.currentUser, {
      displayName: creds.displayName,
    });

    return setUserProfileData(auth.currentUser);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
