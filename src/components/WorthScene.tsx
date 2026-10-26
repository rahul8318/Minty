import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { ProposalConfig } from '../types';

interface WorthSceneProps {
  config: ProposalConfig;
  onNext: () => void;
  reducedMotion?: boolean;
}

export const WorthScene: React.FC<WorthSceneProps> = ({
  config,
  onNext,
  reducedMotion = false,
}) => {
  const [visibleCount, setVisibleCount] = useState<number>(1);
  const totalLines = config.worthLines.length;

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCount(totalLines);
      return;
    }

    const interval = setInterval(() => {
      setVisibleCount(prev => {
        if (prev < totalLines) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [totalLines, reducedMotion]);

  const allVisible = visibleCount >= totalLines;

  return (
    <div className="relative max-w-2xl w-full mx-auto px-4 py-8">
      {/* Glassmorphic Parchment Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="glass-card p-6 sm:p-10 rounded-3xl border border-[#FFD6E7]/25 shadow-2xl relative overflow-hidden"
      >
        {/* Soft decorative background glows */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#FF8FB8]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#A99AEF]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Heart className="w-4 h-4 text-[#FF8FB8] fill-[#FF8FB8]/40 animate-pulse" />
          <span className="text-xs tracking-widest uppercase font-semibold text-[#DCD6FF]">
            {config.worthTitle}
          </span>
          <Heart className="w-4 h-4 text-[#FF8FB8] fill-[#FF8FB8]/40 animate-pulse" />
        </div>

        {/* Romantic Lines revealed with rhythm */}
        <div className="space-y-4 sm:space-y-5 text-center">
          {config.worthLines.map((line, index) => {
            if (index >= visibleCount) return null;
            const isFirst = index === 0;
            const isCenterpiece = index === 4; // "But because you're you."
            const isLast = index === totalLines - 1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {isFirst ? (
                  <p className="font-serif italic text-lg sm:text-xl text-[#FFD6E7] mb-2">
                    {line}
                  </p>
                ) : isCenterpiece ? (
                  <p className="font-serif text-2xl sm:text-3xl text-romantic-gradient font-medium py-1">
                    “{line}”
                  </p>
                ) : isLast ? (
                  <p className="text-sm sm:text-base text-[#FFF8FC] font-medium leading-relaxed bg-[#FFF8FC]/5 p-3 rounded-2xl border border-white/10 mt-3">
                    {line}
                  </p>
                ) : (
                  <p className="text-sm sm:text-base text-[#FFF8FC]/85 font-light leading-relaxed">
                    {line}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Advance Button */}
        {allVisible ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 text-center"
          >
            <button
              onClick={onNext}
              className="glass-button px-7 py-3 rounded-full text-sm sm:text-base font-medium text-[#FFF8FC] inline-flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF8FB8]"
            >
              <span>{config.worthNextButtonText}</span>
              <ArrowRight className="w-4 h-4 text-[#FF8FB8]" />
            </button>
          </motion.div>
        ) : (
          <div className="mt-6 text-center">
            <button
              onClick={() => setVisibleCount(totalLines)}
              className="text-xs text-[#DCD6FF]/40 hover:text-[#DCD6FF]/80 transition-colors focus:outline-none"
            >
              tap to reveal all lines
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
