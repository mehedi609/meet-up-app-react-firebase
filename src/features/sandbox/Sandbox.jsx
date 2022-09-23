import { useDispatch, useSelector } from 'react-redux';
import {
  decrement,
  increment,
  selectCounter,
} from 'features/sandbox/testSlice';
import { Button } from 'semantic-ui-react';
import { openModal } from 'app/common/modals/modalSlice';
import { config } from 'app/config';
import TestPlaceInput from './TestPlaceInput';
import TestMap from './TestMap';
import { useState } from 'react';
import { selectAsyncState } from 'app/async/asyncSlice';

export default function Sandbox() {
  const value = useSelector(selectCounter);
  const { loading } = useSelector(selectAsyncState);
  const [target, setTarget] = useState(null);

  const dispatch = useDispatch();
  const defaultProps = {
    center: {
      lat: Number(process.env.REACT_APP_DEFAULT_LAT),
      lng: Number(process.env.REACT_APP_DEFAULT_LNG),
    },
    zoom: Number(process.env.REACT_APP_DEFAULT_ZOOM),
  };
  const [location, setLocation] = useState(defaultProps);

  function handleSetLocation(latLng) {
    setLocation({ ...location, center: { lat: latLng.lat, lng: latLng.lng } });
  }

  return (
    <div>
      <h1>Testing 123</h1>s<h3>The data is: {value}</h3>
      <Button
        onClick={(e) => {
          dispatch(increment(10));
          setTarget(e.target.name);
        }}
        name="increment"
        content="Increment"
        color="green"
        loading={loading && target === 'increment'}
      />
      <Button
        onClick={(e) => {
          dispatch(decrement(5));
          setTarget(e.target.name);
        }}
        name="decrement"
        content="Decrement"
        color="red"
        loading={loading && target === 'decrement'}
      />
      <Button
        content="Open Modal"
        color="teal"
        onClick={() =>
          dispatch(
            openModal({
              modalType: config.MODAL.TEST_MODAL,
              modalProps: { data: value },
            }),
          )
        }
      />
      <div style={{ marTop: 20 }}>
        <TestPlaceInput setLocation={handleSetLocation} />
        <TestMap location={location} />
      </div>
    </div>
  );
}
