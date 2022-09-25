import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, signOutUser } from 'features/auth/authSlice';

export default function SignedInMenu() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(selectAuthState);

  function handleSignOut() {
    dispatch(signOutUser());
    history.push('/');
  }

  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUser.photoURL || '/assets/user.png'}
      />
      <Dropdown pointing="top left" text={currentUser.email}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="Create Event"
            icon="plus"
          />
          <Dropdown.Item text="My profile" icon="user" />
          <Dropdown.Item onClick={handleSignOut} text="Sign out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
