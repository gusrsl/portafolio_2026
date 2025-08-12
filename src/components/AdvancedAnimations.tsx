'use client';

import { useEffect, useRef, useState } from 'react';

interface MorphingShapeProps {
  className?: string;
  colors?: string[];
  size?: number;
  morphSpeed?: number;
}

export function MorphingShape({ 
  className = '', 
  colors = ['#8B5CF6', '#3B82F6', '#EC4899', '#10B981'],
  size = 200,
  morphSpeed = 4000
}: MorphingShapeProps) {
  const [currentShape, setCurrentShape] = useState(0);
  const [currentColor, setCurrentColor] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Simplified shapes for smoother transitions
  const shapes = [
    'circle(50%)', // Circle
    'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // Diamond
    'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Square
    'polygon(50% 0%, 0% 100%, 100% 100%)', // Triangle
  ];

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
    // Reducir velocidad de animación en móvil
    const adjustedSpeed = isMobile ? morphSpeed * 1.5 : morphSpeed;
    
    const interval = setInterval(() => {
      setCurrentShape(prev => (prev + 1) % shapes.length);
      setCurrentColor(prev => (prev + 1) % colors.length);
    }, adjustedSpeed);

    return () => clearInterval(interval);
  }, [shapes.length, colors.length, morphSpeed, isMobile]);

  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className={`w-full h-full transition-all ease-in-out will-change-transform ${
          isMobile ? 'duration-[2000ms]' : 'duration-[4000ms]'
        }`}
        style={{
          background: `linear-gradient(135deg, ${colors[currentColor]}, ${colors[(currentColor + 1) % colors.length]})`,
          clipPath: shapes[currentShape],
          filter: isMobile ? 'none' : 'drop-shadow(0 0 15px rgba(139, 92, 246, 0.4))',
        }}
      />
      
      {/* Glow effect - deshabilitado en móvil */}
      {!isMobile && (
        <div
          className="absolute inset-0 transition-all duration-[3000ms] ease-in-out opacity-50"
          style={{
            background: `radial-gradient(circle, ${colors[currentColor]}40, transparent 70%)`,
            transform: 'scale(1.5)',
          }}
        />
      )}
    </div>
  );
}

interface FloatingTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function FloatingText({ text, className = '', delay = 0 }: FloatingTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-8 opacity-0 scale-95'
      } ${className}`}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-300 hover:scale-110 hover:text-purple-300"
          style={{
            animationDelay: `${index * 50}ms`,
            animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxElement({ children, speed = 0.5, className = '' }: ParallaxElementProps) {
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    // Deshabilitar parallax en móvil para mejor rendimiento
    if (isMobile) return;

    const handleScroll = () => {
      if (ref.current) {
        // uso del rect eliminado para evitar variable no usada
        // const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, isMobile]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: isMobile ? 'none' : `translateY(${offset}px)`,
      }}
    >
      {children}
    </div>
  );
}

interface PulsingOrbProps {
  size?: number;
  color?: string;
  intensity?: number;
  className?: string;
}

export function PulsingOrb({ 
  size = 100, 
  color = '#8B5CF6', 
  intensity = 0.8,
  className = '' 
}: PulsingOrbProps) {
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

  return (
    <div className={`relative ${className}`}>
      {/* Main orb */}
      <div
        className="rounded-full animate-pulse"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color}${Math.floor(intensity * 255).toString(16)}, transparent 70%)`,
          filter: 'blur(1px)',
        }}
      />
      
      {/* Inner glow - simplificado en móvil */}
      {!isMobile && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full animate-ping"
          style={{
            width: size * 0.6,
            height: size * 0.6,
            background: `radial-gradient(circle, ${color}${Math.floor(intensity * 0.6 * 255).toString(16)}, transparent 50%)`,
            animationDuration: '2s',
          }}
        />
      )}
      
      {/* Outer ring - simplificado en móvil */}
      {!isMobile && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border animate-spin"
          style={{
            width: size * 1.2,
            height: size * 1.2,
            borderColor: `${color}40`,
            borderWidth: '1px',
            animationDuration: '8s',
          }}
        />
      )}
    </div>
  );
}

// Componente de efectos de partículas avanzadas
export function AdvancedParticles({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Morphing shapes */}
      <ParallaxElement speed={0.3} className="absolute top-1/4 left-1/4">
        <MorphingShape size={150} morphSpeed={4000} />
      </ParallaxElement>
      
      <ParallaxElement speed={0.7} className="absolute top-3/4 right-1/4">
        <MorphingShape 
          size={100} 
          morphSpeed={3500}
          colors={['#EC4899', '#F59E0B', '#10B981', '#3B82F6']}
        />
      </ParallaxElement>
      
      {/* Pulsing orbs */}
      <ParallaxElement speed={0.2} className="absolute top-1/2 left-1/6">
        <PulsingOrb size={80} color="#EC4899" intensity={0.6} />
      </ParallaxElement>
      
      <ParallaxElement speed={0.8} className="absolute top-1/3 right-1/6">
        <PulsingOrb size={120} color="#10B981" intensity={0.4} />
      </ParallaxElement>
      
      <ParallaxElement speed={0.5} className="absolute bottom-1/4 left-1/2">
        <PulsingOrb size={60} color="#F59E0B" intensity={0.7} />
      </ParallaxElement>
    </div>
  );
}