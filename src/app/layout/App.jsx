import { Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NavBar from 'features/nav/Navbar';
import EventDashboard from 'features/events/eventDashboard/EventDashboard';
import HomePage from 'features/home/HopePage';
import EventDetailedPage from 'features/events/eventDetailed/EventDetailedPage';
import EventForm from 'features/events/eventForm/EventForm';
import Sandbox from 'features/sandbox/Sandbox';

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route exact path="/events" component={EventDashboard} />
              <Route exact path="/events/:id" component={EventDetailedPage} />
              <Route
                exact
                path={['/createEvent', '/manage/:id']}
                component={EventForm}
                key={location.key}
              />
              <Route exact path="/sandbox" component={Sandbox} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
