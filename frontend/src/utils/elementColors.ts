export const elementColors: Record<string, string> = {
  'Fire': 'bg-red-500',
  'Wind': 'bg-green-400', // Wind usually green/teal in simple mapping, or maybe cyan. Using Blue/Cyan for Wind often overlaps with "Air". Let's stick to user request: Fire=Red, Wood=Green. Wind=Cyan/Blue?
  'Wood': 'bg-green-600',
  'Earth': 'bg-yellow-600',
  'Void': 'bg-purple-600',
  'Unknown': 'bg-gray-500'
};

export const elementTextColors: Record<string, string> = {
  'Fire': 'text-red-500',
  'Wind': 'text-green-400',
  'Wood': 'text-green-600',
  'Earth': 'text-yellow-600',
  'Void': 'text-purple-600',
  'Unknown': 'text-gray-500'
};

export const positionColors: Record<string, string> = {
  'GK': 'bg-yellow-500',
  'DF': 'bg-blue-500',
  'MF': 'bg-green-500',
  'FW': 'bg-red-500',
};
