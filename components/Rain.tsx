import React, { useMemo } from 'react';

export const Rain: React.FC = () => {
  const drops = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${1 + Math.random()}s`,
      };
      return <div key={i} className="rain-drop" style={style}></div>;
    });
  }, []);

  return <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">{drops}</div>;
};
