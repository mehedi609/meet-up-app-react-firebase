import { Button, Menu } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { openModal } from 'app/common/modals/modalSlice';
import { config } from 'app/config';

export default function SignedOutMenu() {
  const dispatch = useDispatch();

  return (
    <Menu.Item position="right">
      <Button
        basic
        inverted
        content="Login"
        onClick={() =>
          dispatch(openModal({ modalType: config.MODAL.LOGIN_MODAL }))
        }
      />
      <Button
        basic
        inverted
        content="Register"
        style={{ marginLeft: '0.5em' }}
        onClick={() =>
          dispatch(openModal({ modalType: config.MODAL.REGISTER_MODAL }))
        }
      />
    </Menu.Item>
  );
}
