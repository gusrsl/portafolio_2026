'use client';

import { useEffect, useRef, useState } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

interface PhysicsElementsProps {
  count?: number;
  className?: string;
  interactive?: boolean;
}

export default function PhysicsElements({ 
  count = 8, 
  className = '', 
  interactive = true 
}: PhysicsElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const lastUpdate = useRef<number>(0);

  // Colores para los elementos
  const colors = [
    'rgba(147, 51, 234, 0.6)', // purple
    'rgba(59, 130, 246, 0.6)', // blue
    'rgba(236, 72, 153, 0.6)', // pink
    'rgba(34, 197, 94, 0.6)',  // green
    'rgba(251, 191, 36, 0.6)', // yellow
    'rgba(239, 68, 68, 0.6)',  // red
  ];

  // Detectar dispositivos móviles
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      const isLowPerformance = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false;
      setIsMobile(isTouchDevice || isSmallScreen || isLowPerformance);
    };

    // Solo animar si no es móvil o si es necesario
    if (!isMobile || elements.length <= 3) {
  
    }
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Inicializar elementos
  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });

    // Reducir cantidad de elementos en móvil
    const elementCount = isMobile ? Math.max(3, Math.floor(count / 2)) : count;

    const newElements: FloatingElement[] = Array.from({ length: elementCount }, (_, i) => ({
      id: i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * (isMobile ? 1 : 2),
      vy: (Math.random() - 0.5) * (isMobile ? 1 : 2),
      size: Math.random() * (isMobile ? 6 : 8) + (isMobile ? 3 : 4),
      opacity: Math.random() * 0.7 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * (isMobile ? 2 : 4),
    }));

    setElements(newElements);
  }, [count, isMobile]);

  // Manejar movimiento del mouse
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [interactive]);

  // Animación de física optimizada
  useEffect(() => {
    if (elements.length === 0 || dimensions.width === 0) return;

    const animate = (currentTime: number) => {
      // Throttle más agresivo en móvil (20fps vs 30fps)
      const throttleTime = isMobile ? 50 : 33;
      if (currentTime - lastUpdate.current < throttleTime) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastUpdate.current = currentTime;

      setElements(prevElements => 
        prevElements.map(element => {
          let { x, y, vx, vy, rotation, rotationSpeed } = element;

          // Física básica - gravedad sutil (reducida en móvil)
          vy += isMobile ? 0.01 : 0.015;

          // Interacción con el mouse (deshabilitada en móvil para mejor rendimiento)
          if (interactive && !isMobile) {
            const dx = mousePos.x - x;
            const dy = mousePos.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 80) {
              const force = (80 - distance) / 80;
              vx -= (dx / distance) * force * 0.3;
              vy -= (dy / distance) * force * 0.3;
            }
          }

          // Actualizar posición (movimiento más lento en móvil)
          const velocityMultiplier = isMobile ? 0.6 : 0.8;
          x += vx * velocityMultiplier;
          y += vy * velocityMultiplier;
          rotation += rotationSpeed * (isMobile ? 0.5 : 1);

          // Rebote en los bordes
          if (x <= 0 || x >= dimensions.width) {
            vx *= -0.8;
            x = Math.max(0, Math.min(dimensions.width, x));
          }
          if (y <= 0 || y >= dimensions.height) {
            vy *= -0.8;
            y = Math.max(0, Math.min(dimensions.height, y));
          }

          // Fricción
          vx *= 0.99;
          vy *= 0.99;

          return {
            ...element,
            x,
            y,
            vx,
            vy,
            rotation,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [elements.length, dimensions, mousePos, interactive, isMobile]);

  // Manejar redimensionamiento
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 1 }}
    >
      {elements.map(element => (
        <div
          key={element.id}
          className={`absolute rounded-full transition-all duration-100 ${
            isMobile ? 'blur-none' : 'blur-sm'
          }`}
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            backgroundColor: element.color,
            opacity: element.opacity,
            transform: `rotate(${element.rotation}deg)`,
            boxShadow: isMobile ? 'none' : `0 0 ${element.size * 2}px ${element.color}`,
          }}
        />
      ))}
    </div>
  );
}

// Componente específico para partículas de fondo
export function BackgroundPhysics({ className = '' }: { className?: string }) {
  return (
    <PhysicsElements 
      count={10}
      className={className}
      interactive={false}
    />
  );
}

// Componente específico para partículas interactivas
export function InteractivePhysics({ className = '' }: { className?: string }) {
  return (
    <PhysicsElements 
      count={6}
      className={className}
      interactive={true}
    />
  );
}