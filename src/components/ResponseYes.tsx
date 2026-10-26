import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, PartyPopper } from 'lucide-react';
import { ProposalConfig } from '../types';
import { fireRomanticCelebration } from '../utils/particles';

interface ResponseYesProps {
  config: ProposalConfig;
  onReplay: () => void;
  reducedMotion?: boolean;
}

export const ResponseYes: React.FC<ResponseYesProps> = ({
  config,
  onReplay,
}) => {
  useEffect(() => {
    // Trigger celebration particles on mount
    fireRomanticCelebration();
  }, []);

  return (
    <div className="relative max-w-2xl w-full mx-auto px-4 py-8 flex flex-col items-center text-center">
      {/* Joyful Celebration Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: 'spring',
          damping: 18,
          stiffness: 90,
          duration: 0.8,
        }}
        className="w-full glass-card p-6 sm:p-10 rounded-3xl border border-[#FF8FB8]/60 shadow-glow-heart relative overflow-hidden"
      >
        {/* Celebration Badges */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF8FB8]/30 to-[#A99AEF]/30 border border-[#FF8FB8]/50 text-xs font-semibold text-[#FFF8FC] mb-5 shadow-sm">
          <PartyPopper className="w-4 h-4 text-[#FF8FB8] animate-bounce" />
          <span>Our Love Story Begins Today</span>
          <PartyPopper className="w-4 h-4 text-[#FF8FB8] animate-bounce" />
        </div>

        {/* Big Joyful Headlines */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-romantic-gradient tracking-tight"
        >
          {config.yesTitle}
        </motion.h1>

        <p className="font-serif italic text-xl sm:text-2xl text-[#FFD6E7] mt-3">
          {config.yesSubtitle}
        </p>

        {/* Heartfelt Paragraphs */}
        <div className="space-y-4 my-6 text-sm sm:text-base text-[#FFF8FC]/90 font-light leading-relaxed max-w-xl mx-auto border-t border-b border-white/10 py-5">
          {config.yesParagraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Closing Romantic Affirmation */}
        <p className="font-serif text-lg sm:text-xl text-[#FF8FB8] font-medium italic mb-6">
          “{config.yesEnding}”
        </p>

        {/* Final Branding & Seal */}
        <div className="flex flex-col items-center justify-center gap-2 my-4">
          <div className="w-12 h-12 rounded-full bg-[#FF8FB8]/20 flex items-center justify-center border border-[#FF8FB8]/50 shadow-inner">
            <Heart className="w-6 h-6 text-[#FF8FB8] fill-[#FF8FB8] animate-pulse" />
          </div>
          <span className="font-serif tracking-widest text-sm text-[#FFD6E7] font-semibold">
            Our Little Universe 💗
          </span>
        </div>

        {/* Replay Button */}
        <div className="mt-6 pt-4">
          <button
            onClick={onReplay}
            className="glass-button px-6 py-3 rounded-full text-sm font-medium text-[#FFF8FC] inline-flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF8FB8]"
            aria-label="Replay experience from beginning"
          >
            <RotateCcw className="w-4 h-4 text-[#FF8FB8]" />
            <span>{config.replayButtonText}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
