import { useState } from 'react';
import NavBar from 'features/nav/Navbar';
import { Container } from 'semantic-ui-react';
import EventDashboard from 'features/events/eventDashboard/EventDashboard';

function App() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <NavBar setFormOpen={setFormOpen} />
      <Container className="main">
        <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} />
      </Container>
    </>
  );
}

export default App;
