'use client';

import { useState, useEffect } from 'react';

export default function LoadingIndicator() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar dispositivos móviles
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Acelerar carga en móvil para mejor UX
    const incrementValue = isMobile ? 3 : 2;
    const intervalTime = isMobile ? 50 : 70;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + incrementValue;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isMobile]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-3 sm:top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-40 animate-fade-in-up">
      <div className="w-8 h-4 sm:w-10 sm:h-5 md:w-12 md:h-6 glass-effect depth-effect rounded-full flex items-center justify-center relative">
        {/* Barra de progreso circular más pequeña */}
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 relative">
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 transform -rotate-90" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="8"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth={isMobile ? "1" : "1.5"}
              fill="none"
            />
            <circle
              cx="12"
              cy="12"
              r="8"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth={isMobile ? "1" : "1.5"}
              fill="none"
              strokeDasharray={`${2 * Math.PI * 8}`}
              strokeDashoffset={`${2 * Math.PI * 8 * (1 - progress / 100)}`}
              className={`transition-all ease-out ${
                isMobile ? 'duration-75' : 'duration-100'
              }`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-0.5 h-0.5 bg-white/80 rounded-full animate-pulse-custom"></div>
          </div>
        </div>
        
        {/* Efectos de brillo sutiles - simplificados en móvil */}
        {!isMobile && (
          <>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-50"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 to-transparent opacity-30"></div>
          </>
        )}
      </div>
    </div>
  );
}