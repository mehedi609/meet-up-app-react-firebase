import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onSnapshot } from 'firebase/firestore';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from 'app/async/asyncSlice';
import { dataFromSnapshot } from 'app/firebase/firestoreService';

export default function useFirestoreDoc({ query, data, deps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = onSnapshot(query(), {
      next: (snapshot) => {
        const doc = dataFromSnapshot(snapshot);
        if (doc) {
          data(doc);
          dispatch(asyncActionFinish());
        } else {
          dispatch(
            asyncActionError({
              code: 'not-found',
              message: 'Could not find document',
            }),
          );
        }
      },
      error: (err) => {
        console.log('Error getting documents: ', err);
        dispatch(asyncActionError(err));
      },
    });

    return () => unsubscribe();
  }, deps); // eslint-disable-line  react-hooks/exhaustive-deps
}
