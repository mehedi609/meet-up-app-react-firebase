/*global google*/
import { Button, Header, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listenToEvents, selectEventState } from 'features/events/eventSlice';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from 'app/common/form/CustomTextInput';
import CustomTextArea from 'app/common/form/CustomTextArea';
import CustomSelectInput from 'app/common/form/CustomSelectInput';
import { categoryOptions } from 'app/api/categoryOptions';
import CustomDateInput from 'app/common/form/CustomDateInput';
import { config } from 'app/config';
import CustomPlaceInput from 'app/common/form/CustomPlaceInput';
import useFirestoreDoc from 'app/hooks/useFirestoreDoc';
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from 'app/firebase/firestoreService';
import LoadingComponent from 'app/layout/LoadingComponent';
import { selectAsyncState } from 'app/async/asyncSlice';
import { toast } from 'react-toastify';

export default function EventForm({ match, history }) {
  const selectedEvent = useSelector(selectEventState).find(
    (evt) => evt.id === match.params.id,
  );
  const { loading, error } = useSelector(selectAsyncState);
  const dispatch = useDispatch();

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [dispatch, match.params.id],
    shouldExecute: !!match.params.id,
  });

  if (loading || (!selectedEvent && !error && !!match.params.id))
    return <LoadingComponent content="Loading event..." />;

  if (error) return <Redirect to="/error" />;

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: {
      address: '',
      latLng: null,
    },
    venue: {
      address: '',
      latLng: null,
    },
    date: '',
  };

  async function handleFormSubmit(values, setSubmitting) {
    try {
      selectedEvent
        ? await updateEventInFirestore(values)
        : await addEventToFirestore(values);
      history.push('/events');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required('You must provide a description'),
    city: Yup.object().shape({
      address: Yup.string().required('City is required'),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required('Venue is required'),
    }),
    date: Yup.string().required('Please provide a date'),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) =>
          await handleFormSubmit(values, setSubmitting)
        }
      >
        {({ isValid, dirty, isSubmitting, values }) => (
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
            <CustomPlaceInput name="city" placeholder="City" />
            <CustomPlaceInput
              name="venue"
              placeholder="Venue"
              disabled={!values.city.latLng}
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 2000,
                types: ['establishment'],
              }}
            />
            <CustomDateInput
              name="date"
              placeholderText="Click to select a date"
              showTimeSelect
              dateFormat={config.DATE.DATE_FORMAT}
            />
            {selectedEvent && (
              <Button
                type="button"
                floated="left"
                color={selectedEvent.isCancelled ? 'green' : 'red'}
                content={
                  selectedEvent.isCancelled
                    ? 'Reactivate event'
                    : 'Cancel Event'
                }
                onClick={() => cancelEventToggle(selectedEvent)}
              />
            )}

            <Button
              type="submit"
              floated="right"
              positive
              content="Submit"
              loading={isSubmitting}
              disabled={!dirty || !isValid || isSubmitting}
            />
            <Button
              as={Link}
              to="/events"
              type="submit"
              floated="right"
              content="Cancel"
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
