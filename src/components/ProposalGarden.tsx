import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Flower } from 'lucide-react';
import { ProposalConfig } from '../types';

interface ProposalGardenProps {
  config: ProposalConfig;
  onNext: () => void;
  reducedMotion?: boolean;
}

export const ProposalGarden: React.FC<ProposalGardenProps> = ({
  config,
  onNext,
  reducedMotion = false,
}) => {
  const [lineIndex, setLineIndex] = useState<number>(0);
  const total = config.gardenLines.length;

  useEffect(() => {
    if (reducedMotion) {
      setLineIndex(total - 1);
      return;
    }

    const interval = setInterval(() => {
      setLineIndex(prev => {
        if (prev < total - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [total, reducedMotion]);

  const allShown = lineIndex >= total - 1;

  return (
    <div className="relative max-w-3xl w-full mx-auto px-4 py-8 flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8FB8]/15 border border-[#FF8FB8]/30 text-xs font-medium text-[#FFD6E7] mb-2">
          <Flower className="w-3.5 h-3.5 text-[#FF8FB8]" />
          <span>Twilight Garden</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#FFF8FC] drop-shadow-md">
          {config.gardenTitle}
        </h2>
      </div>

      {/* Progressive Emotional Narrative Lines */}
      <div className="w-full space-y-4 sm:space-y-6">
        {config.gardenLines.map((line, idx) => {
          if (idx > lineIndex) return null;
          const isPivot = idx === 4; // "And that's what happened to me."
          const isEnding = idx === total - 1;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {isPivot ? (
                <div className="py-2">
                  <p className="font-serif text-2xl sm:text-3xl text-romantic-gradient font-semibold tracking-wide">
                    {line}
                  </p>
                </div>
              ) : isEnding ? (
                <div className="glass-card p-4 sm:p-5 rounded-2xl border border-[#FF8FB8]/40 shadow-glow-pink max-w-xl mx-auto mt-4">
                  <p className="font-serif italic text-base sm:text-lg text-[#FFF8FC]">
                    {line}
                  </p>
                </div>
              ) : (
                <p className="font-serif text-base sm:text-xl text-[#FFD6E7]/90 leading-relaxed max-w-xl mx-auto">
                  {line}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Advance to Proposal Question Button */}
      {allShown ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-center"
        >
          <button
            onClick={onNext}
            className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full text-base sm:text-lg font-medium text-white glass-button focus:outline-none focus:ring-2 focus:ring-[#FF8FB8] cursor-pointer shadow-glow-heart"
          >
            <Heart className="w-5 h-5 text-[#FF8FB8] fill-[#FF8FB8] animate-pulse" />
            <span>{config.gardenNextButtonText}</span>
            <ArrowRight className="w-4 h-4 text-[#FFD6E7] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      ) : (
        <div className="mt-8 text-center">
          <button
            onClick={() => setLineIndex(total - 1)}
            className="text-xs text-[#DCD6FF]/40 hover:text-[#DCD6FF]/80 transition-colors focus:outline-none"
          >
            tap to read full passage
          </button>
        </div>
      )}
    </div>
  );
};
