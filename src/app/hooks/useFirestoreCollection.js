import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../async/asyncSlice';
import { dataFromSnapshot } from '../firebase/firestoreService';
import { onSnapshot } from 'firebase/firestore';

export default function useFirestoreCollection({ query, data, deps }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = onSnapshot(query(), {
      next: (snapshot) => {
        const docs = snapshot.docs.map((docSnapshot) =>
          dataFromSnapshot(docSnapshot),
        );
        data(docs);
        dispatch(asyncActionFinish());
      },
      error: (err) => {
        console.log('Error getting documents: ', err);
        dispatch(asyncActionError(err));
      },
    });

    return () => unsubscribe();
  }, deps); // eslint-disable-line  react-hooks/exhaustive-deps
}
