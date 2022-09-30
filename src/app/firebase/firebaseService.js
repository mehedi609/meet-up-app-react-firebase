import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'app/config/firebase';

export const signInWithEmail = (creds) =>
  signInWithEmailAndPassword(auth, creds.email, creds.password);
