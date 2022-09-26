import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from 'features/events/eventDetailed/EventDetailedHeader';
import EventDetailedInfo from 'features/events/eventDetailed/EventDetailedInfo';
import EventDetailedChat from 'features/events/eventDetailed/EventDetailedChat';
import EventDetailedSidebar from 'features/events/eventDetailed/EventDetailedSidebar';
import { useSelector } from 'react-redux';
import { selectEventState } from 'features/events/eventSlice';

export default function EventDetailedPage({ match }) {
  const event = useSelector(selectEventState).find(
    (evt) => evt.id === match.params.id,
  );

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
