import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCharacters } from '../../api/characterApi';
import { CharacterModal } from '../ui/CharacterModal';
import type { Character } from '../../types';

export const ScoutView: React.FC = () => {
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Initial check to get total count
  useEffect(() => {
    getCharacters(0, 1)
      .then(data => {
        setTotalCount(data.totalElements);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to connect to API", err);
        setIsLoading(false);
      });
  }, []);

  const handleRandomScout = async () => {
    if (isAnimating || totalCount === 0) return;
    setIsAnimating(true);
    
    // Simulate "Scouting" effect delay while we fetch
    // We start fetching immediately but wait at least 1.5s for the animation
    const minAnimationTime = 1500;
    const startTime = Date.now();

    try {
        // Pick a random index (page)
        const randomPage = Math.floor(Math.random() * totalCount);
        const response = await getCharacters(randomPage, 1);
        
        const character = response.content[0];
        
        // Calculate remaining wait time
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minAnimationTime - elapsed);

        setTimeout(() => {
            if (character) {
                setSelectedChar(character);
                setIsModalOpen(true);
            }
            setIsAnimating(false);
        }, remaining);

    } catch (error) {
        console.error("Scout failed", error);
        setIsAnimating(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] px-4">
      
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
          disabled={isAnimating || isLoading || totalCount === 0}
          className={`
            relative z-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full flex items-center justify-center
            bg-inazuma-dark border-4 border-inazuma-blue
            text-3xl sm:text-4xl font-black italic text-inazuma-blue
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

      <p className="mt-6 sm:mt-8 text-inazuma-blue/60 text-base sm:text-lg uppercase tracking-widest animate-pulse text-center">
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
