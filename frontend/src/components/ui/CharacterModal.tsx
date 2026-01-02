import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Activity, Zap, Shield, Footprints, Brain, LayoutGrid, ChevronDown } from 'lucide-react'; 
import { getElementIcon, getGenderIcon } from '../../utils/assets';
import { useState } from 'react';
import type { Character } from '../../types';

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({ character, isOpen, onClose }) => {
  const [showStats, setShowStats] = useState(false);

  if (!character) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 overflow-hidden">
          {/* Backdrop - Covers everything and blurs the background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-lg cursor-pointer"
          />

          {/* Modal Container - Max height and scrollable */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-inazuma-dark/95 border-2 border-inazuma-blue text-white shadow-[0_0_100px_rgba(0,242,255,0.4)] clip-diagonal max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Design Elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-inazuma-blue/5 transform rotate-45 translate-x-24 -translate-y-24 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-inazuma-yellow/5 transform rotate-45 -translate-x-24 translate-y-24 pointer-events-none"></div>

            {/* Sticky Close Button Container (Relative to Modal) */}
            <div className="absolute top-4 right-4 z-[60]">
              <button 
                onClick={onClose} 
                className="p-2.5 bg-black/60 hover:bg-inazuma-blue/30 rounded-xl transition-all group border border-inazuma-blue/20 hover:border-inazuma-blue hover:shadow-neon-blue active:scale-90"
              >
                <X className="w-6 h-6 md:w-8 md:h-8 text-inazuma-blue group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="flex flex-col md:flex-row min-h-full">
                {/* Left Column: Media & Core Identity */}
                <div className="w-full md:w-5/12 bg-gradient-to-b from-inazuma-blue/10 to-transparent p-6 md:p-10 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-inazuma-blue/20">
                  <div className="relative w-56 h-56 md:w-80 md:h-80 mb-8 group">
                    <div className="absolute inset-0 border-2 border-inazuma-blue/20 rotate-45 transform scale-110 group-hover:rotate-90 transition-transform duration-1000"></div>
                    <div className="absolute inset-0 border-2 border-inazuma-yellow/20 rotate-12 transform scale-125 opacity-30 group-hover:-rotate-45 transition-transform duration-1000"></div>
                    
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={character.imageUrl}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={character.imageUrl || 'https://via.placeholder.com/400'}
                        alt={character.name}
                        className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_25px_rgba(0,242,255,0.4)]"
                      />
                    </AnimatePresence>
                  </div>
                  
                  <div className="text-center space-y-2 relative z-10">
                    <div className="flex items-center justify-center gap-3">
                      <img src={getGenderIcon(character.gender)} alt={character.gender} className="w-8 h-8 object-contain drop-shadow-neon-blue" />
                      <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-inazuma-blue">
                        {character.name}
                      </h2>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <span className="text-xl md:text-2xl text-inazuma-yellow font-black tracking-[0.3em] uppercase italic opacity-90">
                        {character.nickname}
                      </span>
                      <div className="h-1 w-24 bg-gradient-to-r from-transparent via-inazuma-yellow to-transparent mt-1"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full mt-8">
                    <StatBox label="POSITION" value={character.position} subValue="ROLE" />
                    <StatBox 
                      label="ELEMENT" 
                      value={<img src={getElementIcon(character.element)} alt={character.element} className="w-10 h-10 object-contain mx-auto" />} 
                      subValue={character.element.toUpperCase()} 
                    />
                  </div>

                  <div className="w-full mt-8 space-y-4">
                    <div className="p-4 bg-inazuma-dark/80 rounded-2xl border border-inazuma-blue/10 backdrop-blur-sm">
                       <span className="text-[10px] text-inazuma-blue/40 font-black uppercase tracking-widest block mb-2">Team Affiliation</span>
                       <p className="text-sm text-inazuma-blue font-bold italic text-center">"{character.team}"</p>
                    </div>

                    {character.description && (
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5 italic text-center">
                        <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-light">
                          "{character.description}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Detailed Gameplay Info */}
                <div className="w-full md:w-7/12 p-6 md:p-12 flex flex-col space-y-8">
                  {/* How to Obtain */}
                  {character.howToObtain && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-6 bg-inazuma-yellow shadow-neon-yellow"></div>
                        <h3 className="text-sm font-black text-inazuma-yellow tracking-widest uppercase">Scouting Protocol</h3>
                      </div>
                      <div className="p-5 bg-inazuma-yellow/10 rounded-2xl border border-inazuma-yellow/20 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-16 h-16 bg-inazuma-yellow/5 -mr-8 -mt-8 rotate-45"></div>
                         <p className="text-sm text-gray-200 leading-relaxed relative z-10">{character.howToObtain}</p>
                      </div>
                    </div>
                  )}

                  {/* Battle Stats */}
                  <div className="space-y-4">
                    <button 
                      onClick={() => setShowStats(!showStats)}
                      className="w-full flex items-center justify-between p-5 bg-inazuma-dark/50 border-2 border-inazuma-blue/30 rounded-2xl hover:border-inazuma-blue transition-all group active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-3">
                        <Activity className="text-inazuma-blue group-hover:animate-pulse" />
                        <span className="font-black text-lg tracking-widest text-white uppercase italic">Player Potential</span>
                      </div>
                      <div className={`transition-transform duration-300 ${showStats ? 'rotate-180' : ''}`}>
                        <ChevronDown className="text-inazuma-blue" />
                      </div>
                    </button>

                    <AnimatePresence>
                      {showStats && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 space-y-5 bg-black/40 rounded-2xl border border-inazuma-blue/10">
                            <StatBar label="Kick" value={character.stats.kick} icon={<Zap size={16} />} color="bg-red-500" />
                            <StatBar label="Control" value={character.stats.control} icon={<Brain size={16} />} color="bg-blue-500" /> 
                            <StatBar label="Technique" value={character.stats.technique} icon={<Activity size={16} />} color="bg-green-500" />
                            <StatBar label="Pressure" value={character.stats.pressure} icon={<Shield size={16} />} color="bg-purple-500" />
                            <StatBar label="Physical" value={character.stats.physical} icon={<User size={16} />} color="bg-orange-500" />
                            <StatBar label="Speed" value={character.stats.agility} icon={<Footprints size={16} />} color="bg-cyan-500" />
                            
                            <div className="pt-4 text-center border-t border-white/5">
                              <p className="text-[10px] text-white/20 uppercase tracking-widest">
                                Authorized Data Stream • V-ROAD PROTOCOL v1.2
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Decorative / placeholder for more info */}
                  <div className="flex-1 border border-inazuma-blue/5 rounded-3xl flex flex-col items-center justify-center p-8 opacity-20">
                     <LayoutGrid size={48} className="text-inazuma-blue mb-4 animate-pulse" />
                     <span className="text-[10px] uppercase font-black tracking-[0.5em]">System Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

const StatBox = ({ label, value, subValue }: { label: string, value: React.ReactNode, subValue: string }) => (
  <div className="bg-inazuma-dark/50 border border-inazuma-blue/30 p-4 rounded-2xl text-center backdrop-blur-sm group hover:border-inazuma-blue transition-colors">
    <span className="text-[9px] font-black text-inazuma-blue/60 tracking-widest block mb-1">{label}</span>
    <div className="text-2xl font-black text-white group-hover:scale-110 transition-transform">{value}</div>
    <span className="text-[8px] font-bold text-gray-500 uppercase mt-1 block">{subValue}</span>
  </div>
);

const StatBar: React.FC<{ label: string; value: number; icon: React.ReactNode; color: string }> = ({ label, value, icon, color }) => (
  <div className="flex items-center gap-4">
    <div className="w-24 text-right font-bold text-sm tracking-widest text-gray-300 flex items-center justify-end gap-2">
      {label} {icon}
    </div>
    <div className="flex-1 h-6 bg-inazuma-dark/50 border border-inazuma-blue/20 relative skew-x-[-15deg] overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, type: 'spring' }}
        className={`h-full ${color} opacity-80 shadow-[0_0_10px_currentColor]`}
      />
      <div className="absolute right-2 top-0 bottom-0 flex items-center text-xs font-bold text-white z-10 not-italic skew-x-[15deg]">
        {value}
      </div>
    </div>
  </div>
);
