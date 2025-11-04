import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-glow-purple text-purple-300 tracking-widest uppercase">
        NeoRevive
      </h1>
      <p className="mt-2 text-lg md:text-xl text-orange-300 text-glow-orange tracking-wider">
        Future of Memories
      </p>
    </header>
  );
};
