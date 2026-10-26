import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ProposalConfig } from '../types';
import { romanticAudio } from '../utils/audio';

interface OpeningSceneProps {
  config: ProposalConfig;
  onEnterUniverse: () => void;
  reducedMotion?: boolean;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({
  config,
  onEnterUniverse,
  reducedMotion = false,
}) => {
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [showButton, setShowButton] = useState<boolean>(false);

  // Progressive timed reveal of the opening lines with gentle romantic pauses
  useEffect(() => {
    if (reducedMotion) {
      setLineIndex(config.openingLines.length - 1);
      setShowButton(true);
      return;
    }

    const t1 = setTimeout(() => setLineIndex(1), 1800);
    const t2 = setTimeout(() => setLineIndex(2), 3900);
    const t3 = setTimeout(() => setShowButton(true), 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [config.openingLines.length, reducedMotion]);

  const handleEnter = () => {
    // Start procedural audio gently if not yet playing
    if (!romanticAudio.playing) {
      romanticAudio.play(config.musicUrl);
    }
    onEnterUniverse();
  };

  return (
    <div className="relative max-w-2xl w-full mx-auto text-center flex flex-col items-center justify-center min-h-[70vh]">
      {/* Visual spacer to frame the floating 3D glass heart in the center */}
      <div className="h-44 sm:h-52 w-full flex items-center justify-center pointer-events-none" />

      {/* Progressive Text Reveals */}
      <div className="space-y-4 sm:space-y-6 px-4">
        {config.openingLines.map((line, idx) => {
          if (idx > lineIndex) return null;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {idx === 0 ? (
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#FFF8FC] drop-shadow-[0_4px_16px_rgba(255,143,184,0.4)]">
                  {line}
                </h1>
              ) : idx === 1 ? (
                <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#FFD6E7] drop-shadow-[0_2px_12px_rgba(220,214,255,0.4)]">
                  {line}
                </p>
              ) : (
                <p className="text-sm sm:text-base md:text-lg text-[#DCD6FF]/90 font-light max-w-lg mx-auto leading-relaxed">
                  {line}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Enter Button */}
      {showButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 sm:mt-10"
        >
          <button
            onClick={handleEnter}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-base sm:text-lg font-medium text-[#FFF8FC] glass-button focus:outline-none focus:ring-2 focus:ring-[#FF8FB8] cursor-pointer"
            aria-label="Enter our little universe"
          >
            <Sparkles className="w-5 h-5 text-[#FFD6E7] animate-pulse" />
            <span>{config.enterButtonText}</span>
            <ArrowRight className="w-4 h-4 text-[#FF8FB8] group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF8FB8]/20 to-[#A99AEF]/20 blur-md -z-10 group-hover:blur-lg transition-all" />
          </button>
        </motion.div>
      )}

      {/* Subtle skip / speedup helper for fast preview */}
      {!showButton && (
        <button
          onClick={() => {
            setLineIndex(config.openingLines.length - 1);
            setShowButton(true);
          }}
          className="mt-8 text-xs text-[#DCD6FF]/40 hover:text-[#DCD6FF]/80 transition-colors focus:outline-none"
          title="Click to reveal all text"
        >
          tap to reveal
        </button>
      )}
    </div>
  );
};
