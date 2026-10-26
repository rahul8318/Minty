import React from 'react';
import { SceneId } from '../types';
import { Heart } from 'lucide-react';

interface ProgressIndicatorProps {
  currentScene: SceneId;
  onSelectScene?: (scene: SceneId) => void;
}

const scenes: Array<{ id: SceneId; label: string }> = [
  { id: 'opening', label: 'Opening' },
  { id: 'worth', label: 'Your Worth' },
  { id: 'bubbles', label: 'Little Things' },
  { id: 'letter', label: 'My Letter' },
  { id: 'garden', label: 'Our World' },
  { id: 'proposal', label: 'The Question' },
];

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentScene,
  onSelectScene,
}) => {
  // Hide on response outcome screens to keep the celebration / calm moment pure
  if (currentScene === 'response-yes' || currentScene === 'response-time') {
    return null;
  }

  const currentIndex = scenes.findIndex(s => s.id === currentScene);

  return (
    <nav
      aria-label="Universe Journey Progress"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full glass-card border border-white/10 flex items-center gap-2 sm:gap-3 backdrop-blur-md shadow-lg"
    >
      {scenes.map((s, index) => {
        const isActive = s.id === currentScene;
        const isPast = currentIndex > index;

        return (
          <button
            key={s.id}
            onClick={() => onSelectScene && isPast ? onSelectScene(s.id) : undefined}
            disabled={!isPast && !isActive}
            className={`group relative flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#FF8FB8] rounded-full p-1.5 ${
              isActive ? 'scale-125' : isPast ? 'opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer' : 'opacity-35 cursor-default'
            }`}
            aria-label={`${s.label} (${index + 1} of ${scenes.length})`}
            aria-current={isActive ? 'step' : undefined}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isActive
                  ? 'fill-[#FF8FB8] text-[#FF8FB8] drop-shadow-[0_0_8px_rgba(255,143,184,0.8)]'
                  : isPast
                  ? 'fill-[#DCD6FF]/60 text-[#DCD6FF]'
                  : 'text-[#FFF8FC]/50'
              }`}
            />
            {/* Tooltip on hover for desktop */}
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#21172F]/90 border border-white/20 text-[#FFF8FC] text-[10px] font-medium px-2 py-0.5 rounded shadow whitespace-nowrap">
              {s.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
