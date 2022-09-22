import ModalWrapper from 'app/common/modals/ModalWrapper';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Button } from 'semantic-ui-react';
import CustomTextInput from 'app/common/form/CustomTextInput';
import { useDispatch } from 'react-redux';
import { signInUser } from 'features/auth/authSlice';
import { closeModal } from 'app/common/modals/modalSlice';

export default function LoginForm() {
  const dispatch = useDispatch();

  const initialValues = { email: '', password: '' };
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  return (
    <ModalWrapper header="Sign in to Meet-Up" size="small">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(signInUser(values));
          setSubmitting(false);
          dispatch(closeModal());
        }}
      >
        {({ dirty, isSubmitting, isValid }) => (
          <Form className="ui form">
            <CustomTextInput name="email" placeholder="Email Address" />
            <CustomTextInput
              name="password"
              placeholder="Password"
              type="password"
            />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Login"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
