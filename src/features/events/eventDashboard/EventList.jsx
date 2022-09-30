import EventListItem from 'features/events/eventDashboard/EventListItem';
import cuid from 'cuid';

export default function EventList({ events }) {
  return (
    <>
      {events.map((event) => (
        <EventListItem event={event} key={cuid()} />
      ))}
    </>
  );
}
