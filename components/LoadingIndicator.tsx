import React from 'react';

const GlitchText = ({ text }: { text: string }) => (
    <div className="relative text-2xl md:text-3xl font-orbitron uppercase text-purple-300 text-glow-purple">
      <span className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 33%, 0 33%)' }}>{text}</span>
      <span className="absolute inset-0" style={{ clipPath: 'polygon(0 33%, 100% 33%, 100% 66%, 0 66%)' }}>{text}</span>
      <span className="absolute inset-0" style={{ clipPath: 'polygon(0 66%, 100% 66%, 100% 100%, 0 100%)' }}>{text}</span>
    </div>
);

export const LoadingIndicator: React.FC = () => {
    const text = "Enhancing Photons...";
    return (
        <div className="w-full h-96 glass-ui rounded-lg flex flex-col items-center justify-center p-8 space-y-4">
             <style>{`
                .glitch {
                    position: relative;
                    animation: glitch-anim 1.5s infinite linear alternate-reverse;
                }
                .glitch:before,
                .glitch:after {
                    content: '${text}';
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0.8;
                }
                .glitch:before {
                    animation: glitch-anim-2 1s infinite linear alternate-reverse;
                    color: #f97316; /* orange-500 */
                    z-index: -1;
                }
                .glitch:after {
                    animation: glitch-anim-3 2s infinite linear alternate-reverse;
                    color: #0ea5e9; /* sky-500 */
                    z-index: -2;
                }
                @keyframes glitch-anim {
                    100% { transform: translate(-2px, 2px); }
                }
                @keyframes glitch-anim-2 {
                    100% { clip-path: polygon(0 40%, 100% 40%, 100% 100%, 0 100%); transform: translate(2px, -2px); }
                }
                @keyframes glitch-anim-3 {
                    100% { clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%); transform: translate(-2px, 0); }
                }
             `}</style>
            <div className="text-2xl md:text-3xl font-orbitron uppercase text-purple-300 text-glow-purple glitch">
                {text}
            </div>
            <p className="text-gray-400">AI is analyzing your memory...</p>
        </div>
    );
};
