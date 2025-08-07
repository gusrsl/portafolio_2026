'use client';

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Importar Spline de forma dinámica para evitar problemas de SSR
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/30"></div>
    </div>
  ),
});


interface Spline3DProps {
  scene: string;
  className?: string;
  fallback?: React.ReactNode;
  disableOnMobile?: boolean;
}

export default function Spline3D({ scene, className = '', fallback, disableOnMobile = true }: Spline3DProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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

  const defaultFallback = (
    <div className={`flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl ${className}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-white/30 mx-auto mb-2 sm:mb-4"></div>
        <p className="text-white/60 text-xs sm:text-sm px-4">
          {isMobile && disableOnMobile ? 'Experiencia 3D optimizada para escritorio' : 'Cargando experiencia 3D...'}
        </p>
      </div>
    </div>
  );

  const mobileFallback = (
    <div className={`flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl ${className}`}>
      <div className="text-center p-6">
        <div className="text-4xl mb-4">🎨</div>
        <p className="text-white/80 text-sm font-medium mb-2">Experiencia 3D</p>
        <p className="text-white/60 text-xs">Optimizada para dispositivos de escritorio</p>
      </div>
    </div>
  );

  // Si es móvil y está deshabilitado, mostrar fallback estático
  if (isMobile && disableOnMobile) {
    return fallback || mobileFallback;
  }

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <div className={`relative ${className}`} style={{ pointerEvents: 'auto' }}>
        <Spline
          scene={scene}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
            pointerEvents: isMobile ? 'none' : 'auto' // Deshabilitar interacciones en móvil
          }}
          onLoad={() => setIsLoaded(true)}
        />
        {/* Overlay para mejorar rendimiento en móvil */}
        {isMobile && (
          <div className="absolute inset-0 pointer-events-none bg-transparent" />
        )}
      </div>
    </Suspense>
  );
}

// Componente específico para la escena principal
export function MainSpline3D({ className = '' }: { className?: string }) {
  return (
    <Spline3D
      scene="https://prod.spline.design/mtEsFPAfJC4XioLx/scene.splinecode"
      className={className}
      disableOnMobile={true}
    />
  );
}