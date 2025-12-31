import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockCharacters } from '../../data/mockCharacters';
import { loadCharacters } from '../../utils/csvLoader';
import { CharacterModal } from '../ui/CharacterModal';
import type { Character } from '../../types';

export const ScoutView: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>(mockCharacters); // Fallback to mock
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCharacters()
      .then(data => {
        if (data.length > 0) {
          setCharacters(data);
          console.log(`Loaded ${data.length} characters.`);
        }
      })
      .catch(err => console.error("Failed to load CSV", err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleRandomScout = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Simulate "Scouting" effect delay
    setTimeout(() => {
      const random = characters[Math.floor(Math.random() * characters.length)];
      setSelectedChar(random);
      setIsModalOpen(true);
      setIsAnimating(false);
    }, 1500); // 1.5s delay for effect
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh]">
      
      {/* Central Scout Button Container */}
      <div className="relative group">
        
        {/* Animated Rings */}
        {isAnimating && (
          <>
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-4 border-dashed border-inazuma-blue/50 z-0"
            />
            <motion.div 
              animate={{ rotate: -360, scale: [1.2, 1.8, 1.2], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-inazuma-yellow/50 z-0"
            />
          </>
        )}

        <button
          onClick={handleRandomScout}
          disabled={isAnimating || isLoading}
          className={`
            relative z-10 w-64 h-64 rounded-full flex items-center justify-center
            bg-inazuma-dark border-4 border-inazuma-blue
            text-4xl font-black italic text-inazuma-blue
            shadow-[0_0_30px_#00f2ff]
            transition-all duration-300
            hover:scale-105 hover:shadow-[0_0_60px_#00f2ff] hover:text-white hover:bg-inazuma-blue
            active:scale-95
            disabled:opacity-80 disabled:cursor-not-allowed
            ${(isAnimating || isLoading) ? 'animate-pulse bg-inazuma-blue/20' : ''}
          `}
        >
          <span className="drop-shadow-lg filter">
            {isLoading ? 'LOADING...' : (isAnimating ? 'SCOUTING...' : 'RANDOM!')}
          </span>
        </button>
      </div>

      <p className="mt-8 text-inazuma-blue/60 text-lg uppercase tracking-widest animate-pulse">
        {isAnimating ? 'Searching Database...' : 'Press to Scout Player'}
      </p>

      <CharacterModal 
        character={selectedChar} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};
