export const elementIcons: Record<string, string> = {
  'Fire': 'https://inazuma-eleven.fr/images/teamBuilder/elements/Fire.png',
  'Earth': 'https://inazuma-eleven.fr/images/teamBuilder/elements/Earth.png', // User calls this "Mountain"
  'Mountain': 'https://inazuma-eleven.fr/images/teamBuilder/elements/Earth.png',
  'Wind': 'https://inazuma-eleven.fr/images/teamBuilder/elements/Wind.png',
  'Wood': 'https://inazuma-eleven.fr/images/teamBuilder/elements/Wood.png', // User calls this "Forest"
  'Forest': 'https://inazuma-eleven.fr/images/teamBuilder/elements/Wood.png',
  'Void': 'https://inazuma-eleven.fr/images/teamBuilder/elements/None.png',
  'None': 'https://inazuma-eleven.fr/images/teamBuilder/elements/None.png',
  'Unknown': 'https://inazuma-eleven.fr/images/teamBuilder/elements/None.png'
};

export const genderIcons: Record<string, string> = {
  'Male': 'https://inazuma-eleven.fr/images/teamBuilder/gender/Male.png',
  'Female': 'https://inazuma-eleven.fr/images/teamBuilder/gender/Female.png',
  'Other': 'https://inazuma-eleven.fr/images/teamBuilder/gender/Male.png', // Fallback
  'Unknown': 'https://inazuma-eleven.fr/images/teamBuilder/gender/Male.png' // Fallback
};

export const getElementIcon = (element: string) => {
  return elementIcons[element] || elementIcons['Unknown'];
};

export const getGenderIcon = (gender: string) => {
  return genderIcons[gender] || genderIcons['Unknown'];
};
