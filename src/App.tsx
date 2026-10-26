import React, { useState, useEffect, useCallback } from 'react';
import { SceneId } from './types';
import { proposalConfig } from './config/proposal';
import { ThreeUniverse } from './components/3d/ThreeUniverse';
import { WebGLFallback } from './components/3d/WebGLFallback';
import { SceneTransition } from './components/SceneTransition';
import { OpeningScene } from './components/OpeningScene';
import { WorthScene } from './components/WorthScene';
import { MemoryGarden } from './components/MemoryGarden';
import { EnvelopeLetter } from './components/EnvelopeLetter';
import { ProposalGarden } from './components/ProposalGarden';
import { ProposalQuestion } from './components/ProposalQuestion';
import { ResponseYes } from './components/ResponseYes';
import { ResponseTime } from './components/ResponseTime';
import { MusicToggle } from './components/MusicToggle';
import { ProgressIndicator } from './components/ProgressIndicator';
import { CursorTrail } from './components/CursorTrail';

export const App: React.FC = () => {
  const [activeScene, setActiveScene] = useState<SceneId>('opening');
  const [isZooming, setIsZooming] = useState<boolean>(false);
  const [hasWebGLError, setHasWebGLError] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Detect user preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Handler for zoom through heart on Scene 1
  const handleEnterUniverse = useCallback(() => {
    setIsZooming(true);
    // Smooth transition timeout
    setTimeout(() => {
      setIsZooming(false);
      setActiveScene('worth');
    }, 1200);
  }, []);

  const handleZoomComplete = useCallback(() => {
    setIsZooming(false);
    setActiveScene('worth');
  }, []);

  const handleReplay = useCallback(() => {
    setIsZooming(false);
    setActiveScene('opening');
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#21172F] text-[#FFF8FC] overflow-x-hidden">
      {/* 1. 3D WebGL Canvas or 2D Fallback */}
      {!hasWebGLError ? (
        <ThreeUniverse
          activeScene={activeScene}
          isZooming={isZooming}
          onZoomComplete={handleZoomComplete}
          onWebGLError={() => setHasWebGLError(true)}
          reducedMotion={reducedMotion}
        />
      ) : (
        <WebGLFallback />
      )}

      {/* 2. Desktop Heart-Trail Cursor */}
      <CursorTrail enabled={!reducedMotion} />

      {/* 3. Top Ambient Audio Toggle */}
      <MusicToggle customMusicUrl={proposalConfig.musicUrl} />

      {/* 4. Main Interactive Scene Content with Cinematic Transitions */}
      <main className="relative z-10 w-full min-h-screen flex items-center justify-center">
        <SceneTransition sceneKey={activeScene} reducedMotion={reducedMotion}>
          {activeScene === 'opening' && (
            <OpeningScene
              config={proposalConfig}
              onEnterUniverse={handleEnterUniverse}
              reducedMotion={reducedMotion}
            />
          )}

          {activeScene === 'worth' && (
            <WorthScene
              config={proposalConfig}
              onNext={() => setActiveScene('bubbles')}
              reducedMotion={reducedMotion}
            />
          )}

          {activeScene === 'bubbles' && (
            <MemoryGarden
              config={proposalConfig}
              onNext={() => setActiveScene('letter')}
              reducedMotion={reducedMotion}
            />
          )}

          {activeScene === 'letter' && (
            <EnvelopeLetter
              config={proposalConfig}
              onNext={() => setActiveScene('garden')}
              reducedMotion={reducedMotion}
            />
          )}

          {activeScene === 'garden' && (
            <ProposalGarden
              config={proposalConfig}
              onNext={() => setActiveScene('proposal')}
              reducedMotion={reducedMotion}
            />
          )}

          {activeScene === 'proposal' && (
            <ProposalQuestion
              config={proposalConfig}
              onAnswerYes={() => setActiveScene('response-yes')}
              onAnswerTime={() => setActiveScene('response-time')}
              reducedMotion={reducedMotion}
            />
          )}

          {activeScene === 'response-yes' && (
            <ResponseYes
              config={proposalConfig}
              onReplay={handleReplay}
              reducedMotion={reducedMotion}
            />
          )}

          {activeScene === 'response-time' && (
            <ResponseTime
              config={proposalConfig}
              onReturnToGarden={() => setActiveScene('garden')}
              onReadLetterAgain={() => setActiveScene('letter')}
              reducedMotion={reducedMotion}
            />
          )}
        </SceneTransition>
      </main>

      {/* 5. Heart-shaped Scene Progress Indicator */}
      <ProgressIndicator
        currentScene={activeScene}
        onSelectScene={(scene) => setActiveScene(scene)}
      />
    </div>
  );
};

export default App;
