import { Button, Header, Segment } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createEvent,
  selectEvent,
  updateEvent,
} from 'features/events/eventSlice';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from 'app/common/form/CustomTextInput';
import CustomTextArea from '../../../app/common/form/CustomTextArea';
import CustomSelectInput from '../../../app/common/form/CustomSelectInput';
import { categoryOptions } from '../../../app/api/categoryOptions';

export default function EventForm({ match, history }) {
  const selectedEvent = useSelector(selectEvent).find(
    (evt) => evt.id === match.params.id,
  );
  const dispatch = useDispatch();

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  };

  function handleFormSubmit(values) {
    selectedEvent
      ? dispatch(updateEvent({ ...selectedEvent, ...values }))
      : dispatch(
          createEvent({
            ...values,
            id: cuid(),
            hostedBy: 'Bob',
            attendees: [],
            hostPhotoURL: '/assets/user.png',
          }),
        );
    history.push('/events');
  }

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required('You must provide a description'),
    city: Yup.string().required('Please provide a city'),
    venue: Yup.string().required('Please provide a venue'),
    date: Yup.string().required('Please provide a date'),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        <Form className="ui form">
          <Header sub color="teal" content="Event Details" />
          <CustomTextInput name="title" placeholder="Event title" />
          <CustomSelectInput
            name="category"
            placeholder="Select a Category"
            options={categoryOptions}
          />
          <CustomTextArea
            name="description"
            placeholder="Description"
            rows={4}
          />

          <Header sub color="teal" content="Event Location Details" />
          <CustomTextInput name="city" placeholder="City" />
          <CustomTextInput name="venue" placeholder="Venue" />
          <CustomTextInput name="date" placeholder="Date" type="date" />

          <Button type="submit" floated="right" positive content="Submit" />
          <Button
            as={Link}
            to="/events"
            type="submit"
            floated="right"
            content="Cancel"
          />
        </Form>
      </Formik>
    </Segment>
  );
}
