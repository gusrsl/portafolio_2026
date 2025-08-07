'use client';

import { useEffect, useRef, useState } from 'react';

interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
  disableOnMobile?: boolean;
}

export default function ParallaxWrapper({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '',
  disableOnMobile = true
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar dispositivos móviles
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      const isLowPerformance = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false;
      setIsMobile(isTouchDevice || isSmallScreen || isLowPerformance);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Deshabilitar parallax en móvil si está configurado
    if (isMobile && disableOnMobile) {
      element.style.transform = 'none';
      return;
    }

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      
      // Solo aplicar parallax si el elemento está visible
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const yPos = direction === 'up' ? rate : -rate;
        element.style.transform = `translateY(${yPos}px)`;
      }
    };

    // Throttle más agresivo en móvil
    let ticking = false;
    let lastScrollTime = 0;
    
    const throttledHandleScroll = () => {
      const now = Date.now();
      const throttleTime = isMobile ? 100 : 16;
      
      if (now - lastScrollTime >= throttleTime && !ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
          lastScrollTime = now;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [speed, direction, isMobile, disableOnMobile]);

  return (
    <div 
      ref={ref} 
      className={`parallax-content ${className}`}
      style={{ 
        willChange: (isMobile && disableOnMobile) ? 'auto' : 'transform'
      }}
    >
      {children}
    </div>
  );
}
