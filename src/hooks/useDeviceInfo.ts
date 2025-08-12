import { useEffect, useMemo, useState } from 'react';

interface DeviceInfo {
  isTouchDevice: boolean;
  isSmallScreen: boolean;
  isLowPerformance: boolean;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  hardwareConcurrency: number | null;
}

export default function useDeviceInfo(): DeviceInfo {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [hardwareConcurrency, setHardwareConcurrency] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
      setIsSmallScreen(window.innerWidth < 768);
      setHardwareConcurrency(typeof navigator.hardwareConcurrency === 'number' ? navigator.hardwareConcurrency : null);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = () => setPrefersReducedMotion(media.matches);
    listener();
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const isLowPerformance = useMemo(() => {
    return hardwareConcurrency !== null ? hardwareConcurrency < 4 : false;
  }, [hardwareConcurrency]);

  const isMobile = useMemo(() => {
    return isTouchDevice || isSmallScreen || isLowPerformance;
  }, [isTouchDevice, isSmallScreen, isLowPerformance]);

  return {
    isTouchDevice,
    isSmallScreen,
    isLowPerformance,
    isMobile,
    prefersReducedMotion,
    hardwareConcurrency,
  };
}


