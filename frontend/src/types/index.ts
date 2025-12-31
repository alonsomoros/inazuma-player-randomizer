export interface CharacterStats {
  kick: number;
  control: number;
  technique: number;
  pressure: number;
  physical: number;
  agility: number;
  intelligence: number;
}

export interface Character {
  id: string;
  name: string;
  nickname: string;
  imageUrl: string;
  gender: 'Male' | 'Female' | 'Other';
  element: 'Wind' | 'Wood' | 'Fire' | 'Earth' | 'Void' | string; // Allow string for flexibility
  position: 'FW' | 'MF' | 'DF' | 'GK' | string;
  team: string;
  stats: CharacterStats;
  description?: string;
  howToObtain?: string;
  // Raw data fields for reference if needed
  schoolYear?: string;
  ageGroup?: string;
  characterRole?: string;
}
