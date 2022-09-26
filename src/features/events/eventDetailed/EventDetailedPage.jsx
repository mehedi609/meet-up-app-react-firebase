import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import useFirestoreDoc from 'app/hooks/useFirestoreDoc';
import EventDetailedHeader from 'features/events/eventDetailed/EventDetailedHeader';
import EventDetailedInfo from 'features/events/eventDetailed/EventDetailedInfo';
import EventDetailedChat from 'features/events/eventDetailed/EventDetailedChat';
import EventDetailedSidebar from 'features/events/eventDetailed/EventDetailedSidebar';
import { listenToEvent, selectEventState } from 'features/events/eventSlice';
import { listenToEventFromFirestore } from 'app/firebase/firestoreService';
import { selectAsyncState } from 'app/async/asyncSlice';
import LoadingComponent from 'app/layout/LoadingComponent';

export default function EventDetailedPage({ match }) {
  const dispatch = useDispatch();
  const event = useSelector(selectEventState).find(
    (evt) => evt.id === match.params.id,
  );
  const { loading, error } = useSelector(selectAsyncState);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvent(event)),
    deps: [dispatch, match.params.id],
  });

  if (loading || (!event && !error))
    return <LoadingComponent content="Loading event..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
}
