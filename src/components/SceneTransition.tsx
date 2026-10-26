import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface SceneTransitionProps {
  sceneKey: string;
  children: React.ReactNode;
  reducedMotion?: boolean;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  sceneKey,
  children,
  reducedMotion = false,
}) => {
  const variants: Variants = {
    initial: {
      opacity: 0,
      y: reducedMotion ? 0 : 20,
      filter: reducedMotion ? 'blur(0px)' : 'blur(8px)',
      scale: reducedMotion ? 1 : 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: reducedMotion ? 0.2 : 0.85,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: reducedMotion ? 0 : -20,
      filter: reducedMotion ? 'blur(0px)' : 'blur(6px)',
      scale: reducedMotion ? 1 : 1.02,
      transition: {
        duration: reducedMotion ? 0.2 : 0.55,
        ease: 'easeIn',
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneKey}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full min-h-screen flex flex-col items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8 py-16"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
