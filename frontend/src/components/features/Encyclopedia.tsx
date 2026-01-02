import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, Filter, X, ChevronRight, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const [activeRole] = useState<string>('All');
  const [activeSchoolYear] = useState<string>('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Debounce search query
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

    getCharacters(currentPage, 30, filters)
      .then(response => {
        setCharacters(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
      })
      .catch(err => console.error("Failed to fetch characters", err))
      .finally(() => setIsLoading(false));
  }, [currentPage, debouncedSearch, activeElement, activePosition, activeTeam, activeGender, activeRole, activeSchoolYear]);


  // Fetch teams
  const [teams, setTeams] = useState<string[]>(['All']);

  useEffect(() => {
    getTeams()
      .then(teamList => setTeams(['All', ...teamList]))
      .catch(err => console.error('Failed to fetch teams', err));
  }, []);

  const elementOptions = [
    { display: 'All', value: 'All' },
    { display: 'Fire', value: 'Fire' },
    { display: 'Wind', value: 'Wind' },
    { display: 'Forest', value: 'Forest' },
    { display: 'Mountain', value: 'Mountain' }
  ];
  
  const positions = ['All', 'GK', 'DF', 'MF', 'FW'];
  const genders = ['All', 'Male', 'Female']; 

  const FilterContent = () => (
    <div className="flex flex-col gap-6 p-1">
      <div className="space-y-2">
        <label className="text-xs font-bold text-inazuma-blue/60 uppercase tracking-widest pl-1">Search Player</label>
        <div className="relative group">
          <input
            type="text"
            placeholder="Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-inazuma-dark/40 border border-inazuma-blue/30 text-white pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-inazuma-blue focus:ring-1 focus:ring-inazuma-blue/50 transition-all placeholder-white/20 font-orbitron text-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-inazuma-blue/50 w-4 h-4 group-focus-within:text-inazuma-blue transition-colors" />
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-xs font-bold text-inazuma-blue/60 uppercase tracking-widest pl-1 border-l-2 border-inazuma-blue ml-1">Properties</label>
        
        <VerticalSelect label="Element" value={activeElement} onChange={setActiveElement} options={elementOptions.map(o => ({ label: o.display, value: o.value }))} />
        <VerticalSelect label="Position" value={activePosition} onChange={setActivePosition} options={positions.map(p => ({ label: p, value: p }))} />
        <VerticalSelect label="Gender" value={activeGender} onChange={setActiveGender} options={genders.map(g => ({ label: g, value: g }))} />
        <VerticalSelect label="Team" value={activeTeam} onChange={setActiveTeam} options={teams.map(t => ({ label: t, value: t }))} />
      </div>

      <div className="mt-4 p-4 rounded-xl bg-inazuma-blue/5 border border-inazuma-blue/10">
        <div className="text-[10px] text-inazuma-blue/40 uppercase font-black mb-1">Database Info</div>
        <div className="text-xs text-white/60 flex justify-between">
          <span>Total Players:</span>
          <span className="text-inazuma-blue font-bold">{totalElements}</span>
        </div>
        <div className="text-xs text-white/60 flex justify-between mt-1">
          <span>Viewing:</span>
          <span className="text-inazuma-yellow font-bold">{characters.length}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[1800px] mx-auto flex flex-col md:flex-row gap-8 min-h-screen">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden md:block w-72 flex-shrink-0">
        <div className="sticky top-28 h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex items-center gap-2 mb-6 px-1">
            <Filter className="text-inazuma-blue w-5 h-5" />
            <h2 className="text-xl font-black italic tracking-tighter text-white">DATACENTER<span className="text-inazuma-blue">_FILTERS</span></h2>
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Mobile Header with Filter Button */}
        <div className="md:hidden flex items-center justify-between mb-6 bg-inazuma-dark/40 p-4 rounded-xl border border-inazuma-blue/20 backdrop-blur-sm sticky top-20 z-40">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <LayoutGrid size={18} className="text-inazuma-blue" /> ENCYCLOPEDIA
            </h2>
            <p className="text-[10px] text-inazuma-blue/60 uppercase tracking-widest">{totalElements} Records found</p>
          </div>
          <button 
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center gap-2 bg-inazuma-blue p-2 px-4 rounded-lg text-black font-bold text-sm shadow-neon-blue active:scale-95 transition-all"
          >
            <Filter size={16} /> FILTERS
          </button>
        </div>

        {/* Characters Grid */}
        <div className="relative">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-inazuma-blue/20 rounded-full"></div>
                <div className="absolute inset-0 border-t-4 border-inazuma-blue rounded-full animate-spin"></div>
              </div>
              <p className="text-inazuma-blue font-bold animate-pulse text-sm uppercase tracking-[0.3em]">Accessing Data...</p>
            </div>
          ) : (
            <>
              {characters.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] border border-dashed border-inazuma-blue/20 rounded-3xl bg-white/5">
                  <X size={48} className="text-white/10 mb-4" />
                  <p className="text-white/60 font-orbitron">No players found matching your criteria</p>
                  <button 
                    onClick={() => {
                        setSearchQuery('');
                        setActiveElement('All');
                        setActivePosition('All');
                        setActiveTeam('All');
                        setActiveGender('All');
                    }}
                    className="mt-4 text-inazuma-blue hover:underline text-sm uppercase font-bold"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 pb-12">
                  <AnimatePresence mode="popLayout">
                    {characters.map(char => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        key={char.id}
                        onClick={() => setSelectedChar(char)}
                        className="group bg-inazuma-dark/60 border border-inazuma-blue/20 hover:border-inazuma-blue/60 relative cursor-pointer overflow-hidden p-3 rounded-2xl transition-all hover:shadow-[0_0_20px_rgba(0,242,255,0.15)] hover:-translate-y-1"
                      >
                        {/* Status Bar */}
                        <div className={`absolute top-0 right-0 w-12 h-1 ${positionColors[char.position]?.includes('bg-') ? positionColors[char.position].split(' ')[0] : 'bg-white/20'}`}></div>
                        
                        {/* Image Container */}
                        <div className="aspect-[4/5] w-full mb-3 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent rounded-xl relative overflow-hidden group-hover:bg-white/10 transition-colors">
                          <div className="absolute top-2 right-2 w-7 h-7 z-20 opacity-80 group-hover:opacity-100 transition-opacity">
                             <img src={getElementIcon(char.element)} alt={char.element} className="w-full h-full object-contain filter drop-shadow-sm" />
                          </div>
                          
                          {char.imageUrl ? (
                              <img 
                                src={char.imageUrl} 
                                alt={char.name} 
                                loading="lazy" 
                                className="w-[90%] h-[90%] object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300" 
                              />
                          ) : (
                              <div className="text-inazuma-blue/10 font-black text-6xl">?</div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="space-y-1">
                          <h3 className="font-black text-white text-xs sm:text-sm truncate uppercase tracking-tight group-hover:text-inazuma-blue transition-colors">{char.name}</h3>
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[9px] text-inazuma-blue/60 font-bold uppercase truncate">{char.nickname}</span>
                            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${positionColors[char.position] || 'bg-gray-500'} text-black shadow-sm`}>
                                {char.position}
                             </span>
                          </div>
                        </div>

                        {/* Team Badge - Absolute positioning purely visual */}
                        <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
                             <span className="text-[8px] text-white/30 truncate flex-1 uppercase tracking-tighter">
                                {char.team}
                             </span>
                             <ChevronRight size={10} className="text-inazuma-blue/20 group-hover:text-inazuma-blue transition-colors" />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-inazuma-blue/10 mt-4">
                  <div className="text-xs text-white/40 uppercase tracking-[0.2em] font-medium order-2 sm:order-1">
                    Showing {currentPage * 30 + 1}-{Math.min((currentPage + 1) * 30, totalElements)} of {totalElements}
                  </div>
                  <div className="flex items-center gap-2 order-1 sm:order-2">
                    <button 
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setCurrentPage(p => Math.max(0, p - 1));
                      }}
                      disabled={currentPage === 0}
                      className="p-2 px-4 bg-inazuma-blue/10 border border-inazuma-blue/30 text-inazuma-blue rounded-lg disabled:opacity-20 disabled:cursor-not-allowed hover:bg-inazuma-blue/20 transition-all font-black text-xs h-10 flex items-center justify-center clip-diagonal-button"
                    >
                      PREV
                    </button>
                    
                    <div className="bg-inazuma-dark border border-inazuma-blue/20 px-4 h-10 flex items-center justify-center rounded-lg min-w-[100px]">
                       <span className="text-xs font-black text-white">PAGE <span className="text-inazuma-blue">{currentPage + 1}</span> / {totalPages}</span>
                    </div>

                    <button 
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setCurrentPage(p => Math.min(totalPages - 1, p + 1));
                      }}
                      disabled={currentPage >= totalPages - 1}
                      className="p-2 px-4 bg-inazuma-blue text-black border border-inazuma-blue rounded-lg disabled:opacity-20 disabled:cursor-not-allowed hover:shadow-neon-blue transition-all font-black text-xs h-10 flex items-center justify-center clip-diagonal-button"
                    >
                      NEXT
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && createPortal(
        <AnimatePresence mode="wait">
          <div className="fixed inset-0 z-[9999] md:hidden">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsMobileFiltersOpen(false)}
               className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-inazuma-dark border-l border-inazuma-blue/30 p-6 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <Filter className="text-inazuma-blue" size={20} />
                    <h2 className="text-xl font-black italic text-white">FILTERS</h2>
                </div>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 text-white/40 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <FilterContent />
              </div>
              
              <button 
                onClick={() => setIsMobileFiltersOpen(false)}
                className="mt-6 w-full bg-inazuma-blue text-black py-4 rounded-xl font-black text-sm shadow-neon-blue uppercase tracking-widest"
              >
                Show {totalElements} Players
              </button>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}

      <CharacterModal 
        character={selectedChar} 
        isOpen={!!selectedChar} 
        onClose={() => setSelectedChar(null)} 
      />
    </div>
  );
};

// Refactored helper components
const VerticalSelect = ({ label, value, onChange, options }: { label: string, value: string, onChange: (v: string) => void, options: { label: string, value: string }[] }) => (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center px-1">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">{label}</span>
        {value !== 'All' && <span className="text-[10px] text-inazuma-yellow font-black uppercase">ACTIVE</span>}
      </div>
      <select 
         value={value} 
         onChange={(e) => onChange(e.target.value)}
         className={`w-full bg-inazuma-dark/60 border px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:border-inazuma-blue transition-all appearance-none cursor-pointer ${value !== 'All' ? 'border-inazuma-yellow text-inazuma-yellow bg-inazuma-yellow/5 shadow-[0_0_10px_rgba(251,191,36,0.1)]' : 'border-white/10 text-white/80 hover:border-white/20'}`}
      >
         {options.map(opt => <option key={opt.value} value={opt.value} className="text-white bg-inazuma-dark">{opt.label}</option>)}
      </select>
    </div>
  );
