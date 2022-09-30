import ModalWrapper from 'app/common/modals/ModalWrapper';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Button, Divider, Label } from 'semantic-ui-react';
import CustomTextInput from 'app/common/form/CustomTextInput';
import { useDispatch } from 'react-redux';
import { closeModal } from 'app/common/modals/modalSlice';
import { signInWithEmail } from 'app/firebase/firebaseService';
import SocialLogin from 'features/auth/SocialLogin';

export default function LoginForm() {
  const dispatch = useDispatch();

  const initialValues = { email: '', password: 'password' };
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  return (
    <ModalWrapper header="Sign in to Meet-Up" size="small">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signInWithEmail(values);
            dispatch(closeModal());
          } catch (e) {
            console.log(e);
            if (e.code && e.code.includes('auth/')) {
              setErrors({ auth: 'invalid email and password' });
            } else {
              setErrors({ auth: 'Something went wrong' });
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ dirty, isSubmitting, isValid, errors }) => (
          <Form className="ui form">
            <CustomTextInput name="email" placeholder="Email Address" />
            <CustomTextInput
              name="password"
              placeholder="Password"
              type="password"
            />
            {errors.auth && (
              <Label
                basic
                color="red"
                style={{ marginBottom: 10 }}
                content={errors.auth}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Login"
            />

            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
