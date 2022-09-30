import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { listenToEventsFromFirestore } from 'app/firebase/firestoreService';
import EventListItemPlaceholder from 'features/events/eventDashboard/EventListItemPlaceholder';
import EventList from 'features/events/eventDashboard/EventList';
import EventFilters from 'features/events/eventDashboard/EventFilters';
import { listenToEvents, selectEventState } from 'features/events/eventSlice';
import { selectAsyncState } from 'app/async/asyncSlice';
import useFirestoreCollection from 'app/hooks/useFirestoreCollection';

export default function EventDashboard() {
  const dispatch = useDispatch();
  const events = useSelector(selectEventState);
  const { loading } = useSelector(selectAsyncState);

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch],
  });

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
