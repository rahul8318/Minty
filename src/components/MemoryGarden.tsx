import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X, Flower2, ArrowRight } from 'lucide-react';
import { ProposalConfig, MemoryBubbleItem } from '../types';
import { fireHeartSparkle } from '../utils/particles';

interface MemoryGardenProps {
  config: ProposalConfig;
  onNext: () => void;
  reducedMotion?: boolean;
}

export const MemoryGarden: React.FC<MemoryGardenProps> = ({
  config,
  onNext,
  reducedMotion = false,
}) => {
  const [selectedBubble, setSelectedBubble] = useState<MemoryBubbleItem | null>(null);
  const [openedIds, setOpenedIds] = useState<number[]>([]);
  const [bloomingFlowers, setBloomingFlowers] = useState<{ [id: number]: boolean }>({});

  const handleBubbleClick = (bubble: MemoryBubbleItem, e: React.MouseEvent) => {
    setSelectedBubble(bubble);
    if (!openedIds.includes(bubble.id)) {
      setOpenedIds(prev => [...prev, bubble.id]);
    }

    // Trigger flower bloom animation
    setBloomingFlowers(prev => ({ ...prev, [bubble.id]: true }));

    // Trigger sweet heart confetti sparkle from click location
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    fireHeartSparkle(x, y);
  };

  const handleCloseModal = () => {
    setSelectedBubble(null);
  };

  return (
    <div className="relative max-w-5xl w-full mx-auto px-4 py-4 flex flex-col items-center">
      {/* Title & Instructions */}
      <div className="text-center mb-8 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8FB8]/15 border border-[#FF8FB8]/30 text-xs font-medium text-[#FFD6E7] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#FF8FB8]" />
          <span>Interactive Memory Garden</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#FFF8FC] drop-shadow-md">
          {config.bubblesSectionTitle}
        </h2>
        <p className="text-xs sm:text-sm text-[#DCD6FF]/80 mt-2">
          {config.bubblesSectionSubtitle}
        </p>
      </div>

      {/* Grid / Constellation of Glowing Bubbles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full max-w-4xl">
        {config.memoryBubbles.map((bubble, idx) => {
          const isOpened = openedIds.includes(bubble.id);
          const isBlooming = bloomingFlowers[bubble.id];

          return (
            <motion.div
              key={bubble.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={reducedMotion ? {} : { scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => handleBubbleClick(bubble, e)}
              className={`relative cursor-pointer p-6 rounded-3xl glass-bubble transition-all duration-300 group flex flex-col justify-between min-h-[170px] ${
                isOpened ? 'border-[#FF8FB8]/60 shadow-glow-pink' : 'hover:border-[#FFD6E7]/50'
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleBubbleClick(bubble, e as unknown as React.MouseEvent);
                }
              }}
              aria-label={`Open bubble ${bubble.id}: ${bubble.title}`}
            >
              {/* Bubble Highlight Shimmer */}
              <div className="absolute top-2 left-4 w-12 h-4 rounded-full bg-white/20 blur-[1px] transform -rotate-12 pointer-events-none" />

              {/* Header with Blooming Flower */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#DCD6FF]/70">
                  Memory #{bubble.id}
                </span>
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-500 ${
                    isBlooming ? 'scale-125 rotate-45' : 'group-hover:scale-110'
                  }`}
                  style={{ backgroundColor: `${bubble.flowerColor}25` }}
                >
                  <Flower2
                    className="w-5 h-5 transition-colors"
                    style={{ color: bubble.flowerColor }}
                  />
                </div>
              </div>

              {/* Bubble Content Preview */}
              <div className="my-2">
                <h3 className="font-serif text-lg font-medium text-[#FFF8FC] group-hover:text-[#FFD6E7] transition-colors">
                  {bubble.title}
                </h3>
                <p className="text-xs text-[#FFF8FC]/70 mt-1 line-clamp-2">
                  {bubble.quote}
                </p>
              </div>

              {/* Footer hint */}
              <div className="flex items-center justify-between text-[11px] text-[#FF8FB8] pt-2 border-t border-white/10">
                <span className="flex items-center gap-1 font-medium">
                  <Heart className={`w-3 h-3 ${isOpened ? 'fill-[#FF8FB8]' : ''}`} />
                  {isOpened ? 'Reflect again' : 'Touch to read'}
                </span>
                <span className="text-white/40 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Advance to Letter button */}
      <div className="mt-10 text-center">
        <button
          onClick={onNext}
          className="glass-button px-8 py-3.5 rounded-full text-base font-medium text-[#FFF8FC] inline-flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#FF8FB8] shadow-lg"
        >
          <span>{config.bubblesNextButtonText}</span>
          <ArrowRight className="w-4 h-4 text-[#FF8FB8]" />
        </button>
      </div>

      {/* Detailed Modal Dialog for Selected Bubble */}
      <AnimatePresence>
        {selectedBubble && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-lg w-full glass-card p-7 sm:p-9 rounded-3xl border border-[#FF8FB8]/40 shadow-2xl overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="bubble-dialog-title"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-[#FF8FB8]"
                aria-label="Close message"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Flower Icon */}
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-white/10 shadow-inner">
                <Flower2
                  className="w-8 h-8 animate-spin-very-slow"
                  style={{ color: selectedBubble.flowerColor }}
                />
              </div>

              {/* Title */}
              <div className="text-center mb-4">
                <span className="text-xs uppercase tracking-widest text-[#FF8FB8] font-semibold">
                  Memory #{selectedBubble.id}
                </span>
                <h3 id="bubble-dialog-title" className="font-serif text-2xl font-medium text-[#FFF8FC] mt-1">
                  {selectedBubble.title}
                </h3>
              </div>

              {/* Full Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8FC]/5 border border-white/10 mb-6">
                <p className="font-serif italic text-base sm:text-lg text-[#FFD6E7] text-center leading-relaxed">
                  “{selectedBubble.quote}”
                </p>
              </div>

              {/* Close CTA */}
              <div className="text-center">
                <button
                  onClick={handleCloseModal}
                  className="glass-button px-6 py-2.5 rounded-full text-sm font-medium text-[#FFF8FC] focus:outline-none"
                >
                  Keep in my heart 💗
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
