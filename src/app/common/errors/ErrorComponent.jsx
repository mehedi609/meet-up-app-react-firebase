import { useSelector } from 'react-redux';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { selectAsyncState } from 'app/async/asyncSlice';

export default function ErrorComponent() {
  const { error } = useSelector(selectAsyncState);

  return (
    <Segment placeholder>
      <Header
        textAlign="center"
        content={error?.message || 'Oops - we have an error'}
      />
      <Button
        as={Link}
        to="/events"
        primary
        style={{ marginTop: 20 }}
        content="Return to events page"
      />
    </Segment>
  );
}
