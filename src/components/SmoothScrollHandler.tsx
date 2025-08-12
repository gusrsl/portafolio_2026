'use client';

import { useEffect } from 'react';
import useDeviceInfo from '@/hooks/useDeviceInfo';

export default function SmoothScrollHandler() {
  const { isMobile } = useDeviceInfo();

  useEffect(() => {
    // Scroll suave robusto para enlaces internos (#id) incluso si se hace click en elementos anidados
    const handleSmoothScroll = (e: Event) => {
      const targetNode = e.target as Element | null;
      if (!targetNode) return;

      const anchor = targetNode.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      if (!href.startsWith('#')) return;

      const targetId = href.substring(1);
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      e.preventDefault();

      // Calcular altura real del navbar si existe
      const navbar = document.getElementById('dynamic-navbar');
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : (isMobile ? 60 : 100);
      const offsetTop = targetElement.offsetTop - Math.ceil(navbarHeight);

      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: 'smooth',
      });

      // Actualizar hash sin recargar
      history.pushState(null, '', `#${targetId}`);
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
