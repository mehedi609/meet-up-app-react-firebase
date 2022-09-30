import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from 'app/config/firebase';

export const signInWithEmail = (creds) =>
  signInWithEmailAndPassword(auth, creds.email, creds.password);

export const signOutFirebase = () => signOut(auth);

export const signUpInFirebase = async (creds) => {
  try {
    await createUserWithEmailAndPassword(auth, creds.email, creds.password);

    await updateProfile(auth.currentUser, {
      displayName: creds.displayName,
    });
  } catch (e) {
    throw e;
  }
};
