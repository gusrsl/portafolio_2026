'use client';

import { useEffect, useState } from 'react';

export default function SmoothScrollHandler() {
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
    // Mejorar el scroll suave para enlaces internos
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        
        if (targetElement) {
          // Ajustar offset según el dispositivo
          const offsetTop = targetElement.offsetTop - (isMobile ? 60 : 80);
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Opcional: actualizar la URL sin recargar
          history.pushState(null, '', `#${targetId}`);
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, [isMobile]);

  useEffect(() => {
    // Efecto de cambio de color de fondo basado en la sección visible
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
          // Aplicar efectos específicos según la sección
          document.body.setAttribute('data-current-section', sectionId || '');
        }
      });
    };

    let ticking = false;
    let lastScrollTime = 0;
    
    const throttledHandleScroll = () => {
      const now = Date.now();
      // Throttle más agresivo en móvil (100ms vs 16ms)
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
  }, [isMobile]);

  return null; // Este componente no renderiza nada visible
}
