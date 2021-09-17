import Action from '../../store/action';
import { ColorInterface, getSpanBetweenColors } from '../../modules/ColorWheel';
import Dragon from '../../components/Dragon';
import ColorProbability from '../../components/ColorProbability';
import { moveEmitHelpers } from 'typescript';

interface Dragon {
  name: string;
  primary: number;
  secondary: number;
  tertiary: number;
}

interface Match {
  mother: Dragon;
  father: Dragon;
  chance: number;
}

export interface RootState {
  mothers: Array<Dragon>;
  fathers: Array<Dragon>;
  child: Dragon;
  bestMatches: Array<Array<Dragon>>;
  bestXMatch: Array<Dragon>;
  bestYMatch: Array<Dragon>;
  bestZMatch: Array<Dragon>;
  bestXYMatch: Array<Dragon>;
  bestYZMatch: Array<Dragon>;
  bestXZMatch: Array<Dragon>;
}

const initalState: RootState = {
  mothers: [] as Array<Dragon>,
  fathers: [] as Array<Dragon>,
  child: {} as Dragon,
  bestMatches: [] as Array<Array<Dragon>>,
  bestXMatch: [] as Array<Dragon>,
  bestYMatch: [] as Array<Dragon>,
  bestZMatch: [] as Array<Dragon>,
  bestXYMatch: [] as Array<Dragon>,
  bestYZMatch: [] as Array<Dragon>,
  bestXZMatch: [] as Array<Dragon>,
}

export default function matchmakingReducer(state: RootState = initalState, action: Action) {
  switch (action.type) {
    case 'matchingmaking/calculate':
      const results = calculateAllParentProbability(state.mothers, state.fathers, state.child)
      return {
        ...state,
        ...results,
      };
    case 'matchmaking/addMother':
      return {
        ...state,
        mothers: state.mothers.push(action.payload),
      };
    case 'matchmaking/addFather':
      return {
        ...state,
        fathers: state.fathers.push(action.payload),
      };
    case 'matchmaking/removeMother':
      let motherIndex = state.mothers.indexOf(action.payload);
      if (motherIndex) {
        const newMothers = state.mothers.splice(motherIndex, 1);

        return {
          ...state,
          mothers: [...newMothers],
        };
      }
      return state;
    case 'matchmaking/removeFather':
      const fatherIndex = state.fathers.indexOf(action.payload);
      if (fatherIndex) {
        const newMothers = state.mothers.splice(fatherIndex, 1);

        return {
          ...state,
          mothers: [...newMothers],
        };
      }
      return state;
    default:
      return state;
  }
}

function calculateAllParentProbability(mothers: Array<Dragon>, fathers: Array<Dragon>, child: Dragon): Object {
  let bestMatches: Array<Match> = [];
  let bestXYMatches: Array<Match> = [];
  let bestYZMatches: Array<Match> = [];
  let bestXZMatches: Array<Match> = [];
  let bestXMatches: Array<Match> = [];
  let bestYMatches: Array<Match> = [];
  let bestZMatches: Array<Match> = [];

  // nested for loop??
  mothers.forEach(mother => {
    fathers.forEach(father => {
      const x = getSpanBetweenColors(mother.primary, father.primary);
      const y = getSpanBetweenColors(mother.secondary, father.secondary);
      const z = getSpanBetweenColors(mother.tertiary, father.tertiary);
      const chanceOfX = calculateColorProbability(x, child.primary);
      const chanceOfY = calculateColorProbability(y, child.secondary);
      const chanceOfZ = calculateColorProbability(z, child.tertiary);

      // only push to array if probability is not zero
      if (chanceOfX) {
        // push to x matches
        bestXMatches.push({mother, father, chance: chanceOfX});

        // push to xy matches
        if (chanceOfY) {
          bestXYMatches.push({mother, father, chance: chanceOfX * chanceOfY});

          // has all chances, push to matches
          if (chanceOfZ) {
            bestMatches.push({mother, father, chance: chanceOfX * chanceOfY * chanceOfZ})
          }
        }
        // push to xz matches
        if (chanceOfZ) {
          bestXZMatches.push({mother, father, chance: chanceOfX * chanceOfZ});
        }
      }
      if (chanceOfY) {
        // push to y matches
        bestYMatches.push({mother, father, chance: chanceOfY});

        if (chanceOfZ) {
          // push to yz matches
          bestYZMatches.push({mother, father, chance: chanceOfY * chanceOfZ});
        }
      }
      if (chanceOfZ) {
        // push to z matches
        bestZMatches.push({mother, father, chance: chanceOfZ});
      }
    });
  });

  return {
    bestMatches: getTopThree(bestMatches),
    bestXYMatches: getTopThree(bestXYMatches),
    bestYZMatches: getTopThree(bestYZMatches),
    bestXZMatches: getTopThree(bestXZMatches),
    bestXMatches: getTopThree(bestXMatches),
    bestYMatches: getTopThree(bestYMatches),
    bestZMatches: getTopThree(bestZMatches),
  };
}

// find the chance of the certain color being in the span
function calculateColorProbability(span: Array<ColorInterface>, desiredColor: number): number {
  // check if color does not exist in span
  if (!span.some(item => item.value! === desiredColor)) {
    return 0;
  }
  // else return 1 / array.length
  return 1 / span.length;
}

// sort and splice the match arrays 
function getTopThree(array: Array<Match>): Array<Match> {
  // sort array by chance (descending)
  array.sort((a: Match, b: Match) =>  b.chance - a.chance);

  if (array.length >= 3) {
    // trim off all but first three
    array.length = 3;
  }

  return array;
}