
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Progress } from './ui/progress';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        const newProgress = Math.min(oldProgress + Math.random() * 10, 100);
        if (newProgress === 100) {
          clearInterval(timer);
          // Allow animation to complete before calling onLoadComplete
          setTimeout(() => {
            onLoadComplete();
          }, 500);
        }
        return newProgress;
      });
    }, 150);

    return () => {
      clearInterval(timer);
    };
  }, [onLoadComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-travel-800 to-slate-900 text-white"
    >
      <div className="relative w-full max-w-md px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            }}
            className="inline-block mb-2"
          >
            <motion.div 
              className="relative w-16 h-16 mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border-4 border-travel-400 border-opacity-20"></div>
              <div 
                className="absolute inset-0 rounded-full border-4 border-t-travel-400 border-r-primary border-b-travel-400 border-l-secondary"
                style={{ clipPath: 'inset(0 0 0 0)' }}
              ></div>
            </motion.div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold tracking-wide"
          >
            <span className="text-primary">Travel</span>
            <span className="text-secondary">Mate</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-travel-200 mt-2"
          >
            Your Budget Travel Companion
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full space-y-2"
        >
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-travel-300">
            <span>Loading experience...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
