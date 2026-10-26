import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, Sparkles, Mail, X } from 'lucide-react';
import { ProposalConfig } from '../types';

interface ProposalQuestionProps {
  config: ProposalConfig;
  onAnswerYes: () => void;
  onAnswerTime: () => void;
  reducedMotion?: boolean;
}

export const ProposalQuestion: React.FC<ProposalQuestionProps> = ({
  config,
  onAnswerYes,
  onAnswerTime,
  reducedMotion = false,
}) => {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [showLoveLetter, setShowLoveLetter] = useState<boolean>(false);
  const totalSteps = config.proposalIntroLines.length;

  // Progressive timed reveal allowing the intimate moment to breathe
  useEffect(() => {
    if (reducedMotion) {
      setStepIndex(totalSteps);
      return;
    }

    const interval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < totalSteps) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [totalSteps, reducedMotion]);

  const questionReady = stepIndex >= totalSteps;

  return (
    <div className="relative max-w-2xl w-full mx-auto px-4 py-8 flex flex-col items-center">
      {/* Intimate Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full glass-card p-6 sm:p-10 rounded-3xl border border-[#FFD6E7]/30 shadow-2xl relative overflow-hidden text-center"
      >
        {/* Soft atmospheric glow inside card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#FF8FB8]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Intro lines leading gently into the question */}
        <div className="space-y-4 mb-8">
          {config.proposalIntroLines.map((line, idx) => {
            if (idx > stepIndex) return null;
            const isLoveDeclaration = line.toLowerCase().includes("i love you");
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={
                  isLoveDeclaration
                    ? "py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FF8FB8]/25 via-[#A99AEF]/20 to-[#FF8FB8]/25 border border-[#FF8FB8]/50 shadow-glow-pink my-3 max-w-lg mx-auto"
                    : ""
                }
              >
                <p
                  className={
                    isLoveDeclaration
                      ? "font-serif text-xl sm:text-2xl text-romantic-gradient font-bold tracking-wide drop-shadow-sm"
                      : idx === 0
                      ? "font-serif italic text-lg sm:text-xl text-[#FFD6E7]"
                      : "text-sm sm:text-base text-[#FFF8FC]/85 font-light leading-relaxed max-w-lg mx-auto"
                  }
                >
                  {line}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* The Main Question - Large, Breathtaking Serif */}
        {questionReady && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="my-8 py-4 border-y border-white/10"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-[#FF8FB8]" />
              <span className="text-xs uppercase tracking-widest text-[#FFD6E7] font-semibold">
                From My Heart To Yours
              </span>
              <Sparkles className="w-5 h-5 text-[#FF8FB8]" />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-romantic-gradient py-2 drop-shadow-lg">
              {config.proposalQuestion}
            </h1>

            <p className="font-serif text-sm sm:text-base text-[#FFF8FC]/90 max-w-md mx-auto mt-4 leading-relaxed">
              {config.proposalSubtext}
            </p>

            <p className="text-xs sm:text-sm text-[#DCD6FF]/80 italic mt-3">
              {config.proposalSafety}
            </p>

            {/* Optional Button to Read Deep Proposal Love Letter */}
            {config.proposalLoveLetter && (
              <div className="mt-5">
                <button
                  onClick={() => setShowLoveLetter(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF8FB8]/15 hover:bg-[#FF8FB8]/25 border border-[#FF8FB8]/40 text-xs sm:text-sm font-medium text-[#FFD6E7] hover:text-white transition-all shadow-sm focus:outline-none focus:ring-1 focus:ring-[#FF8FB8]"
                >
                  <Mail className="w-4 h-4 text-[#FF8FB8]" />
                  <span>Read My Deepest Love Letter 💌</span>
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Response Choices - Equally Accessible & Beautifully Styled */}
        {questionReady ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 pt-2"
          >
            {/* Primary Choice: YES */}
            <button
              onClick={onAnswerYes}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FF8FB8] to-[#F472B6] hover:from-[#f472b6] hover:to-[#e11d48] text-white font-medium text-base shadow-glow-heart hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF8FB8] cursor-pointer"
              aria-label="Accept proposal: Yes"
            >
              <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
              <span>{config.yesButtonText}</span>
            </button>

            {/* Secondary Choice: CAN I TAKE MY TIME */}
            <button
              onClick={onAnswerTime}
              className="w-full sm:w-auto px-7 py-4 rounded-full glass-card hover:bg-white/10 border border-[#DCD6FF]/40 text-[#DCD6FF] hover:text-[#FFF8FC] font-medium text-base hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#A99AEF] cursor-pointer"
              aria-label="Request time: Can I take my time"
            >
              <Clock className="w-4 h-4 text-[#DCD6FF]" />
              <span>{config.timeButtonText}</span>
            </button>
          </motion.div>
        ) : (
          <div className="mt-4">
            <button
              onClick={() => setStepIndex(totalSteps)}
              className="text-xs text-[#DCD6FF]/40 hover:text-[#DCD6FF]/80 transition-colors focus:outline-none"
            >
              tap to see the question
            </button>
          </div>
        )}
      </motion.div>

      {/* Deep Proposal Love Letter Modal */}
      <AnimatePresence>
        {showLoveLetter && config.proposalLoveLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 25 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-xl w-full bg-[#FFF8FC] text-[#21172F] rounded-3xl p-6 sm:p-9 shadow-2xl border-4 border-[#FFD6E7] max-h-[85vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="proposal-letter-title"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowLoveLetter(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#21172F]/10 hover:bg-[#21172F]/20 flex items-center justify-center text-[#21172F] transition-colors focus:outline-none"
                aria-label="Close letter"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Letter Header */}
              <div className="border-b border-[#FF8FB8]/30 pb-4 mb-5 text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-2 bg-gradient-to-tr from-[#FF8FB8] to-[#E11D48] flex items-center justify-center shadow">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <h3 id="proposal-letter-title" className="font-handwritten text-3xl sm:text-4xl font-bold text-[#21172F]">
                  {config.proposalLoveLetter.title}
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-[#21172F]/70 mt-1">
                  {config.proposalLoveLetter.subtitle}
                </p>
              </div>

              {/* Paragraphs with handwritten styling */}
              <div className="space-y-4 font-handwritten text-xl sm:text-2xl text-[#21172F]/90 leading-relaxed pr-1">
                {config.proposalLoveLetter.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}

                {/* Glowing Highlighted Declaration */}
                <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-[#FFD6E7]/60 via-[#FF8FB8]/25 to-[#FFD6E7]/60 border-2 border-[#FF8FB8]/60 shadow-inner text-center">
                  <p className="font-bold text-2xl sm:text-3xl text-[#E11D48] tracking-wide">
                    {config.proposalLoveLetter.loveDeclaration}
                  </p>
                </div>

                <p className="text-center italic text-base sm:text-lg text-[#21172F]/80">
                  {config.proposalLoveLetter.closingNote}
                </p>

                <div className="pt-2 text-right">
                  <p className="italic text-base text-[#21172F]/70">Forever with you,</p>
                  <p className="font-bold text-2xl text-[#E11D48] mt-0.5">
                    {config.showNames ? config.myName : "Someone Who Truly Loves You 💗"}
                  </p>
                </div>
              </div>

              {/* Close Button at footer */}
              <div className="mt-6 text-center border-t border-[#FF8FB8]/30 pt-4">
                <button
                  onClick={() => setShowLoveLetter(false)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF8FB8] to-[#A99AEF] text-white font-medium text-sm shadow hover:shadow-md transition-all focus:outline-none"
                >
                  Return to My Heart 💖
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
