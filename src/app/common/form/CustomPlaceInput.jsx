import { FormField, Label, List, Segment } from 'semantic-ui-react';
import { useField } from 'formik';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export default function CustomPlaceInput({ options, ...props }) {
  const [field, meta, helpers] = useField(props);

  function handleChange(address) {
    helpers.setValue({ address });
  }

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

  function handleBlur(e) {
    field.onBlur(e);
    if (!field.value.latLng) helpers.setValue({ address: '', latLng: null });
  }

  return (
    <PlacesAutocomplete
      value={field.value.address}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={options}
      shouldFetchSuggestions={field.value.address.length >= 2}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <FormField error={meta.touched && !!meta.error}>
          <input
            {...getInputProps({
              name: field.name,
              onBlur: handleBlur,
              ...props,
            })}
          />
          {meta.touched && meta.error && (
            <Label basic color="red" pointing>
              {meta.error.address}
            </Label>
          )}

          {suggestions?.length > 0 && (
            <Segment
              loading={loading}
              style={{
                marginTop: 0,
                position: 'absolute',
                zIndex: 1000,
                width: '100%',
              }}
            >
              <List selection>
                {suggestions.map((suggestion) => (
                  <List.Item
                    {...getSuggestionItemProps(suggestion)}
                    key={suggestion.placeId}
                  >
                    <List.Header>
                      {suggestion.formattedSuggestion.mainText}
                    </List.Header>
                    <List.Description>
                      {suggestion.formattedSuggestion.secondaryText}
                    </List.Description>
                  </List.Item>
                ))}
              </List>
            </Segment>
          )}
        </FormField>
      )}
    </PlacesAutocomplete>
  );
}
