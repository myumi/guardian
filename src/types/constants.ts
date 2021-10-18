/// <reference path="types.d.ts" />

import { Dragon } from 'guardian';

export const INITAL_DRAGON: Dragon = {
  name: '',
  colors: {
    primary: -1,
    secondary: -1,
    tertiary: -1,
  },
  genes: {
    primary: -1,
    secondary: -1,
    tertiary: -1,
  },
  sex: undefined,
  breed: undefined,
};

  // read like: plentiful against rare -> plentiful percentage
  export const RARITY_CHART = {
    plentiful: {
      plentiful: .5,
      common:  .7,
      uncommon: .85,
      limited: .97,
      rare: .99,
    },
    common: {
      plentiful: .3,
      common:  .5,
      uncommon: .75,
      limited: .9,
      rare: .99,
    },
    uncommon: {
      plentiful: .15,
      common:  .25,
      uncommon: .50,
      limited: .85,
      rare: .98,
    },
    limited: {
      plentiful: .03,
      common:  .1,
      uncommon: .15,
      limited: .5,
      rare: .97,
    },
    rare: {
      plentiful:  .01,
      common:  .01,
      uncommon: .02,
      limited: .03,
      rare: .5,
    },
  };

  export const MODERN_PRIMARY_GENES = {
    'Basic': 'plentiful',
    'Bar': 'uncommon', 
    'Cherub': 'uncommon', 
    'Clown': 'common', 
    'Crystal': 'rare', 
    'Fade': 'common', 
    'Falcon': 'common', 
    'Flaunt': 'uncommon', 
    'Giraffe': 'uncommon', 
    'Iridescent': 'rare', 
    'Jaguar': 'uncommon', 
    'Jupiter': 'uncommon', 
    'Laced': 'common', 
    'Leopard': 'common', 
    'Lionfish': 'uncommon', 
    'Metallic': 'rare', 
    'Mosaic': 'uncommon', 
    'Petals': 'rare', 
    'Piebald': 'common',
    'Pinstripe': 'limited', 
    'Poison': 'limited', 
    'Python': 'uncommon', 
    'Ribbon': 'common', 
    'Ripple': 'uncommon', 
    'Savannah': 'common', 
    'Skink': 'limited', 
    'Slime': 'limited', 
    'Speckle': 'common', 
    'Starmap': 'rare', 
    'Stitched': 'limited', 
    'Swirl': 'common', 
    'Tapir': 'common', 
    'Tiger': 'common', 
    'Vipera': 'uncommon', 
    'Wasp': 'rare',
  };