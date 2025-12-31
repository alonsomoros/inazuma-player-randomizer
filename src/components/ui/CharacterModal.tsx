import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Activity, Zap, Shield, Footprints, Brain } from 'lucide-react'; // Example icons
import type { Character } from '../../types';

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

import { getElementIcon, getGenderIcon } from '../../utils/assets';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

// ... imports

export const CharacterModal: React.FC<CharacterModalProps> = ({ character, isOpen, onClose }) => {
  const [showStats, setShowStats] = useState(false);

  if (!character) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="relative w-full max-w-4xl bg-inazuma-dark/90 border-2 border-inazuma-blue text-white overflow-hidden shadow-[0_0_50px_rgba(0,242,255,0.3)] clip-diagonal max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            {/* Decoration Lines */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-inazuma-blue/10 transform rotate-45 translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-inazuma-yellow/10 transform rotate-45 -translate-x-16 translate-y-16"></div>

            {/* Header / Close Button */}
            <div className="absolute top-2 right-2 md:top-4 md:right-4 z-50">
              <button 
                onClick={onClose} 
                className="p-2 bg-black/50 hover:bg-inazuma-blue/20 rounded-full transition-colors group border border-transparent hover:border-inazuma-blue/50"
              >
                <X className="w-6 h-6 md:w-8 md:h-8 text-inazuma-blue group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row h-full">
              {/* Left Column: Image & Basic Info */}
              <div className="w-full md:w-5/12 bg-gradient-to-b from-inazuma-blue/5 to-transparent p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-inazuma-blue/20">
                <div className="relative w-48 h-48 md:w-64 md:h-64 mb-4">
                  {/* Hexagon Frame Effect */}
                  <div className="absolute inset-0 border-4 border-inazuma-blue/30 rotate-45 transform scale-105"></div>
                  <div className="absolute inset-0 border-4 border-inazuma-yellow/30 rotate-12 transform scale-110 opacity-50"></div>
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  />
                </div>
                
                <div className="flex items-center gap-2 mb-1">
                   {/* Gender Icon */}
                   <img src={getGenderIcon(character.gender)} alt={character.gender} className="w-6 h-6 object-contain drop-shadow-md" />
                   <h2 className="text-3xl font-black italic text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-inazuma-blue">
                     {character.name}
                   </h2>
                </div>
                
                <h3 className="text-xl text-inazuma-yellow tracking-widest uppercase font-bold mb-4">
                  {character.nickname}
                </h3>
                
                <div className="flex gap-4 mb-4">
                  <div className="flex flex-col items-center justify-center bg-inazuma-dark p-2 rounded border border-inazuma-blue/40 min-w-[80px]">
                     <span className="text-xs text-inazuma-blue/70 mb-1">POS</span>
                     <span className="font-bold text-lg">{character.position}</span>
                  </div>
                   <div className="flex flex-col items-center justify-center bg-inazuma-dark p-2 rounded border border-inazuma-blue/40 min-w-[80px]">
                     <span className="text-xs text-inazuma-blue/70 mb-1">ELM</span>
                     <img src={getElementIcon(character.element)} alt={character.element} className="w-8 h-8 object-contain" />
                     {/* <span className="font-bold text-xs mt-1">{character.element}</span> */}
                  </div>
                </div>

                <div className="text-center text-sm text-gray-400 italic px-4 mb-4">
                   "{character.team}"
                </div>

                {/* Description & How to Obtain */}
                 <div className="w-full px-4 mt-2 text-xs text-gray-300 space-y-2">
                    {character.description && (
                      <div className="p-3 bg-inazuma-blue/5 rounded border border-inazuma-blue/10">
                        <p className="italic text-center leading-relaxed">"{character.description}"</p>
                      </div>
                    )}
                    {character.howToObtain && (
                      <div className="p-3 bg-inazuma-yellow/5 rounded border border-inazuma-yellow/10">
                         <span className="text-inazuma-yellow font-bold block mb-1 text-center">HOW TO SCOUT</span>
                         <p className="text-center">{character.howToObtain}</p>
                      </div>
                    )}
                  </div>
              </div>

              {/* Right Column: Collapsible Stats */}
              <div className="w-full md:w-7/12 p-6 md:p-10 md:pt-16 flex flex-col justify-start">
                 
                 {/* Stats Accordion */}
                 <div className="mt-4 w-full">
                    <button 
                      onClick={() => setShowStats(!showStats)}
                      className="w-full flex items-center justify-between p-4 bg-inazuma-dark border border-inazuma-blue/30 rounded-lg hover:bg-inazuma-blue/10 transition-colors group relative z-10"
                    >
                        <div className="flex items-center gap-2">
                             <Activity className="text-inazuma-yellow" />
                             <span className="font-bold text-lg tracking-widest text-white group-hover:text-inazuma-blue transition-colors">BATTLE STATS</span>
                        </div>
                        {showStats ? <ChevronUp className="text-inazuma-blue" /> : <ChevronDown className="text-inazuma-blue" />}
                    </button>

                    <AnimatePresence>
                        {showStats && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 border-x border-b border-inazuma-blue/30 rounded-b-lg bg-black/20 grid grid-cols-1 gap-4">
                                     <StatBar label="Kick" value={character.stats.kick} icon={<Zap size={16} />} color="bg-red-500" />
                                     <StatBar label="Control" value={character.stats.control} icon={<Brain size={16} />} color="bg-blue-500" /> 
                                     <StatBar label="Technique" value={character.stats.technique} icon={<Activity size={16} />} color="bg-green-500" />
                                     <StatBar label="Pressure" value={character.stats.pressure} icon={<Shield size={16} />} color="bg-purple-500" />
                                     <StatBar label="Physical" value={character.stats.physical} icon={<User size={16} />} color="bg-orange-500" />
                                     <StatBar label="Speed" value={character.stats.agility} icon={<Footprints size={16} />} color="bg-cyan-500" />
                                     
                                     <div className="mt-2 text-center text-xs text-gray-500 italic">
                                         * Stats imported from game data. May be 0 if unknown.
                                     </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                 </div>

                 {/* Extra Space or decorative content can go here if stats are closed */}
                 {!showStats && (
                     <div className="flex-1 flex items-center justify-center opacity-30 mt-8">
                         <div className="w-32 h-32 border-4 border-dashed border-gray-600 rounded-full animate-spin-slow"></div>
                     </div>
                 )}

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

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
