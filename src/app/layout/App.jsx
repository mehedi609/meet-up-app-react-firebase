import { Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import NavBar from 'features/nav/Navbar';
import EventDashboard from 'features/events/eventDashboard/EventDashboard';
import HomePage from 'features/home/HopePage';
import EventDetailedPage from 'features/events/eventDetailed/EventDetailedPage';
import EventForm from 'features/events/eventForm/EventForm';
import Sandbox from 'features/sandbox/Sandbox';
import ModalManager from 'app/common/modals/ModalManager';
import ErrorComponent from 'app/common/errors/ErrorComponent';

function App() {
  const location = useLocation();

  return (
    <>
      <ModalManager />
      <ToastContainer position="bottom-right" theme="dark" />
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
              <Route exact path="/error" component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
