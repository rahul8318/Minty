import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface MusicToggleProps {
  customMusicUrl?: string;
}

export const MusicToggle: React.FC<MusicToggleProps> = ({ customMusicUrl }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(romanticAudio.playing);

  const handleToggle = () => {
    const nextState = romanticAudio.toggle(customMusicUrl);
    setIsPlaying(nextState);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        onClick={handleToggle}
        className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-card hover:border-[#FF8FB8]/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF8FB8]/60"
        aria-label={isPlaying ? "Mute ambient music" : "Play romantic ambient music"}
        title={isPlaying ? "Mute ambient music" : "Play romantic ambient music"}
      >
        <div className="relative">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-[#FF8FB8] animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#DCD6FF]/70 group-hover:text-[#FFF8FC]" />
          )}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8FB8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF8FB8]"></span>
            </span>
          )}
        </div>
        <span className="text-xs font-medium tracking-wide text-[#FFF8FC]/90 hidden sm:inline">
          {isPlaying ? "Music On" : "Music Off"}
        </span>
        {isPlaying && (
          <Sparkles className="w-3.5 h-3.5 text-[#FFD6E7] opacity-80" />
        )}
      </button>
    </div>
  );
};
