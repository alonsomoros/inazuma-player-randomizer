import React from 'react';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen relative bg-inazuma-dark flex flex-col font-orbitron">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hex-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-inazuma-blue/10 to-transparent pointer-events-none"></div>
      
      {/* Header */}
      <header className="relative z-10 p-4 sm:p-6 flex flex-col sm:flex-row justify-center items-center gap-4 border-b border-inazuma-blue/30 bg-inazuma-dark/80 backdrop-blur-sm">
        <img 
          src="https://static.wikia.nocookie.net/inazuma-eleven/images/4/41/Raimon_emblem_%28VR%29.png" 
          alt="Raimon Emblem" 
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-[0_0_8px_rgba(0,242,255,0.4)]"
        />
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-inazuma-yellow to-inazuma-lightning drop-shadow-[0_0_10px_rgba(255,238,0,0.5)] text-center">
          INAZUMA <span className="text-white">RANDOMIZER</span>
        </h1>
        <div className="absolute top-0 left-0 w-32 h-1 bg-inazuma-blue clip-diagonal"></div>
        <div className="absolute bottom-0 right-0 w-32 h-1 bg-inazuma-yellow clip-diagonal"></div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 w-full max-w-[1920px] mx-auto p-4 pb-20">
        {children}
      </main>

      {/* Footer / Decor */}
      <div className="absolute bottom-0 left-0 p-4 text-inazuma-blue/40 text-xs">
        System ID: V-ROAD-001
      </div>
    </div>
  );
};
