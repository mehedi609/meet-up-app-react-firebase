import { NavLink, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import SignedOutMenu from 'features/nav/SignedOutMenu';
import SignedInMenu from 'features/nav/SignedInMenu';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../auth/authSlice';

export default function NavBar() {
  // const history = useHistory();
  // const [authenticated, setAuthenticated] = useState(false);
  const { authenticated } = useSelector(selectAuthState);

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 15 }} />
          Meet-UP
        </Menu.Item>
        <Menu.Item as={NavLink} exact to="/events" name="Events" />
        <Menu.Item as={NavLink} exact to="/sandbox" name="Sandbox" />
        {authenticated && (
          <Menu.Item as={NavLink} exact to="/createEvent">
            <Button positive inverted content="Create Event" />
          </Menu.Item>
        )}
        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
}
