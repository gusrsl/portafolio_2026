'use client';

import { useState, useEffect, useRef } from 'react';

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
  const [isMobile, setIsMobile] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    const debouncedResize = debounce(checkMobile, 150);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  // Función debounce para optimizar el resize
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

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
      setIsScrolled(scrollTop > 50);
      
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

  // Función para manejar el scroll suave
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    console.log('🔥 CLICK DETECTADO! Navegando a:', href);
    console.log('📱 Event object:', e);
    console.log('🎯 Target element:', e.target);
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    console.log('🎯 Elemento encontrado:', targetElement);
    console.log('📍 ID buscado:', targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop;
      const navbarHeight = 100; // Altura aproximada del navbar
      
      console.log('📏 Offset top:', offsetTop);
      console.log('🧭 Scrolling to:', offsetTop - navbarHeight);
      
      window.scrollTo({
        top: offsetTop - navbarHeight,
        behavior: 'smooth'
      });
    } else {
      console.error('❌ No se encontró el elemento con ID:', targetId);
      // Listar todos los elementos con ID para debug
      const allElementsWithId = document.querySelectorAll('[id]');
      console.log('📋 Elementos con ID disponibles:', Array.from(allElementsWithId).map(el => el.id));
     }
   };

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
                : 'w-[90vw] max-w-[1200px] h-16 sm:h-20 glass-effect-expanded depth-effect-expanded'
              }
            rounded-full
            transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
            group
            hover:scale-[1.01]
            active:scale-[0.99]
          `}
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
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="rgba(255, 255, 255, 0.9)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 9}`}
                    strokeDashoffset={`${2 * Math.PI * 9 * (1 - loadingProgress / 100)}`}
                    className="transition-all duration-100 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white/90 rounded-full animate-pulse-custom"></div>
                </div>
              </div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="text-white/60 text-xs font-mono tracking-wider">
                  {Math.round(loadingProgress)}%
                </div>
              </div>
            </div>
          )}

          {/* Contenido Principal - Siempre Expandido */}
          {!isLoading && isVisible && (
            <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-8 lg:px-16 animate-slide-in">
              {/* Logo y Marca */}
              <div className="flex items-center space-x-3 sm:space-x-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <span className="text-white font-bold text-sm sm:text-lg">GR</span>
                  </div>
                  <div className="hidden lg:block min-w-[200px]">
                    <div className="text-white/90 font-semibold text-base tracking-wide">Gustavo Rodríguez</div>
                    <div className="text-white/60 text-sm tracking-wider">Fullstack Developer</div>
                  </div>
                </div>
              
              {/* Navegación Principal */}
              <nav className="flex items-center space-x-8">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                      className={`
                        group relative
                        font-semibold text-sm tracking-wide
                        transition-all duration-300 ease-out
                        transform hover:scale-105 hover:-translate-y-0.5
                        ${item.label === 'Sobre mí' ? 'px-10 py-3 whitespace-nowrap' : 'px-6 py-3'} rounded-xl
                        cursor-pointer
                        ${
                          isActive 
                            ? 'text-white bg-white/15 border border-white/20' 
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }
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
                      <span className="uppercase tracking-wider text-base font-medium">
                        {item.label}
                      </span>
                      
                      {/* Efecto de brillo */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl transform scale-x-0 group-hover:scale-x-100 pointer-events-none"></div>
                      
                      {/* Indicador activo */}
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse pointer-events-none"></div>
                      )}
                    </a>
                  );
                })}
              </nav>

              {/* Panel de Estado y Herramientas */}
              <div className="flex items-center space-x-4">
                {/* Indicador de Progreso de Scroll */}
                <div className="hidden xl:flex items-center space-x-2">
                  <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-white/60 to-white/90 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${scrollProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-white/60 text-sm font-mono font-medium">
                    {Math.round(scrollProgress)}%
                  </span>
                </div>
                
                {/* Separador */}
                <div className="w-px h-4 bg-white/20"></div>
                
                {/* Estado del Sistema */}
                <div className="flex items-center space-x-3 px-4 py-2 bg-white/10 rounded-xl border border-white/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="hidden md:block text-white/80 text-sm font-medium tracking-wider uppercase">
                      Online
                    </span>
                  </div>
                  
                  <div className="hidden md:block w-px h-5 bg-white/20"></div>
                  
                  <div className="hidden md:flex items-center space-x-1 text-white/90 font-mono">
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
                
                {/* Botón de Tema (placeholder para futuro) */}
                <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-white/20">
                  <span className="text-white/70 text-lg">🌙</span>
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
      <div className="fixed top-4 left-4 z-50 md:hidden animate-fade-in-up">
        <button
          onClick={toggleMobileMenu}
          className={`
            w-20 h-20 glass-effect depth-effect rounded-full
            flex items-center justify-center
            transition-all duration-300 ease-out
            hover:scale-105 active:scale-95
            ${isMobileMenuOpen ? 'bg-white/15' : ''}
          `}
        >
          <div className="flex flex-col items-center justify-center w-8 h-8">
            <span className={`
              block w-6 h-0.5 bg-white/90 rounded-full transition-all duration-300
              ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}
            `}></span>
            <span className={`
              block w-6 h-0.5 bg-white/90 rounded-full transition-all duration-300 mt-2
              ${isMobileMenuOpen ? 'opacity-0' : ''}
            `}></span>
            <span className={`
              block w-6 h-0.5 bg-white/90 rounded-full transition-all duration-300 mt-2
              ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}
            `}></span>
          </div>
        </button>
      </div>

      {/* Menú móvil mejorado */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          <div className="absolute top-16 sm:top-20 left-4 right-4 glass-effect-expanded depth-effect-expanded rounded-2xl sm:rounded-3xl p-6 sm:p-10 animate-slide-in safe-area-inset">
            <nav className="flex flex-col space-y-3 sm:space-y-6">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    handleSmoothScroll(e, item.href);
                    handleMobileItemClick();
                  }}
                  className={`
                    text-white/90 active:text-white
                    font-semibold text-lg sm:text-xl tracking-wide
                    transition-all duration-300 ease-out
                    transform active:scale-95
                    px-6 sm:px-8 py-4 sm:py-6 rounded-xl sm:rounded-2xl
                    active:bg-white/10
                    text-center
                    uppercase
                    cursor-pointer
                    min-h-[48px] flex items-center justify-center
                    relative
                    ${activeSection === item.href.replace('#', '') ? 'bg-white/15 text-white' : ''}
                    text-glow
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both',
                    fontFamily: 'var(--font-space-grotesk)',
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg sm:text-xl">{item.icon}</span>
                    {item.label}
                  </span>
                  
                  {activeSection === item.href.replace('#', '') && (
                    <div className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-white/90 rounded-full animate-pulse-fast"></div>
                  )}
                </a>
              ))}
            </nav>
            
            {/* Información adicional en móvil */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-white/60 text-xs sm:text-sm mb-2">Gustavo Rodríguez</div>
                <div className="text-white/40 text-xs">Fullstack Developer</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}