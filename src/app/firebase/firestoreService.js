import { getFirestore, collection, Timestamp } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
import { app } from 'app/config/firebase';

const db = getFirestore(app);
// const auth = getAuth(app);

export const eventsCollectionRef = collection(db, 'events');

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists()) return undefined;
  const data = snapshot.data();
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }
  return {
    ...data,
    id: snapshot.id,
  };
}

export const listenToEventsFromFirestore = () => eventsCollectionRef;
