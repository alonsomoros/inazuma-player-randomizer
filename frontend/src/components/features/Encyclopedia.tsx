import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Character, CharacterFilters } from '../../types';
import { CharacterModal } from '../ui/CharacterModal';
import { positionColors } from '../../utils/elementColors';
import { getCharacters, getTeams } from '../../api/characterApi';
import { getElementIcon } from '../../utils/assets';

export const Encyclopedia: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeElement, setActiveElement] = useState<string>('All');
  const [activePosition, setActivePosition] = useState<string>('All');
  const [activeTeam, setActiveTeam] = useState<string>('All');
  const [activeGender, setActiveGender] = useState<string>('All');
  
  // Note: Backend currently supports name, element, position, gender, team.
  // Role and SchoolYear are kept in UI but might need backend support to work fully.
  const [activeRole] = useState<string>('All');
  const [activeSchoolYear] = useState<string>('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(0); // Backend uses 0-indexed pages
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Debounce search query to avoid too many API calls
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearch, activeElement, activePosition, activeTeam, activeGender, activeRole, activeSchoolYear]);

  // Fetch Data
  useEffect(() => {
    setIsLoading(true);
    
    const filters: CharacterFilters = {
        name: debouncedSearch,
        element: activeElement,
        position: activePosition,
        team: activeTeam,
        gender: activeGender,
        role: activeRole,
        schoolYear: activeSchoolYear
    };

    getCharacters(currentPage, 25, filters)
      .then(response => {
        setCharacters(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
      })
      .catch(err => console.error("Failed to fetch characters", err))
      .finally(() => setIsLoading(false));
  }, [currentPage, debouncedSearch, activeElement, activePosition, activeTeam, activeGender, activeRole, activeSchoolYear]);


  // Fetch teams from backend
  const [teams, setTeams] = useState<string[]>(['All']);

  useEffect(() => {
    getTeams()
      .then(teamList => setTeams(['All', ...teamList]))
      .catch(err => console.error('Failed to fetch teams', err));
  }, []);

  // Element mapping: Display name -> API value
  const elementOptions = [
    { display: 'All', value: 'All' },
    { display: 'Fire', value: 'Fire' },
    { display: 'Wind', value: 'Wind' },
    { display: 'Forest', value: 'Forest' },
    { display: 'Mountain', value: 'Mountain' }
  ];
  
  const positions = ['All', 'GK', 'DF', 'MF', 'FW'];
  const genders = ['All', 'Male', 'Female']; 

  return (
    <div className="w-full flex flex-col p-2 sm:p-4 max-w-7xl mx-auto">
      {/* Search & Filter Bar - STICKY */}
      <div className="sticky top-0 z-30 bg-inazuma-dark/95 backdrop-blur-md py-4 mb-4 space-y-4 flex-shrink-0 border-b border-inazuma-blue/20">
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search Player Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-inazuma-dark/80 border-2 border-inazuma-blue text-white px-12 py-3 rounded-lg focus:outline-none focus:shadow-[0_0_15px_#00f2ff] transition-shadow placeholder-inazuma-blue/50 text-lg font-orbitron clip-diagonal"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-inazuma-blue w-6 h-6" />
        </div>

        {/* Filter Badges - Use Grid for better width adaptation */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 bg-inazuma-dark/50 p-4 rounded-lg border border-inazuma-blue/20">
          <div className="col-span-full lg:col-span-1 flex items-center gap-2 text-inazuma-blue font-bold">
            <Filter size={20} /> FILTERS
          </div>
          
          <ElementSelect value={activeElement} onChange={setActiveElement} options={elementOptions} />
          <FilterSelect value={activePosition} onChange={setActivePosition} label="Pos" options={positions} />
          <FilterSelect value={activeGender} onChange={setActiveGender} label="Gender" options={genders} />
          <FilterSelect value={activeTeam} onChange={setActiveTeam} label="Team" options={teams} />

          <div className="col-span-full lg:col-span-1 lg:ml-auto flex items-center text-inazuma-yellow text-sm font-light">
             Found: {totalElements} | Page {currentPage + 1}/{totalPages || 1}
          </div>
        </div>
      </div>

      {/* Grid - Natural Flow */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-inazuma-blue"></div>
        </div>
      ) : (
        <div className="w-full min-h-[400px] border border-inazuma-blue/10 bg-inazuma-dark/20 p-4 rounded-xl mb-16">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 pb-4">
            {characters.map(char => (
              <motion.div
                layoutId={char.id.toString()}
                key={char.id}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setSelectedChar(char)}
                className="bg-inazuma-dark border border-inazuma-blue/30 relative group cursor-pointer overflow-hidden p-3 rounded-tr-3xl"
              >
                <div className="absolute top-0 right-0 w-8 h-8 bg-inazuma-blue/20 rounded-bl-xl z-0"></div>
                
                {/* Image */}
                <div className="aspect-square w-full mb-3 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent rounded-lg relative overflow-hidden">
                  <div className="absolute top-2 right-2 w-8 h-8 z-20">
                     <img src={getElementIcon(char.element)} alt={char.element} className="w-full h-full object-contain drop-shadow-md" />
                  </div>
                  {char.imageUrl ? (
                      <img src={char.imageUrl} alt={char.name} loading="lazy" className="w-full h-full object-contain drop-shadow-lg group-hover:drop-shadow-[0_0_10px_rgba(0,242,255,0.5)] transition-all" />
                  ) : (
                      <div className="text-inazuma-blue/20 font-black text-4xl">?</div>
                  )}
                </div>

                {/* Info */}
                <div className="text-center relative z-10">
                  <h3 className="font-bold text-white text-sm truncate">{char.name}</h3>
                  <h4 className="text-[10px] text-inazuma-blue uppercase font-bold tracking-wider truncate mb-1">{char.nickname}</h4>
                  <div className="flex justify-between items-center mt-1 px-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${positionColors[char.position] || 'bg-gray-500'} text-black`}>
                        {char.position}
                      </span>
                      <span className="text-[10px] text-gray-400 truncate max-w-[60%]">
                        {char.team}
                      </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 py-4 mt-auto">
              <button 
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="px-4 py-2 bg-inazuma-dark border border-inazuma-blue text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-inazuma-blue/20 transition-colors clip-diagonal-button"
              >
                PREVIOUS
              </button>
              <div className="flex items-center text-inazuma-blue font-bold">
                 PAGE {currentPage + 1} / {totalPages}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage >= totalPages - 1}
                className="px-4 py-2 bg-inazuma-dark border border-inazuma-blue text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-inazuma-blue/20 transition-colors clip-diagonal-button"
              >
                NEXT
              </button>
            </div>
          )}
        </div>
      )}

      <CharacterModal 
        character={selectedChar} 
        isOpen={!!selectedChar} 
        onClose={() => setSelectedChar(null)} 
      />
    </div>
  );
};

