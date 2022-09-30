import ModalWrapper from 'app/common/modals/ModalWrapper';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Button, Divider, Label } from 'semantic-ui-react';
import CustomTextInput from 'app/common/form/CustomTextInput';
import { useDispatch } from 'react-redux';
import { closeModal } from 'app/common/modals/modalSlice';
import { signUpInFirebase } from 'app/firebase/firebaseService';
import SocialLogin from 'features/auth/SocialLogin';

export default function RegisterForm() {
  const dispatch = useDispatch();

  const initialValues = { email: '', password: 'password', displayName: '' };
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    displayName: Yup.string().required(),
  });

  return (
    <ModalWrapper header="Sign Up to Meet-Up" size="small">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signUpInFirebase(values);
            dispatch(closeModal());
          } catch (e) {
            // console.log({ code: e.code, message: e.message });
            if (e.code && e.code.includes('auth/')) {
              const message = e.code.slice(5).split('-').join(' ');
              console.log(message);
              setErrors({ auth: message });
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
            <CustomTextInput
              name="displayName"
              placeholder="Enter your displayName"
            />
            <CustomTextInput
              name="email"
              placeholder="Enter valid email address"
            />
            <CustomTextInput
              name="password"
              placeholder="Enter your password"
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
              content="Register"
            />

            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
