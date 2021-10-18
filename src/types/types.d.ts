/// <reference types="guardian" />
declare module "guardian" {

  type Rarity = 'Plentiful' | 'Common' | 'Uncommon' | 'Limited' | 'Rare';

  type ModernBreed = 'Fae' | 'Guardian' | 'Mirror' | 
  'Tundra' | 'Pearlcatcher' | 'Snapper' | 'Ridgeback' | 
  'Spiral' | 'Skydancer' | 'Bogsneak' | 'Obelisk' |
  'Imperial' | 'Nocturne' | 'Wildclaw' | 'Coatl';

  type AcientBreed = 'Gaoler' | 'Banescale' | 'Veilspun';
  export interface Dragon {
    name: string;
    colors: {
      primary: number;
      secondary: number;
      tertiary: number;
    };
    genes?: {
      primary?: ModernPrimaryGene;
      secondary?: ModernSecondaryGene;
      tertiary?: ModernTertiaryGene;
    }
    sex?: 'female' | 'male';
    breed?: ModernBreed | AncientBreed;
  };
  
  export interface Match {
    mother: Dragon;
    father: Dragon;
    chance: number;
  };
}