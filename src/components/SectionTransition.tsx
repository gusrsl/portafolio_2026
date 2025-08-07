'use client';

import { useEffect, useRef, useState } from 'react';

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  effect?: 'fade-up' | 'fade-scale' | 'fade-slide' | 'default';
  threshold?: number;
  rootMargin?: string;
  disableOnMobile?: boolean;
}

export default function SectionTransition({ 
  children, 
  className = '', 
  delay = 0,
  effect = 'default',
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  disableOnMobile = false
}: SectionTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    // Si está deshabilitado en móvil y es móvil, mostrar inmediatamente
    if (isMobile && disableOnMobile) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    // Ajustar configuraciones para móvil
    const mobileThreshold = isMobile ? Math.max(0.05, threshold - 0.05) : threshold;
    const mobileRootMargin = isMobile ? '0px 0px -50px 0px' : rootMargin;
    const mobileDelay = isMobile ? Math.max(0, delay - 100) : delay;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, mobileDelay);
        }
      },
      {
        threshold: mobileThreshold,
        rootMargin: mobileRootMargin
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold, rootMargin, hasAnimated, isMobile, disableOnMobile]);

  const getEffectClasses = () => {
    switch (effect) {
      case 'fade-up':
        return 'fade-up';
      case 'fade-scale':
        return 'fade-scale';
      case 'fade-slide':
        return 'fade-slide';
      default:
        return '';
    }
  };

  return (
    <div
      ref={ref}
      className={`section-transition ${(isMobile && disableOnMobile) ? '' : getEffectClasses()} ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
