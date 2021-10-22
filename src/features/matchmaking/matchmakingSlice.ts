import { Dragon, Match } from 'guardian';
import { ColorInterface } from '../../modules/types/types';
import { getSpanBetweenColors } from '../../modules/ColorWheel';
interface Action {
  type: string,
  payload: Dragon,
}
export interface RootState {
  mothers: Array<Dragon>;
  fathers: Array<Dragon>;
  bestMatches: Array<Dragon>;
  bestXMatches: Array<Dragon>;
  bestYMatches: Array<Dragon>;
  bestZMatches: Array<Dragon>;
  bestXYMatches: Array<Dragon>;
  bestYZMatches: Array<Dragon>;
  bestXZMatches: Array<Dragon>;
};

const initalState: RootState = {
  mothers: [] as Array<Dragon>,
  fathers: [] as Array<Dragon>,
  bestMatches: [] as Array<Dragon>,
  bestXMatches: [] as Array<Dragon>,
  bestYMatches: [] as Array<Dragon>,
  bestZMatches: [] as Array<Dragon>,
  bestXYMatches: [] as Array<Dragon>,
  bestYZMatches: [] as Array<Dragon>,
  bestXZMatches: [] as Array<Dragon>,
};

export default function matchmakingReducer(state: RootState = initalState, action: Action) {
  let newMothers = [...state.mothers];
  let newFathers = [...state.fathers];

  switch (action.type) {
    case 'matchingmaking/calculate':
      const results = calculateAllParentProbability(state.mothers, state.fathers, action.payload);
      return {
        ...state,
        ...results,
      };
    case 'matchmaking/addMother':
      newMothers.push(action.payload);
      return {
        ...state,
        mothers: [...newMothers],
      };
    case 'matchmaking/addFather':
      newFathers.push(action.payload);
      return {
        ...state,
        fathers: [...newFathers],
      };
    case 'matchmaking/removeMother':
      let motherIndex = state.mothers.indexOf(action.payload);
      if (motherIndex) {
        newMothers = state.mothers.splice(motherIndex, 1);

        return {
          ...state,
          mothers: [...newMothers],
        };
      }
      return state;
    case 'matchmaking/removeFather':
      const fatherIndex = state.fathers.indexOf(action.payload);
      if (fatherIndex) {
        newFathers = state.fathers.splice(fatherIndex, 1);

        return {
          ...state,
          fathers: [...newFathers],
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
      const x = getSpanBetweenColors(mother.colors.primary, father.colors.primary);
      const y = getSpanBetweenColors(mother.colors.secondary, father.colors.secondary);
      const z = getSpanBetweenColors(mother.colors.tertiary, father.colors.tertiary);
      const chanceOfX = calculateColorProbability(x, child.colors.primary.value);
      const chanceOfY = calculateColorProbability(y, child.colors.secondary.value);
      const chanceOfZ = calculateColorProbability(z, child.colors.tertiary.value);

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