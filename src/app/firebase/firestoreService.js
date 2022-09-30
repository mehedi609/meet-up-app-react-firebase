import {
  getFirestore,
  collection,
  Timestamp,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  query,
  orderBy,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
import { app } from 'app/config/firebase';
import cuid from 'cuid';

const db = getFirestore(app);
// const auth = getAuth(app);

export const eventsRef = collection(db, 'events');
export const usersRef = collection(db, 'users');

export const dataFromSnapshot = (snapshot) => {
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
};

export const listenToEventsFromFirestore = () =>
  query(eventsRef, orderBy('date'));

export const listenToEventFromFirestore = (eventId) => doc(eventsRef, eventId);

export const addEventToFirestore = (event) =>
  addDoc(eventsRef, {
    ...event,
    hostedBy: 'Diana',
    hostPhotoURL: 'https://randomuser.me/api/portraits/women/20.jpg',
    attendees: arrayUnion({
      id: cuid(),
      displayName: 'Diana',
      photoURL: 'https://randomuser.me/api/portraits/women/20.jpg',
    }),
  });

export const updateEventInFirestore = (event) => {
  return updateDoc(doc(eventsRef, event.id), event);
};

export const deleteEventInFirestore = (eventId) =>
  deleteDoc(doc(eventsRef, eventId));

export const cancelEventToggle = (event) =>
  updateDoc(doc(eventsRef, event.id), { isCancelled: !event.isCancelled });

export const setUserProfileData = (user) =>
  setDoc(doc(usersRef, user.uid), {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL || null,
    createdAt: serverTimestamp(),
  });
