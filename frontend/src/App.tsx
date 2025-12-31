import { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { ScoutView } from './components/features/ScoutView';
import { Encyclopedia } from './components/features/Encyclopedia';
// import type { Character } from './types'; // Removed unused

function App() {
  const [activeTab, setActiveTab] = useState<'scout' | 'encyclopedia'>('scout');

  return (
    <MainLayout>
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8 gap-4">
        <button
          onClick={() => setActiveTab('scout')}
          className={`px-8 py-3 text-lg font-bold uppercase transition-all duration-300 clip-diagonal-button ${
            activeTab === 'scout'
              ? 'bg-inazuma-blue text-inazuma-dark shadow-neon-blue'
              : 'bg-inazuma-dark border border-inazuma-blue/50 text-inazuma-blue hover:bg-inazuma-blue/20'
          }`}
        >
          Random Scout
        </button>
        <button
          onClick={() => setActiveTab('encyclopedia')}
          className={`px-8 py-3 text-lg font-bold uppercase transition-all duration-300 clip-diagonal-button ${
            activeTab === 'encyclopedia'
              ? 'bg-inazuma-yellow text-inazuma-dark shadow-neon-yellow'
              : 'bg-inazuma-dark border border-inazuma-yellow/50 text-inazuma-yellow hover:bg-inazuma-yellow/20'
          }`}
        >
          Encyclopedia
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center w-full">
        {activeTab === 'scout' ? (
          <ScoutView />
        ) : (
          <Encyclopedia />
        )}
      </div>
    </MainLayout>
  );
}

export default App;
