'use client';

import { useState, useEffect, useRef } from 'react';
import useDeviceInfo from '@/hooks/useDeviceInfo';
import { profile } from '@/data/profile';
import { useTheme } from '@/components/utils/ThemeProvider';

interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

const navItems: NavItem[] = [
  { label: 'Inicio', href: '#inicio', icon: '🏠' },
  { label: 'Proyectos', href: '#proyectos', icon: '💼' },
  { label: 'Sobre mí', href: '#sobre-mi', icon: '👨‍💻' },
  { label: 'Contacto', href: '#contacto', icon: '📧' },
];

export default function DynamicNavbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMobile } = useDeviceInfo();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('inicio');
  // const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, toggleTheme } = useTheme();

  // Detección de dispositivo centralizada en useDeviceInfo

  // Sincronización con la animación de loading
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            setTimeout(() => {
              setIsVisible(true);
            }, 200);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Actualizar el reloj en tiempo real
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Manejar scroll progress y sección activa
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(Math.min(progress, 100));
      
      // Detectar sección activa
      const sections = navItems.map(item => item.href.replace('#', ''));
      let currentSection = 'inicio';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Llamar una vez al montar
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemHover = (itemLabel: string) => {
    if (isMobile) return;
    setHoveredItem(itemLabel);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevenir scroll del body cuando el menú está abierto
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const handleMobileItemClick = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Cerrar menú móvil al hacer resize a desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = 'unset';
    }
  }, [isMobile, isMobileMenuOpen]);

  // Limpiar overflow del body al desmontar
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Scroll suave ahora centralizado en SmoothScrollHandler

  return (
    <>
      {/* Dynamic Island - Desktop */}
      <div className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up hidden md:block safe-area-inset">
        <div
          ref={navbarRef}
          className={`
            relative overflow-hidden
              ${isLoading 
                ? 'w-20 sm:w-24 h-16 sm:h-20 glass-effect depth-effect'
                : 'w-[98vw] max-w-[1680px] h-16 sm:h-20 glass-effect-expanded depth-effect-expanded'
              }
            rounded-full
            transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
            group
            hover:scale-[1.01]
            active:scale-[0.99]
          `}
          id="dynamic-navbar"
        >
          {/* Estado de Loading Mejorado */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 relative">
                <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="var(--border)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="var(--fg)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 9}`}
                    strokeDashoffset={`${2 * Math.PI * 9 * (1 - loadingProgress / 100)}`}
                    className="transition-all duration-100 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-fg-soft rounded-full animate-pulse-custom"></div>
                </div>
              </div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="text-fg-muted text-xs font-mono tracking-wider">
                  {Math.round(loadingProgress)}%
                </div>
              </div>
            </div>
          )}

          {/* Contenido Principal - Siempre Expandido */}
          {!isLoading && isVisible && (
            <div className="absolute inset-0 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center px-2 sm:px-4 lg:px-6 gap-2 sm:gap-3 xl:gap-4 animate-slide-in min-w-0">
              {/* Logo y Marca */}
              <div className="flex items-center space-x-3 sm:space-x-5 pr-2 md:pr-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center backdrop-blur-sm border app-border bg-overlay-1">
                    <span className="text-fg font-bold text-sm sm:text-lg">{profile.shortName.split(' ').map(s => s[0]).join('').slice(0,2)}</span>
                  </div>
                  <div className="hidden lg:block min-w-[180px]">
                    <div className="text-fg-soft font-semibold text-base tracking-wide">{profile.shortName}</div>
                    <div className="text-fg-muted text-sm tracking-wider">{profile.role}</div>
                  </div>
                </div>
              
              {/* Navegación Principal */}
              <nav role="navigation" aria-label="Navegación principal" className="flex flex-nowrap items-center justify-start md:justify-center gap-x-2 sm:gap-x-3 xl:gap-x-4 min-w-0 w-full overflow-x-auto hide-scrollbar pr-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                        <a
                      key={item.label}
                      href={item.href}
                          aria-current={isActive ? 'page' : undefined}
                      className={`
                        group relative whitespace-nowrap shrink-0
                        font-semibold text-sm tracking-wide
                        transition-all duration-300 ease-out
                        transform hover:scale-105 hover:-translate-y-0.5
                        px-2.5 py-2 sm:px-3.5 sm:py-2 xl:px-4.5 xl:py-2.5 rounded-xl
                        cursor-pointer
                        ${isActive ? 'text-fg bg-overlay-1 border app-border' : 'text-fg-muted hover:text-fg hover:bg-overlay-1'}
                        ${hoveredItem === item.label ? 'scale-105' : ''}
                      `}
                      style={{
                        animationDelay: `${index * 150}ms`,
                        animationFillMode: 'both',
                      }}
                      onMouseEnter={() => handleItemHover(item.label)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {/* Texto */}
                      <span className="uppercase tracking-wider text-sm sm:text-base font-medium">
                        {item.label}
                      </span>
                      
                          {/* Efecto de brillo */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[color:rgba(255,255,255,0.2)] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl transform scale-x-0 group-hover:scale-x-100 pointer-events-none"></div>
                      
                      {/* Indicador activo */}
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-fg rounded-full animate-pulse pointer-events-none"></div>
                      )}
                    </a>
                  );
                })}
              </nav>

              {/* Panel de Estado y Herramientas */}
              <div className="hidden md:flex items-center space-x-3 sm:space-x-4">
                {/* Indicador de Progreso de Scroll */}
                <div className="hidden xl:flex items-center space-x-2">
                  <div className="w-20 h-2 bg-overlay-1 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-fg-soft rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${scrollProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-fg-muted text-sm font-mono font-medium">
                    {Math.round(scrollProgress)}%
                  </span>
                </div>
                
                {/* Separador */}
                <div className="hidden xl:block w-px h-4 app-border"></div>
                
                {/* Estado del Sistema */}
                <div className="flex items-center space-x-3 px-3 sm:px-4 py-2 bg-overlay-1 rounded-xl border app-border">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="hidden xl:block text-fg-soft text-sm font-medium tracking-wider uppercase">
                      Online
                    </span>
                  </div>
                  
                  <div className="hidden xl:block w-px h-5 app-border"></div>
                  
                  <div className="hidden xl:flex items-center space-x-1 text-fg-soft font-mono">
                    <div className="flex items-center space-x-0.5">
                      {/* Horas */}
                      <span className="text-sm font-bold tracking-wider">
                        {currentTime.getHours().toString().padStart(2, '0')}
                      </span>
                      <span className="text-sm opacity-60 animate-pulse">:</span>
                      {/* Minutos */}
                      <span className="text-sm font-bold tracking-wider">
                        {currentTime.getMinutes().toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Botón de Tema */}
                <button
                  onClick={toggleTheme}
                  aria-label="Cambiar tema"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 border app-border bg-overlay-1 hover:bg-overlay-2"
                >
                  <span className="text-fg-muted text-lg">{resolvedTheme === 'dark' ? '🌙' : '☀️'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Efectos Visuales Mejorados - Con pointer-events-none para no bloquear clicks */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/8 via-transparent to-white/8 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/12 via-white/6 to-white/12 opacity-50 pointer-events-none"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-transparent to-black/15 opacity-50 pointer-events-none"></div>
        </div>
      </div>

      {/* Navbar Mobile Mejorado */}
      <div className="fixed top-3 left-3 z-50 md:hidden animate-fade-in-up">
        <button
          onClick={toggleMobileMenu}
          type="button"
          aria-label={isMobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
            className={`
            w-14 h-14 glass-effect depth-effect rounded-full
            flex items-center justify-center
            transition-all duration-300 ease-out
            hover:scale-105 active:scale-95
            ${isMobileMenuOpen ? 'bg-overlay-2' : ''}
          `}
        >
          <div className="flex flex-col items-center justify-center w-7 h-7">
            <span className={`
              block w-5 h-0.5 bg-fg rounded-full transition-all duration-300
              ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}
            `}></span>
            <span className={`
              block w-5 h-0.5 bg-fg rounded-full transition-all duration-300 mt-1.5
              ${isMobileMenuOpen ? 'opacity-0' : ''}
            `}></span>
            <span className={`
              block w-5 h-0.5 bg-fg rounded-full transition-all duration-300 mt-1.5
              ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}
            `}></span>
          </div>
        </button>
      </div>

      {/* Menú móvil mejorado */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-overlay-2 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
            <div id="mobile-menu" className="absolute top-16 left-1/2 -translate-x-1/2 w-[88vw] max-w-[520px] glass-effect-expanded depth-effect-expanded rounded-2xl p-5 animate-slide-in safe-area-inset">
            <nav className="flex flex-col space-y-3 sm:space-y-6">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleMobileItemClick}
                  className={`
                    text-fg-soft active:text-fg
                    font-semibold text-base tracking-wide
                    transition-all duration-300 ease-out
                    transform active:scale-95
                    px-5 py-3 rounded-xl
                    active:bg-overlay-1
                    text-center
                    uppercase
                    cursor-pointer
                    min-h-[44px] flex items-center justify-center
                    relative
                    ${activeSection === item.href.replace('#', '') ? 'bg-overlay-1 text-fg' : ''}
                    text-glow
                  `}
                  style={{
                    animationDelay: `${index * 80}ms`,
                    animationFillMode: 'both',
                    fontFamily: 'var(--font-space-grotesk)',
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </span>
                  
                  {activeSection === item.href.replace('#', '') && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-fg-soft rounded-full animate-pulse-fast"></div>
                  )}
                </a>
              ))}
            </nav>
            
            {/* Información adicional en móvil */}
            <div className="mt-5 pt-5 border-t app-border">
              <div className="text-center">
                <div className="text-fg-muted text-xs mb-1">Gustavo Rodríguez</div>
                <div className="text-fg-muted text-[11px]">Fullstack Developer</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}