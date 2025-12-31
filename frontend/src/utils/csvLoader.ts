import type { Character } from '../types';

const API_URL = 'http://localhost:8080/api/characters';

export const loadCharacters = async (): Promise<Character[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch characters: ${response.statusText}`);
    }
    const data = await response.json();
    return data as Character[];
  } catch (error) {
    console.error('Error loading characters from API:', error);
    // Fallback or rethrow depending on desired behavior.
    // For now, let's treat it as a critical error or maybe fallback to empty list
    throw error;
  }
};
