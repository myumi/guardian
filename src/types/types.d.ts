/// <reference types="guardian" />

declare namespace Guardian {
  export interface Dragon {
    name: string;
    primary: number;
    secondary: number;
    tertiary: number;
  };
  
  export interface Match {
    mother: Dragon;
    father: Dragon;
    chance: number;
  };
}