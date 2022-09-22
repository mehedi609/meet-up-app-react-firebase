import EventListItem from 'features/events/eventDashboard/EventListItem';

export default function EventList({ events }) {
  return (
    <>
      {events.map((event) => (
        <EventListItem event={event} key={event.id} />
      ))}
    </>
  );
}
