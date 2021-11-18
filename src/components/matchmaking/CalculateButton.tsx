import { useDispatch, useSelector } from 'react-redux';

export default function AddParentButton() {
  const dispatch = useDispatch();
  const child = useSelector((state: any) => state.dragons.child);
  const disabled = useSelector((state: any) => {
    const primary = state.dragons.child.colors.primary.value > -1;
    const secondary = state.dragons.child.colors.secondary.value > -1;
    const tertiary = state.dragons.child.colors.tertiary.value > -1;

    const hasParents = state.matchmaking.mothers.length && state.matchmaking.fathers.length;
    const hasColors = primary && secondary && tertiary;
    
    return !(hasParents && hasColors);
  });

  return (
    <button 
      className="matchmaking__button"
      disabled={disabled}
      onClick={() => dispatch({ type: 'matchingmaking/calculate', payload: child })}
    >
      Calculate Parents
    </button>
  );
}