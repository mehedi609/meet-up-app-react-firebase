import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from 'features/events/eventDashboard/EventList';
import { selectEvent } from 'features/events/eventSlice';
import { selectAsyncState } from 'app/async/asyncSlice';
import EventListItemPlaceholder from 'features/events/eventDashboard/EventListItemPlaceholder';
import EventFilters from 'features/events/eventDashboard/EventFilters';

export default function EventDashboard() {
  const events = useSelector(selectEvent);
  const { loading } = useSelector(selectAsyncState);

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
