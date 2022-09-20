import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { deleteEvent, eventState } from '../eventSlice';

export default function EventDashboard() {
  const events = useSelector(eventState);
  const dispatch = useDispatch();

  // function handleCreateEvent(newEvent) {
  //   setEvents([...events, newEvent]);
  // }
  //
  // function handleUpdateEvent(updatedEvent) {
  //   setEvents(
  //     events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt)),
  //   );
  // }

  function handleDeleteEvent(eventId) {
    dispatch(deleteEvent(eventId));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} deleteEvent={handleDeleteEvent} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  );
}
