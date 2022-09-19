import { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { sampleData } from 'api/sample-data';
import EventForm from 'features/events/eventForm/EventForm';

export default function EventDashboard({
  formOpen,
  setFormOpen,
  selectEvent,
  selectedEvent,
}) {
  const [events, setEvents] = useState(sampleData);

  function handleCreateEvent(newEvent) {
    setEvents([...events, newEvent]);
  }

  function handleUpdateEvent(updatedEvent) {
    setEvents(
      events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt)),
    );
  }

  function handleDeleteEvent(eventId) {
    setEvents(events.filter((evt) => evt.id !== eventId));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          selectEvent={selectEvent}
          deleteEvent={handleDeleteEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            setFormOpen={setFormOpen}
            setEvents={setEvents}
            createEvent={handleCreateEvent}
            updateEvent={handleUpdateEvent}
            selectedEvent={selectedEvent}
            key={selectedEvent ? selectedEvent.id : null}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
