import { FormField, Label } from 'semantic-ui-react';
import { ErrorMessage, useField } from 'formik';

export default function CustomTextInput({ label, ...props }) {
  const [field, meta] = useField(props);

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
