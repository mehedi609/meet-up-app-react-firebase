import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from 'app/config/firebase';

const db = getFirestore(app);
const auth = getAuth(app);
