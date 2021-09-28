import { useDispatch } from 'react-redux';
import store from '../store/store';

interface AddParentButtonProps {
  id: 'mother' | 'father';
}

export default function AddParentButton({ id }: AddParentButtonProps) {
  const dispatch = useDispatch();
  const casedId = `${id[0].toUpperCase()}${id.slice(1)}`;

  const handleClick = () => {
    const state: any = store.getState();

    // store parent details
    dispatch(
      {
        type: `matchmaking/add${casedId}`,
        payload: {
          name: state.dragons[id].name|| 'Unnamed',
          primary: state.dragons[id].primary,
          secondary: state.dragons[id].secondary,
          tertiary: state.dragons[id].tertiary,
        }
      }
    );

    // clear the selected parents current colors
    dispatch({ type: `dragon/clear${casedId}` });
  }

  return (
    <button onClick={handleClick}>Add {casedId}</button>
  );
}