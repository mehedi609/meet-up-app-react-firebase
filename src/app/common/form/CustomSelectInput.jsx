import { FormField, Label, Select } from 'semantic-ui-react';
import { ErrorMessage, useField } from 'formik';

export default function CustomSelectInput({ label, ...props }) {
  const [field, meta, helpers] = useField(props);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
        clearable
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
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
