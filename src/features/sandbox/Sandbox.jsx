import { useDispatch, useSelector } from 'react-redux';
import {
  decrement,
  increment,
  selectCounter,
} from 'features/sandbox/testSlice';
import { Button } from 'semantic-ui-react';
import { openModal } from 'app/common/modals/modalSlice';
import { config } from '../../app/config';

export default function Sandbox() {
  const value = useSelector(selectCounter);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Testing 123</h1>
      <h3>The data is: {value}</h3>
      <Button
        onClick={() => dispatch(increment(10))}
        content="Increment"
        color="green"
      />
      <Button
        onClick={() => dispatch(decrement(5))}
        content="Decrement"
        color="red"
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
    </div>
  );
}
