import { FormField, Label } from 'semantic-ui-react';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';

export default function CustomDateInput({ label, ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <DatePicker
        {...field}
        {...props}
        selected={field.value ? new Date(field.value) : null}
        onChange={(date) => setFieldValue(field.name, date)}
      />
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
