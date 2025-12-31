import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Character } from '../../types';
import { CharacterModal } from '../ui/CharacterModal';
import { positionColors } from '../../utils/elementColors';
import { loadCharacters } from '../../utils/csvLoader';
import { getElementIcon } from '../../utils/assets';

export const Encyclopedia: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filters
  const [activeElement, setActiveElement] = useState<string>('All');
  const [activePosition, setActivePosition] = useState<string>('All');
  const [activeTeam, setActiveTeam] = useState<string>('All');
  const [activeGender, setActiveGender] = useState<string>('All');
  const [activeRole, setActiveRole] = useState<string>('All');
  const [activeSchoolYear, setActiveSchoolYear] = useState<string>('All');

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCharacters()
      .then(setCharacters)
      .finally(() => setIsLoading(false));
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeElement, activePosition, activeTeam, activeGender, activeRole, activeSchoolYear]);

  const filteredCharacters = useMemo(() => {
    return characters.filter(char => {
      const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            char.nickname.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesElement = activeElement === 'All' || char.element === activeElement;
      const matchesPosition = activePosition === 'All' || char.position === activePosition;
      const matchesTeam = activeTeam === 'All' || char.team === activeTeam;
      const matchesGender = activeGender === 'All' || char.gender === activeGender;
      const matchesRole = activeRole === 'All' || (char.characterRole || 'Unknown') === activeRole;
      const matchesSchoolYear = activeSchoolYear === 'All' || (char.schoolYear || 'Unknown') === activeSchoolYear;
      
      return matchesSearch && matchesElement && matchesPosition && matchesTeam && matchesGender && matchesRole && matchesSchoolYear;
    });
  }, [characters, searchQuery, activeElement, activePosition, activeTeam, activeGender, activeRole, activeSchoolYear]);

  const paginatedCharacters = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCharacters.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCharacters, currentPage]);

  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);

  // Unique options for filters
  const teams = useMemo(() => ['All', ...Array.from(new Set(characters.map(c => c.team))).sort()], [characters]);
  const genders = useMemo(() => ['All', ...Array.from(new Set(characters.map(c => c.gender))).sort()], [characters]);
  const roles = useMemo(() => ['All', ...Array.from(new Set(characters.map(c => c.characterRole || 'Unknown'))).sort()], [characters]);
  const schoolYears = useMemo(() => ['All', ...Array.from(new Set(characters.map(c => c.schoolYear || 'Unknown'))).sort()], [characters]);
  
  const elements = ['All', 'Fire', 'Wind', 'Wood', 'Earth', 'Void'];
  const positions = ['All', 'GK', 'DF', 'MF', 'FW'];

  return (
    <div className="w-full h-full flex flex-col p-4 max-w-7xl mx-auto overflow-hidden">
      {/* Search & Filter Bar */}
      <div className="mb-4 space-y-4 flex-shrink-0">
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search Player Name or Nickname..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-inazuma-dark/80 border-2 border-inazuma-blue text-white px-12 py-3 rounded-lg focus:outline-none focus:shadow-[0_0_15px_#00f2ff] transition-shadow placeholder-inazuma-blue/50 text-lg font-orbitron clip-diagonal"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-inazuma-blue w-6 h-6" />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-4 items-center bg-inazuma-dark/50 p-4 rounded-lg border border-inazuma-blue/20">
          <div className="flex items-center gap-2 text-inazuma-blue font-bold mr-4">
            <Filter size={20} /> FILTERS
          </div>
          
          {/* Element Filter */}
          <select 
             value={activeElement} 
             onChange={(e) => setActiveElement(e.target.value)}
             className={`bg-inazuma-dark border px-3 py-1 rounded focus:outline-none focus:bg-inazuma-blue/20 hover:border-inazuma-blue transition-colors ${activeElement !== 'All' ? 'border-inazuma-yellow text-inazuma-yellow shadow-[0_0_5px_rgba(255,255,0,0.3)]' : 'border-inazuma-blue/50 text-white'}`}
          >
             {elements.map(elm => <option key={elm} value={elm} className="text-white bg-inazuma-dark">Element: {elm}</option>)}
          </select>

           {/* Position Filter */}
           <select 
             value={activePosition} 
             onChange={(e) => setActivePosition(e.target.value)}
             className={`bg-inazuma-dark border px-3 py-1 rounded focus:outline-none focus:bg-inazuma-blue/20 hover:border-inazuma-blue transition-colors ${activePosition !== 'All' ? 'border-inazuma-yellow text-inazuma-yellow shadow-[0_0_5px_rgba(255,255,0,0.3)]' : 'border-inazuma-blue/50 text-white'}`}
          >
             {positions.map(pos => <option key={pos} value={pos} className="text-white bg-inazuma-dark">Pos: {pos}</option>)}
          </select>

          {/* Gender Filter */}
          <select 
             value={activeGender} 
             onChange={(e) => setActiveGender(e.target.value)}
             className={`bg-inazuma-dark border px-3 py-1 rounded focus:outline-none focus:bg-inazuma-blue/20 hover:border-inazuma-blue transition-colors ${activeGender !== 'All' ? 'border-inazuma-yellow text-inazuma-yellow shadow-[0_0_5px_rgba(255,255,0,0.3)]' : 'border-inazuma-blue/50 text-white'}`}
          >
             {genders.map(g => <option key={g} value={g} className="text-white bg-inazuma-dark">Gender: {g}</option>)}
          </select>

           {/* Role Filter */}
           <select 
             value={activeRole} 
             onChange={(e) => setActiveRole(e.target.value)}
             className={`bg-inazuma-dark border px-3 py-1 rounded focus:outline-none focus:bg-inazuma-blue/20 hover:border-inazuma-blue transition-colors ${activeRole !== 'All' ? 'border-inazuma-yellow text-inazuma-yellow shadow-[0_0_5px_rgba(255,255,0,0.3)]' : 'border-inazuma-blue/50 text-white'}`}
          >
             {roles.map(r => <option key={r} value={r} className="text-white bg-inazuma-dark">Role: {r}</option>)}
          </select>

           {/* School Year Filter */}
           <select 
             value={activeSchoolYear} 
             onChange={(e) => setActiveSchoolYear(e.target.value)}
             className={`bg-inazuma-dark border px-3 py-1 rounded focus:outline-none focus:bg-inazuma-blue/20 hover:border-inazuma-blue transition-colors ${activeSchoolYear !== 'All' ? 'border-inazuma-yellow text-inazuma-yellow shadow-[0_0_5px_rgba(255,255,0,0.3)]' : 'border-inazuma-blue/50 text-white'}`}
          >
             {schoolYears.map(sy => <option key={sy} value={sy} className="text-white bg-inazuma-dark">Year: {sy}</option>)}
          </select>

           {/* Team Filter */}
           <select 
             value={activeTeam} 
             onChange={(e) => setActiveTeam(e.target.value)}
             className={`bg-inazuma-dark border px-3 py-1 rounded focus:outline-none focus:bg-inazuma-blue/20 hover:border-inazuma-blue max-w-[200px] transition-colors ${activeTeam !== 'All' ? 'border-inazuma-yellow text-inazuma-yellow shadow-[0_0_5px_rgba(255,255,0,0.3)]' : 'border-inazuma-blue/50 text-white'}`}
          >
             {teams.map(team => <option key={team} value={team} className="text-white bg-inazuma-dark">Team: {team}</option>)}
          </select>

          <div className="ml-auto text-inazuma-yellow text-sm font-light">
             Found: {filteredCharacters.length} | Page {currentPage}/{totalPages || 1}
          </div>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center flex-1">
           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-inazuma-blue"></div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-4">
            {paginatedCharacters.map(char => (
              <motion.div
                layoutId={char.id}
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
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-inazuma-dark border border-inazuma-blue text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-inazuma-blue/20 transition-colors clip-diagonal-button"
              >
                PREVIOUS
              </button>
              <div className="flex items-center text-inazuma-blue font-bold">
                 PAGE {currentPage} / {totalPages}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
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
