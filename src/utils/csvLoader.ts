import Papa from 'papaparse';
import type { Character, CharacterStats } from '../types';

export const loadCharacters = async (): Promise<Character[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse('/characters.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedContexts: Character[] = results.data
          .filter((row: any) => row.Name && row.ImageURL)
          .map((row: any) => {
             // Create a normalized row object with lowercase keys for safer access
             const normalizedRow: any = {};
             Object.keys(row).forEach(key => {
               normalizedRow[key.trim().toLowerCase()] = row[key];
             });

             const parseStat = (key: string) => {
               const val = normalizedRow[key.toLowerCase()];
               const num = Number(val);
               return isNaN(num) ? 0 : num;
             };

            const stats: CharacterStats = {
              kick: parseStat('kick'),
              control: parseStat('control'),
              technique: parseStat('technique'),
              pressure: parseStat('pressure'),
              physical: parseStat('physical'),
              agility: parseStat('agility'),
              intelligence: parseStat('intelligence'),
            };

            // Use original row for case-sensitive fields if needed, or mapped keys
            return {
              id: row['ID'] || crypto.randomUUID(),
              name: row['Name'],
              nickname: row['Nickname'] || row['Name'],
              imageUrl: row['ImageURL'],
              gender: row['Gender'] || 'Unknown',
              element: row['Element'] || 'Void',
              position: row['Position'] || 'MF',
              team: row['Team'] || 'Unknown',
              stats: stats,
              description: row['Description'],
              howToObtain: row['HowToObtain'],
              schoolYear: row['SchoolYear'],
              ageGroup: row['AgeGroup'],
              characterRole: row['CharacterRole']
            } as Character;
          });
        resolve(parsedContexts);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};
