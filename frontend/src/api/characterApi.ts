import type { Character, PageResponse, CharacterFilters } from '../types';

// Use relative URL in production, localhost in development
const API_URL = import.meta.env.DEV 
  ? 'http://localhost:8080/api/characters'
  : '/api/characters';

export const getCharacters = async (
  page: number = 0,
  size: number = 20,
  filters: CharacterFilters = {}
): Promise<PageResponse<Character>> => {
  const params = new URLSearchParams();
  
  params.append('page', page.toString());
  params.append('size', size.toString());

  if (filters.name) params.append('name', filters.name);
  if (filters.element && filters.element !== 'All') params.append('element', filters.element);
  if (filters.position && filters.position !== 'All') params.append('position', filters.position);
  if (filters.gender && filters.gender !== 'All') params.append('gender', filters.gender);
  if (filters.team && filters.team !== 'All') params.append('team', filters.team);
  
  // Note: Backend currently might not support role and schoolYear yet, 
  // but we can pass them if we update the backend. 
  // For now, we only send what the backend supports.

  const response = await fetch(`${API_URL}?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch characters: ${response.statusText}`);
  }

  return response.json();
};

export const getTeams = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/teams`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch teams: ${response.statusText}`);
  }

  return response.json();
};
