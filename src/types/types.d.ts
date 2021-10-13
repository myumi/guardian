/// <reference types="guardian" />
declare module "guardian" {

  type ModernBreed = 'Fae' | 'Guardian' | 'Mirror' | 
  'Tundra' | 'Pearlcatcher' | 'Snapper' | 'Ridgeback' | 
  'Spiral' | 'Skydancer' | 'Bogsneak' | 'Obelisk' |
  'Imperial' | 'Nocturne' | 'Wildclaw' | 'Coatl';

  type AcientBreed = 'Gaoler' | 'Banescale' | 'Veilspun';
  export interface Dragon {
    name: string;
    primary: number;
    secondary: number;
    tertiary: number;
    sex?: undefined | 'female' | 'male';
    breed?: undefined | ModernBreed | AncientBreed;
    primaryGene?: undefined | ModernPrimaryGene;
    secondaryGene?: undefined | ModernSecondaryGene;
    tertiaryGene?: undefined | ModernTertiaryGene;
  };
  
  export interface Match {
    mother: Dragon;
    father: Dragon;
    chance: number;
  };
}