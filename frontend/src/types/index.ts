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

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface CharacterFilters {
  name?: string;
  element?: string;
  position?: string;
  gender?: string;
  team?: string;
  role?: string;
  schoolYear?: string;
}
