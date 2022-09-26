import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import {
  dataFromSnapshot,
  getEventsFromFirestore,
} from 'app/firebase/firestoreService';
import EventListItemPlaceholder from 'features/events/eventDashboard/EventListItemPlaceholder';
import EventList from 'features/events/eventDashboard/EventList';
import EventFilters from 'features/events/eventDashboard/EventFilters';
import { listenToEvents, selectEventState } from 'features/events/eventSlice';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
  selectAsyncState,
} from 'app/async/asyncSlice';

export default function EventDashboard() {
  const dispatch = useDispatch();
  const events = useSelector(selectEventState);
  const { loading } = useSelector(selectAsyncState);

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = getEventsFromFirestore({
      next: (snapshot) => {
        const events = snapshot.docs.map((docSnapshot) =>
          dataFromSnapshot(docSnapshot),
        );
        dispatch(listenToEvents(events));
        dispatch(asyncActionFinish());
      },
      error: (err) => {
        console.log('Error getting documents: ', err);
        dispatch(asyncActionError(err));
      },
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading ? (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        ) : (
          <EventList events={events} />
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
}
