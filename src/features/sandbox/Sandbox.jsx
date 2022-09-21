import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, selectCounter } from './testSlice';
import { Button } from 'semantic-ui-react';

export default function Sandbox() {
  const  value  = useSelector(selectCounter);
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
    </div>
  );
}
