import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { auth } from 'app/config/firebase';
import { setUserProfileData } from 'app/firebase/firestoreService';
import { config } from 'app/config';
import { toast } from 'react-toastify';

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

export const socialLogin = async (selectedProvider) => {
  let provider;

  if (selectedProvider === config.SOCIAL_LOGIN.GOOGLE) {
    provider = new GoogleAuthProvider();
  } else if (selectedProvider === config.SOCIAL_LOGIN.FACEBOOK) {
    provider = new FacebookAuthProvider();
  }

  try {
    const result = await signInWithPopup(auth, provider);

    console.log(result);

    if (result._tokenResponse.isNewUser) {
      await setUserProfileData(result.user);
    }
  } catch (e) {
    console.log(e);
    toast.error(e.message);
  }
};
