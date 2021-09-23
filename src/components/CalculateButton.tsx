import { useDispatch } from 'react-redux';
import store from '../store/store';

export default function AddParentButton() {
  const dispatch = useDispatch();
  const state: any = store.getState();
  const child = state.child.childColors;

  return (
    <button onClick={() => dispatch({ type: 'matchingmaking/calculate', payload: child })}>Calculate Parents</button>
  );
}