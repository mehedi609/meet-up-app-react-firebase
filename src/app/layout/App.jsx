import { useState } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NavBar from 'features/nav/Navbar';
import EventDashboard from 'features/events/eventDashboard/EventDashboard';
import HomePage from 'features/home/HopePage';
import EventDetailedPage from 'features/events/eventDetailed/EventDetailedPage';
import EventForm from 'features/events/eventForm/EventForm';

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
        <Route exact path="/" component={HomePage} />
        <Route exact path="/events" component={EventDashboard} />
        <Route exact path="/events/:id" component={EventDetailedPage} />
        <Route exact path="/createEvent" component={EventForm} />
      </Container>
    </>
  );
}

export default App;
