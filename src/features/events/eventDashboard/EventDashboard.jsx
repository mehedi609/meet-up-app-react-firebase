import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { selectEvent } from 'features/events/eventSlice';

export default function EventDashboard() {
  const events = useSelector(selectEvent);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  );
}
