/// <reference path="types.d.ts" />

import { Dragon } from 'guardian';

export const INITAL_DRAGON: Dragon = {
  name: '',
  primary: -1,
  secondary: -1,
  tertiary: -1,
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