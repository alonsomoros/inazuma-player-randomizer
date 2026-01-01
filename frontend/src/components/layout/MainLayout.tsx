import React from 'react';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen relative bg-inazuma-dark flex flex-col font-orbitron">
      {/* Background Effects - Fixed so they don't scroll away */}
      <div className="fixed inset-0 bg-hex-pattern opacity-10 pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-inazuma-blue/10 to-transparent pointer-events-none"></div>
      
      {/* Header - Sticky */}
      <header className="sticky top-0 z-50 p-4 sm:p-6 flex flex-col sm:flex-row justify-center items-center gap-4 border-b border-inazuma-blue/30 bg-inazuma-dark/90 backdrop-blur-md">
        <img 
          src="https://static.wikia.nocookie.net/inazuma-eleven/images/4/41/Raimon_emblem_%28VR%29.png" 
          alt="Raimon Emblem" 
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-[0_0_8px_rgba(0,242,255,0.4)]"
        />
        <h1 className="text-xl sm:text-2xl md:text-4xl font-black italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-inazuma-yellow to-inazuma-lightning drop-shadow-[0_0_10px_rgba(255,238,0,0.5)] text-center">
          INAZUMA <span className="text-white">RANDOMIZER</span>
        </h1>
        <div className="absolute top-0 left-0 w-32 h-1 bg-inazuma-blue clip-diagonal opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-32 h-1 bg-inazuma-yellow clip-diagonal opacity-50"></div>
      </header>

      {/* Main Content Area - Full width wrapper */}
      <div className="flex-1 w-full max-w-[1920px] mx-auto flex flex-col">
        <main className="flex-1 relative z-10 p-4">
          {children}
        </main>
        
        {/* Footer - Part of the flow */}
        <footer className="relative z-10 p-6 border-t border-inazuma-blue/10 bg-inazuma-dark/50 text-center">
          <p className="text-inazuma-blue/60 text-xs font-light tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Inazuma Randomizer Protocol • System ID: V-ROAD-001
          </p>
        </footer>
      </div>
    </div>
  );
};
