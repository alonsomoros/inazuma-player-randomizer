import type { Character } from '../types';

export const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Mark Evans',
    nickname: 'Endou',
    imageUrl: 'https://static.wikia.nocookie.net/inazuma-eleven/images/4/4c/Endou_Mamoru_Orion_artwork.png',
    gender: 'Male',
    element: 'Earth',
    position: 'GK',
    team: 'Raimon',
    stats: {
      kick: 60,
      control: 90,
      technique: 80,
      pressure: 95,
      physical: 85,
      agility: 70,
      intelligence: 75
    },
    description: 'The legendary goalkeeper and captain of Raimon.'
  },
  {
    id: '2',
    name: 'Axel Blaze',
    nickname: 'Gouenji',
    imageUrl: 'https://static.wikia.nocookie.net/inazuma-eleven/images/f/f6/Gouenji_Shuuya_Orion_artwork.png',
    gender: 'Male',
    element: 'Fire',
    position: 'FW',
    team: 'Raimon',
    stats: {
      kick: 98,
      control: 80,
      technique: 85,
      pressure: 75,
      physical: 80,
      agility: 85,
      intelligence: 80
    },
    description: 'The ace striker known for his Fire Tornado.'
  },
  {
    id: '3',
    name: 'Jude Sharp',
    nickname: 'Kidou',
    imageUrl: 'https://static.wikia.nocookie.net/inazuma-eleven/images/3/36/Kidou_Yuuto_Orion_artwork.png',
    gender: 'Male',
    element: 'Wind',
    position: 'MF',
    team: 'Royal Academy',
    stats: {
      kick: 75,
      control: 90,
      technique: 95,
      pressure: 80,
      physical: 70,
      agility: 75,
      intelligence: 99
    },
    description: 'The tactical genius of the pitch.'
  }
];
