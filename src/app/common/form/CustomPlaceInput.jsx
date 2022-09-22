import { FormField, Label } from 'semantic-ui-react';
import { ErrorMessage, useField } from 'formik';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default function CustomPlaceInput({ label, options, ...props }) {
  const [field, meta, helpers] = useField(props);

  function handleSelect(address) {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log('Success', latLng);
        // setLocation(latLng);
        helpers.setValue({ address, latLng });
      })
      .catch((error) => helpers.setError(error));
  }

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <input {...field} {...props} />
      <ErrorMessage name={field.name}>
        {(errorMessage) => (
          <Label basic color="red" pointing>
            {errorMessage}
          </Label>
        )}
      </ErrorMessage>
    </FormField>
  );
}
