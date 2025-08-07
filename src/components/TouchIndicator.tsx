'use client';

import { useState, useEffect } from 'react';

export default function TouchIndicator() {
  const [isVisible, setIsVisible] = useState(false);
  const [touchCount, setTouchCount] = useState(0);
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
    // Solo mostrar en dispositivos móviles después de 4 segundos
    if (isMobile) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleTouch = () => {
      setTouchCount(prev => prev + 1);
      // Ocultar después de 3 toques
      if (touchCount >= 2) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('touchstart', handleTouch);
      return () => document.removeEventListener('touchstart', handleTouch);
    }
  }, [isVisible, touchCount]);

  // No mostrar en dispositivos de escritorio
  if (!isVisible || !isMobile) return null;

  return (
    <div className="fixed bottom-4 right-4 z-30 animate-fade-in-up">
      <div className="glass-effect depth-effect rounded-full p-2 sm:p-3">
        <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/50 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/70 rounded-full animate-pulse-custom"></div>
          </div>
        </div>
        
        {/* Texto de ayuda */}
        <div className="absolute -top-6 sm:-top-8 right-0 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Toca para navegar
        </div>
      </div>
    </div>
  );
}