// Helper component for cleaner Select inputs
const FilterSelect = ({ value, onChange, label, options }: { value: string, onChange: (v: string) => void, label: string, options: string[] }) => (
  <select 
     value={value} 
     onChange={(e) => onChange(e.target.value)}
     className={`flex-1 min-w-[140px] bg-inazuma-dark border px-3 py-2 text-sm sm:text-base rounded-lg focus:outline-none focus:bg-inazuma-blue/20 hover:border-inazuma-blue transition-all ${value !== 'All' ? 'border-inazuma-yellow text-inazuma-yellow shadow-[0_0_8px_rgba(255,255,0,0.2)]' : 'border-inazuma-blue/50 text-white'}`}
  >
     {options.map(opt => <option key={opt} value={opt} className="text-white bg-inazuma-dark">{label}: {opt}</option>)}
  </select>
);

// Element select with display name mapping
const ElementSelect = ({ value, onChange, options }: { value: string, onChange: (v: string) => void, options: { display: string, value: string }[] }) => (
  <select 
     value={value} 
     onChange={(e) => onChange(e.target.value)}
     className={`flex-1 min-w-[140px] bg-inazuma-dark border px-3 py-2 text-sm sm:text-base rounded-lg focus:outline-none focus:bg-inazuma-blue/20 hover:border-inazuma-blue transition-all ${value !== 'All' ? 'border-inazuma-yellow text-inazuma-yellow shadow-[0_0_8px_rgba(255,255,0,0.2)]' : 'border-inazuma-blue/50 text-white'}`}
  >
     {options.map(opt => <option key={opt.value} value={opt.value} className="text-white bg-inazuma-dark">Element: {opt.display}</option>)}
  </select>
);
