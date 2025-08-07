'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface AnimatedCursorProps {
  size?: number;
  trailLength?: number;
}

export default function AnimatedCursor({ 
  size = 16,
  trailLength = 6 
}: AnimatedCursorProps) {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<CursorPosition[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [cursorColor, setCursorColor] = useState('#FFFFFF');
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastUpdate = useRef<number>(0);
  const lastColorCheck = useRef<number>(0);
  const particleId = useRef<number>(0);
  const isScrolling = useRef<boolean>(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Detectar color de fondo
  const detectBackgroundColor = useCallback((x: number, y: number) => {
    const element = document.elementFromPoint(x, y);
    if (!element) return '#FFFFFF';
    
    const computedStyle = window.getComputedStyle(element);
    const bgColor = computedStyle.backgroundColor;
    
    // Si el fondo es transparente, buscar en el elemento padre
    if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
      const body = document.body;
      const bodyStyle = window.getComputedStyle(body);
      const bodyBg = bodyStyle.backgroundColor;
      
      // Determinar si el fondo es claro u oscuro
      if (bodyBg.includes('rgb')) {
        const rgb = bodyBg.match(/\d+/g);
        if (rgb) {
          const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
          return brightness > 128 ? '#000000' : '#FFFFFF';
        }
      }
      return '#FFFFFF';
    }
    
    // Analizar el color de fondo actual
    if (bgColor.includes('rgb')) {
      const rgb = bgColor.match(/\d+/g);
      if (rgb) {
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        return brightness > 128 ? '#000000' : '#FFFFFF';
      }
    }
    
    return '#FFFFFF';
  }, []);

  // Crear partículas
   const createParticles = useCallback((x: number, y: number, count: number = 3) => {
     const newParticles: Particle[] = [];
     for (let i = 0; i < count; i++) {
       newParticles.push({
         x: x + (Math.random() - 0.5) * 15,
         y: y + (Math.random() - 0.5) * 15,
         vx: (Math.random() - 0.5) * 6,
         vy: (Math.random() - 0.5) * 6,
         life: 45,
         maxLife: 45,
         size: Math.random() * 4 + 1
       });
     }
     return newParticles;
   }, []);

  const updateCursor = useCallback((e: MouseEvent) => {
    const now = Date.now();
    // Throttle updates más agresivo durante scroll
    const throttleTime = isScrolling.current ? 32 : 16; // 30fps durante scroll, 60fps normal
    if (now - lastUpdate.current < throttleTime) return;
    
    lastUpdate.current = now;
    const newPosition = { x: e.clientX, y: e.clientY };
    setPosition(newPosition);
    
    // Detectar color de fondo menos frecuentemente y no durante scroll
    if (!isScrolling.current && now - lastColorCheck.current > 200) {
      const newColor = detectBackgroundColor(e.clientX, e.clientY);
      setCursorColor(newColor);
      lastColorCheck.current = now;
    }
    
    // Update trail con menos elementos durante scroll
    const effectiveTrailLength = isScrolling.current ? Math.max(2, trailLength - 2) : trailLength;
    setTrail(prevTrail => {
      const newTrail = [newPosition, ...prevTrail.slice(0, effectiveTrailLength - 1)];
      return newTrail;
    });
    
    // Crear partículas ocasionalmente (mucho menos durante scroll)
    const particleChance = isScrolling.current ? 0.05 : 0.25;
    const particleCount = isScrolling.current ? 1 : 3;
    if (Math.random() < particleChance) {
      setParticles(prev => {
        const newParticles = createParticles(e.clientX, e.clientY, particleCount);
        const maxParticles = isScrolling.current ? 20 : 40;
        return [...prev, ...newParticles].slice(-maxParticles);
      });
    }
  }, [trailLength, detectBackgroundColor, createParticles]);

  // Animar partículas
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 1,
          vy: particle.vy + 0.1 // Gravedad
        })).filter(particle => particle.life > 0)
      );
    };

    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, []);

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
    // No mostrar cursor en dispositivos móviles
    if (isMobile) return;
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => {
      setIsClicking(true);
      // Crear más partículas al hacer clic (menos si está scrolling)
      const clickParticles = isScrolling.current ? 8 : 15;
      setParticles(prev => {
        const newParticles = createParticles(position.x, position.y, clickParticles);
        return [...prev, ...newParticles].slice(-60);
      });
    };
    const handleMouseUp = () => setIsClicking(false);
    
    // Detectar scroll para optimizar rendimiento
    const handleScroll = () => {
      isScrolling.current = true;
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 100); // Reducido de 150ms a 100ms para mejor responsividad
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [updateCursor, createParticles, position, isMobile]);

  // No renderizar en dispositivos móviles o si no es visible
  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Partículas */}
      {particles.map((particle, index) => (
        <div
          key={`particle-${particleId.current}-${index}`}
          className="fixed pointer-events-none z-[99998] rounded-full"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            backgroundColor: cursorColor,
            opacity: (particle.life / particle.maxLife) * 0.6,
            transform: `scale(${particle.life / particle.maxLife})`,
            transition: 'opacity 0.1s ease-out'
          }}
        />
      ))}
      
      {/* Cursor trail */}
      {trail.map((pos, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-[99999] rounded-full"
          style={{
            left: pos.x - (size * (1 - index * 0.15)) / 2,
            top: pos.y - (size * (1 - index * 0.15)) / 2,
            width: size * (1 - index * 0.15),
            height: size * (1 - index * 0.15),
            backgroundColor: cursorColor,
            opacity: (1 - index * 0.2) * 0.5,
            transition: 'background-color 0.2s ease-out'
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[99999] rounded-full transition-all duration-150 ${
          isClicking ? 'scale-125' : 'scale-100'
        }`}
        style={{
          left: position.x - size / 2,
          top: position.y - size / 2,
          width: size,
          height: size,
          backgroundColor: cursorColor,
          boxShadow: `0 0 ${size * 2}px ${cursorColor}40, 0 0 ${size * 4}px ${cursorColor}20`,
          border: `2px solid ${cursorColor}80`,
          transition: 'background-color 0.2s ease-out, box-shadow 0.2s ease-out'
        }}
      />
      
      {/* Cursor center dot */}
      <div
        className="fixed pointer-events-none z-[100000] rounded-full"
        style={{
          left: position.x - 2,
          top: position.y - 2,
          width: 4,
          height: 4,
          backgroundColor: cursorColor === '#FFFFFF' ? '#000000' : '#FFFFFF',
          transition: 'background-color 0.2s ease-out'
        }}
      />
    </>
  );
}
