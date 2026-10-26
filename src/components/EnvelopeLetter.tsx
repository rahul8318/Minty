import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, Mail } from 'lucide-react';
import { ProposalConfig } from '../types';
import { fireRomanticCelebration } from '../utils/particles';

interface EnvelopeLetterProps {
  config: ProposalConfig;
  onNext: () => void;
  reducedMotion?: boolean;
}

export const EnvelopeLetter: React.FC<EnvelopeLetterProps> = ({
  config,
  onNext,
  reducedMotion = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Small celebratory flutter when opening letter
      setTimeout(() => {
        fireRomanticCelebration();
      }, 500);
    }
  };

  return (
    <div className="relative max-w-3xl w-full mx-auto px-4 py-6 flex flex-col items-center">
      {/* Surrounding Romantic Atmosphere: Candle Glows & Petals */}
      <div className="absolute -top-12 -left-8 w-64 h-64 bg-[#FF8FB8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-8 w-64 h-64 bg-[#A99AEF]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Prompt */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF8FB8]/15 border border-[#FF8FB8]/30 text-xs font-medium text-[#FFD6E7] mb-2">
          <Mail className="w-3.5 h-3.5 text-[#FF8FB8]" />
          <span>Handwritten Confession</span>
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#FFF8FC]">
          {config.letterTeaser}
        </h2>
        {!isOpen && (
          <p className="text-xs sm:text-sm text-[#DCD6FF]/80 mt-1 animate-pulse">
            (Touch the envelope seal to open)
          </p>
        )}
      </div>

      {/* 3D Envelope Container */}
      <div className="w-full flex justify-center perspective-1000 my-4">
        {!isOpen ? (
          /* Sealed Floating Envelope */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: tilt.x,
              rotateY: tilt.y,
              y: [0, -8, 0],
            }}
            transition={{
              y: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
              rotateX: { duration: 0.2 },
              rotateY: { duration: 0.2 },
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleOpenEnvelope}
            className="w-full max-w-md h-64 sm:h-72 rounded-2xl relative cursor-pointer glass-card border border-[#FFD6E7]/40 shadow-glow-lavender flex items-center justify-center p-6 transition-all duration-300 hover:shadow-glow-pink"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenEnvelope();
              }
            }}
            aria-label="Open letter envelope"
          >
            {/* Top Flap Graphic Simulation */}
            <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-[#FFD6E7]/30 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl pointer-events-none" />

            {/* Center Wax Seal */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#FF8FB8] to-[#E11D48] flex items-center justify-center shadow-lg border-2 border-[#FFF8FC]/60 transform group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white drop-shadow" />
              </div>
              <span className="mt-3 font-serif tracking-widest text-xs font-semibold text-[#FFD6E7]">
                {config.letterStampText}
              </span>
            </div>

            {/* Corner Decorative Stamps */}
            <div className="absolute top-4 right-4 px-2 py-1 border border-dashed border-[#FFD6E7]/40 rounded text-[10px] text-[#FFD6E7]/70 font-mono">
              SPECIAL DELIVERY
            </div>
            <div className="absolute bottom-4 left-4 text-[11px] text-[#DCD6FF]/70 font-handwritten text-lg">
              To my favorite human 💌
            </div>
          </motion.div>
        ) : (
          /* Unfolded Stationary Paper Letter */
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-[#FFF8FC] text-[#21172F] rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-[#FFD6E7] relative overflow-hidden"
          >
            {/* Stationery Watermark and Decorative Borders */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF8FB8]/10 rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#DCD6FF]/20 rounded-tr-full pointer-events-none" />

            {/* Top Greeting */}
            <div className="border-b border-[#FF8FB8]/30 pb-4 mb-6 flex items-center justify-between">
              <h3 className="font-handwritten text-3xl sm:text-4xl text-[#21172F] font-bold">
                {config.letterGreeting}
              </h3>
              <div className="flex items-center gap-1.5 text-[#FF8FB8]">
                <Heart className="w-5 h-5 fill-[#FF8FB8]" />
              </div>
            </div>

            {/* Letter Body Paragraphs */}
            <div className="space-y-4 font-handwritten text-xl sm:text-2xl text-[#21172F]/90 leading-relaxed max-h-[50vh] overflow-y-auto pr-3">
              {config.letterParagraphs.map((paragraph, idx) => {
                const isLoveDeclaration = paragraph.toLowerCase().includes("i love you");
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className={
                      isLoveDeclaration
                        ? "my-4 p-4 rounded-2xl bg-gradient-to-r from-[#FFD6E7]/50 via-[#FF8FB8]/20 to-[#FFD6E7]/50 border-2 border-[#FF8FB8]/50 shadow-inner text-center"
                        : ""
                    }
                  >
                    <p
                      className={
                        isLoveDeclaration
                          ? "font-bold text-2xl sm:text-3xl text-[#E11D48] tracking-wide drop-shadow-sm"
                          : ""
                      }
                    >
                      {paragraph}
                    </p>
                  </motion.div>
                );
              })}

              <div className="pt-4 text-right">
                <p className="italic text-lg text-[#21172F]/70">{config.letterSignoff}</p>
                <p className="font-bold text-2xl text-[#E11D48] mt-1">
                  {config.showNames ? config.myName : "Someone Who Cares About You 💗"}
                </p>
              </div>
            </div>

            {/* Bottom Proposal Garden Teaser & Button */}
            <div className="mt-8 pt-6 border-t border-[#FF8FB8]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-[#21172F]/80">
                <Sparkles className="w-4 h-4 text-[#FF8FB8]" />
                <span>{config.letterBottomPrompt}</span>
              </div>
              <button
                onClick={onNext}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#FF8FB8] to-[#A99AEF] hover:from-[#f472b6] hover:to-[#8b5cf6] text-white font-medium text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FF8FB8]"
              >
                <span>{config.letterNextButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
