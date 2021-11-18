import { useDispatch, useSelector } from 'react-redux';
import store from '../../store/store';

interface AddParentButtonProps {
  id: 'mother' | 'father';
}

export default function AddParentButton({ id }: AddParentButtonProps) {
  const dispatch = useDispatch();
  const casedId = `${id[0].toUpperCase()}${id.slice(1)}`;
  const disabled = useSelector((state: any) =>  {
    const primary: boolean = state.dragons[id].colors.primary.value > -1;
    const secondary: boolean = state.dragons[id].colors.secondary.value > -1;
    const tertiary: boolean = state.dragons[id].colors.tertiary.value > -1;
    return !(primary && secondary && tertiary);
  });


  const handleClick = () => {
    const state: any = store.getState();

    // store parent details
    dispatch(
      {
        type: `matchmaking/add${casedId}`,
        payload: {
          name: state.dragons[id].name || 'Unnamed',
          colors: {
            primary: state.dragons[id].colors.primary,
            secondary: state.dragons[id].colors.secondary,
            tertiary: state.dragons[id].colors.tertiary,
          }
        }
      }
    );

    // clear the selected parents current colors
    dispatch({ type: `dragon/clear${casedId}` });
  }

  return (
    <button 
      className="matchmaking__button"
      disabled={disabled}
      onClick={handleClick}
    >
      Add {casedId}
    </button>
  );
}