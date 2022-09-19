import { useState } from 'react';
import NavBar from 'features/nav/Navbar';
import { Container } from 'semantic-ui-react';
import EventDashboard from 'features/events/eventDashboard/EventDashboard';

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  function handleSelectEvent(selectedEvent) {
    setSelectedEvent(selectedEvent);
    setFormOpen(true);
  }

  function handleCreateFormOpen() {
    setSelectedEvent(null);
    setFormOpen(true);
  }

  return (
    <>
      <NavBar setFormOpen={handleCreateFormOpen} />
      <Container className="main">
        <EventDashboard
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectedEvent={selectedEvent}
          selectEvent={handleSelectEvent}
        />
      </Container>
    </>
  );
}

export default App;
