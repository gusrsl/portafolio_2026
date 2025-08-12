'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import CursorPortal from './utils/CursorPortal';

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

interface TrailDot {
  x: number;
  y: number;
  life: number;
  maxLife: number;
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
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [cursorColor, setCursorColor] = useState('#FFFFFF');
  const [isMobile, setIsMobile] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastUpdate = useRef<number>(0);
  const lastColorCheck = useRef<number>(0);
  const particleId = useRef<number>(0);
  const isScrolling = useRef<boolean>(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const TRAIL_MAX_LIFE = 24; // frames

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

  const isElementInteractive = (el: Element | null): boolean => {
    if (!el) return false;
    const selectors = 'a, button, [role="button"], input[type="submit"], input[type="button"], .cursor-pointer, [tabindex="0"], select';
    let current: Element | null = el;
    for (let depth = 0; depth < 3 && current; depth++) {
      if (current.matches?.(selectors)) return true;
      current = current.parentElement;
    }
    return false;
  };

  const isElementTextInput = (el: Element | null): boolean => {
    if (!el) return false;
    const selectors = 'input:not([type="button"]):not([type="submit"]), textarea, [contenteditable="true"]';
    let current: Element | null = el;
    for (let depth = 0; depth < 3 && current; depth++) {
      if (current.matches?.(selectors)) return true;
      current = current.parentElement;
    }
    return false;
  };

  const updateCursor = useCallback((e: MouseEvent) => {
    const now = Date.now();
    // Throttle updates más agresivo durante scroll
    const throttleTime = isScrolling.current ? 32 : 16; // 30fps durante scroll, 60fps normal
    if (now - lastUpdate.current < throttleTime) return;
    
    lastUpdate.current = now;
    const newPosition = { x: e.clientX, y: e.clientY };
    setPosition(newPosition);
    // Asegurar visibilidad al primer movimiento
    if (!isVisible) setIsVisible(true);
    // Idle handling
    setIsIdle(false);
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    idleTimeout.current = setTimeout(() => setIsIdle(true), 1600);
    
    // Detectar color de fondo menos frecuentemente y no durante scroll
    if (!isScrolling.current && now - lastColorCheck.current > 200) {
      const newColor = detectBackgroundColor(e.clientX, e.clientY);
      setCursorColor(newColor);
      lastColorCheck.current = now;
    }
    
    // Generar puntos de trail que desaparecen suavemente aunque no haya movimiento
    if (!isReducedMotion) {
      const newDot: TrailDot = {
        x: newPosition.x,
        y: newPosition.y,
        life: TRAIL_MAX_LIFE,
        maxLife: TRAIL_MAX_LIFE,
      };
      const cap = Math.max(6, trailLength * 4);
      setTrail(prev => [newDot, ...prev].slice(0, cap));
    }
    
    // Crear partículas ocasionalmente (mucho menos durante scroll)
    if (!isReducedMotion) {
      const particleChance = isScrolling.current ? 0.05 : 0.25;
      const particleCount = isScrolling.current ? 1 : 3;
      if (Math.random() < particleChance) {
        setParticles(prev => {
          const newParticles = createParticles(e.clientX, e.clientY, particleCount);
          const maxParticles = isScrolling.current ? 20 : 40;
          return [...prev, ...newParticles].slice(-maxParticles);
        });
      }
    }

    // Estados de interacción
    const target = e.target as Element | null;
    setIsInteractive(isElementInteractive(target));
    setIsTextInput(isElementTextInput(target));
  }, [trailLength, detectBackgroundColor, createParticles, isReducedMotion, isVisible]);

  // Animar partículas y desvanecer trail con requestAnimationFrame
  useEffect(() => {
    if (isReducedMotion) return;
    const animate = () => {
      setParticles(prev =>
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 1,
            vy: particle.vy + 0.1,
          }))
          .filter(p => p.life > 0)
      );
      setTrail(prev =>
        prev
          .map(d => ({ ...d, life: d.life - 1 }))
          .filter(d => d.life > 0)
      );
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isReducedMotion]);

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

  // Detectar preferencia de movimiento reducido
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setIsReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
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
      if (!isReducedMotion) {
        setParticles(prev => {
          const newParticles = createParticles(position.x, position.y, clickParticles);
          return [...prev, ...newParticles].slice(-60);
        });
      }
    };
    const handleMouseUp = () => setIsClicking(false);
    
    // Detectar scroll para optimizar rendimiento
    const handleScroll = () => {
      isScrolling.current = true;
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      // permitir que trail/partículas sigan decay aunque esté haciendo scroll
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 50);
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
  }, [updateCursor, createParticles, position, isMobile, isReducedMotion]);

  // No renderizar en dispositivos móviles o si no es visible
  if (isMobile || !isVisible) return null;

  return (
    <CursorPortal>
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
      {!isReducedMotion && trail.map((dot, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-[99999] rounded-full"
          style={{
            left: dot.x - (size * (dot.life / dot.maxLife)) / 2,
            top: dot.y - (size * (dot.life / dot.maxLife)) / 2,
            width: size * (dot.life / dot.maxLife),
            height: size * (dot.life / dot.maxLife),
            backgroundColor: (isInteractive || isTextInput) ? 'transparent' : cursorColor,
            border: (isInteractive || isTextInput) ? `1px solid ${cursorColor}50` : 'none',
            opacity: Math.max(0, (dot.life / dot.maxLife) * (isIdle ? 0.25 : 0.6)),
            transition: 'background-color 0.15s ease-out',
            willChange: 'transform, opacity'
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[2147483647] rounded-full transition-all duration-150 ${
          isClicking ? 'scale-125' : isInteractive ? 'scale-110' : isIdle ? 'opacity-60 scale-95' : 'scale-100'
        }`}
        style={{
          left: position.x - size / 2,
          top: position.y - size / 2,
          width: size,
          height: size,
          backgroundColor: (isInteractive || isTextInput) ? 'transparent' : cursorColor,
          boxShadow: (isInteractive || isTextInput)
            ? `0 0 ${size * 1.5}px ${cursorColor}30`
            : `0 0 ${size * 2}px ${cursorColor}40, 0 0 ${size * 4}px ${cursorColor}20`,
          border: `2px solid ${cursorColor}B3`,
          opacity: isIdle ? 0.6 : 1,
          transition: 'background-color 0.2s ease-out, box-shadow 0.2s ease-out, opacity 0.3s ease-out'
        }}
      />
      
      {/* Cursor center dot */}
      {!isTextInput && (
        <div
          className="fixed pointer-events-none z-[2147483647] rounded-full"
          style={{
            left: position.x - 2,
            top: position.y - 2,
            width: 4,
            height: 4,
            backgroundColor: cursorColor === '#FFFFFF' ? '#000000' : '#FFFFFF',
            transition: 'background-color 0.2s ease-out'
          }}
        />
      )}
    </CursorPortal>
  );
}
