import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Button, Icon, Item, Label, List, Segment } from 'semantic-ui-react';
import EventListAttendee from 'features/events/eventDashboard/EventListAttendee';
import { config } from 'app/config';
import { deleteEventInFirestore } from 'app/firebase/firestoreService';

export default function EventListItem({ event }) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description>Hosted by {event.hostedBy}</Item.Description>
              {event.isCancelled && (
                <Label
                  style={{ top: '-40px' }}
                  ribbon="right"
                  color="red"
                  content="This event has been cancelled"
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(event.date, config.DATE.DATE_FORMAT)}
          <Icon name="marker" /> {event.venue.address}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees &&
            event.attendees.map((attendee) => (
              <EventListAttendee key={attendee.id} attendee={attendee} />
            ))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        <Button
          color="red"
          floated="right"
          content="Delete"
          onClick={async () => await deleteEventInFirestore(event.id)}
        />
        <Button
          color="teal"
          floated="right"
          content="View"
          as={Link}
          to={`/events/${event.id}`}
        />
      </Segment>
    </Segment.Group>
  );
}
