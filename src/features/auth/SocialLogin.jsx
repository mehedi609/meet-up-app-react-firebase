import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'app/common/modals/modalSlice';
import { socialLogin } from 'app/firebase/firebaseService';
import { config } from 'app/config';

export default function SocialLogin() {
  const dispatch = useDispatch();

  async function handleSocialLogin(provider) {
    dispatch(closeModal());
    await socialLogin(provider);
  }

  return (
    <>
      <Button
        icon="facebook"
        fluid
        color="facebook"
        style={{ marginBottom: 10 }}
        content="Login with Facebook"
      />
      <Button
        icon="google"
        fluid
        color="google plus"
        content="Login with Google"
        onClick={() => handleSocialLogin(config.SOCIAL_LOGIN.GOOGLE)}
      />
    </>
  );
}
