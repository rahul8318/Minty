import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Flower, Mail, Smile } from 'lucide-react';
import { ProposalConfig } from '../types';

interface ResponseTimeProps {
  config: ProposalConfig;
  onReturnToGarden: () => void;
  onReadLetterAgain: () => void;
  reducedMotion?: boolean;
}

export const ResponseTime: React.FC<ResponseTimeProps> = ({
  config,
  onReturnToGarden,
  onReadLetterAgain,
}) => {
  return (
    <div className="relative max-w-2xl w-full mx-auto px-4 py-8 flex flex-col items-center text-center">
      {/* Calm, Sweet, Respectful Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full glass-card p-6 sm:p-10 rounded-3xl border border-[#DCD6FF]/40 shadow-2xl relative overflow-hidden"
      >
        {/* Soft Lavender Halo */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#A99AEF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#DCD6FF]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Gentle Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCD6FF]/15 border border-[#DCD6FF]/30 text-xs font-medium text-[#DCD6FF] mb-5">
          <Smile className="w-3.5 h-3.5 text-[#FFD6E7]" />
          <span>Always Respected, Always Cherished</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#FFF8FC] drop-shadow">
          {config.timeTitle}
        </h1>

        {/* Reassuring Paragraphs */}
        <div className="space-y-4 my-6 text-sm sm:text-base text-[#FFF8FC]/85 font-light leading-relaxed max-w-lg mx-auto border-t border-b border-white/10 py-5">
          {config.timeParagraphs.map((p, idx) => (
            <p key={idx} className={idx === 0 ? 'font-serif italic text-lg sm:text-xl text-[#FFD6E7]' : ''}>
              {p}
            </p>
          ))}
        </div>

        {/* Signature note */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#DCD6FF]/70 mb-6">
          <Heart className="w-3.5 h-3.5 text-[#FF8FB8]" />
          <span>Your comfort and happiness will always come first.</span>
        </div>

        {/* Two Non-Destructive Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onReturnToGarden}
            className="w-full sm:w-auto glass-button px-6 py-3 rounded-full text-sm font-medium text-[#FFF8FC] inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FF8FB8]"
          >
            <Flower className="w-4 h-4 text-[#FF8FB8]" />
            <span>{config.timeReturnGardenText}</span>
          </button>

          <button
            onClick={onReadLetterAgain}
            className="w-full sm:w-auto glass-card hover:bg-white/10 border border-[#DCD6FF]/30 px-6 py-3 rounded-full text-sm font-medium text-[#DCD6FF] hover:text-white inline-flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#A99AEF]"
          >
            <Mail className="w-4 h-4 text-[#A99AEF]" />
            <span>{config.timeReadLetterText}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
