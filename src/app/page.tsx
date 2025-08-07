'use client';

import DynamicNavbar from '@/components/DynamicNavbar';
import SectionTransition from '@/components/SectionTransition';
import { MainSpline3D } from '@/components/Spline3D';
import { InteractivePhysics } from '@/components/PhysicsElements';
import { AdvancedParticles, FloatingText, ParallaxElement } from '@/components/AdvancedAnimations';
import ProjectsSection from '@/components/ProjectsSection';

export default function Home() {
  // Función para manejar el scroll suave
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop;
      const navbarHeight = 100; // Altura aproximada del navbar
      
      window.scrollTo({
        top: offsetTop - navbarHeight,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar dinámico */}
      <DynamicNavbar />
      
      {/* Sección Hero con Spline */}
      <section id="inicio" className="relative min-h-screen w-full overflow-hidden safe-area-inset">
        {/* Grid Layout para Hero - Responsive */}
        <div className="relative h-full min-h-screen grid grid-cols-1 lg:grid-cols-[35%_65%] items-center">
          
          {/* Columna Izquierda - Contenido de Texto */}
          <div className="relative z-20 mobile-px-4 flex flex-col justify-center h-full min-h-screen lg:min-h-0 py-20 lg:py-0">
            {/* Fondo glass para el texto en móvil */}
            <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50 backdrop-blur-sm"></div>
            
            <div className="relative z-10 max-w-full sm:max-w-lg lg:max-w-xl">
              <SectionTransition effect="fade-up" delay={800}>
                <h1 className="hero-title-improved font-space-grotesk mb-4 sm:mb-6 leading-tight text-white text-center lg:text-left">
                  <span className="block">Gustavo Emilio</span>
                  <span className="block text-gradient-hero-improved">Rodríguez San Lucas</span>
                </h1>
              </SectionTransition>
              
              <SectionTransition effect="fade-up" delay={1100}>
                <div className="hero-badge mb-6 sm:mb-8 mx-auto lg:mx-0 max-w-fit">
                  <span className="text-xs sm:text-sm font-medium text-white/90 tracking-wider uppercase text-center block">
                    Fullstack Developer • AWS Developer Associate
                  </span>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm text-white/70">Disponible para proyectos • Manta, Ecuador</span>
                  </div>
                </div>
              </SectionTransition>
              
              <SectionTransition effect="fade-up" delay={1400}>
                <p className="text-responsive-lg text-white/85 font-inter mb-8 sm:mb-10 leading-relaxed text-center lg:text-left">
                  Ingeniero en Tecnologías de la Información con más de 3 años de experiencia 
                  creando <span className="text-white font-semibold">soluciones digitales escalables</span> y 
                  especializándome en <span className="text-white font-semibold">computación en la nube</span>.
                </p>
              </SectionTransition>
              
              <SectionTransition effect="fade-up" delay={1700}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
                  <a 
                    href="#proyectos" 
                    onClick={(e) => handleSmoothScroll(e, '#proyectos')}
                    className="btn-primary-hero group flex-1 sm:flex-initial"
                  >
                    <span>Ver Proyectos</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a 
                    href="#contacto" 
                    onClick={(e) => handleSmoothScroll(e, '#contacto')}
                    className="btn-secondary-hero flex-1 sm:flex-initial"
                  >
                    Contactar
                  </a>
                </div>
              </SectionTransition>
              
              {/* Stats rápidas */}
              <SectionTransition effect="fade-up" delay={2000}>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
                  <div className="text-center lg:text-left">
                    <div className="text-xl sm:text-2xl font-bold text-white">3+</div>
                    <div className="text-xs sm:text-sm text-white/60">Años de experiencia</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">15+</div>
                    <div className="text-sm text-white/60">Proyectos completados</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">AWS</div>
                    <div className="text-sm text-white/60">Certificado</div>
                  </div>
                </div>
              </SectionTransition>
            </div>
          </div>
          
          {/* Columna Derecha - Animación Spline */}
          <div className="relative h-full flex items-center justify-center">
            {/* Contenedor de la animación */}
            <div className="relative w-full h-full lg:w-[130%] lg:h-[130%] flex items-center justify-center">
              {/* Overlay decorativo - Movido arriba para no bloquear interacciones */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20 lg:to-black/40 z-0 lg:hidden pointer-events-none"></div>
              
              {/* Fondo 3D Interactivo con Spline */}
              <div className="absolute inset-0 z-10">
                <MainSpline3D className="w-full h-full" />
              </div>
                
              {/* Elementos de física interactiva */}
              <div className="absolute inset-0 z-5 pointer-events-none">
                <InteractivePhysics className="w-full h-full" />
              </div>
                
              {/* Partículas avanzadas */}
              <div className="absolute inset-0 z-5 pointer-events-none">
                <AdvancedParticles className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/60 text-sm font-medium">Scroll para explorar</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección Proyectos */}
      <ProjectsSection />
      
      {/* Sección Sobre Mí */}
      <section id="sobre-mi" className="min-h-screen py-24 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTransition effect="fade-up">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-space-grotesk font-bold mb-6 text-gradient-hero leading-tight">
                Sobre Mí
              </h2>
              <p className="text-xl text-white/70 font-inter max-w-3xl mx-auto leading-relaxed">
                Desarrollador Full Stack apasionado por la innovación tecnológica y la creación 
                de experiencias digitales que transforman ideas en realidades impactantes.
              </p>
            </div>
          </SectionTransition>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
            <SectionTransition effect="fade-slide" delay={200}>
              <div className="space-y-8">
                <div className="liquid-glass rounded-3xl p-8 hover:scale-105 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-xl">🚀</span>
                    </div>
                    <h3 className="text-3xl font-bold font-poppins text-gradient-accent">Mi Trayectoria</h3>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed font-inter mb-6">
                    Ingeniero en Tecnologías de la Información con más de 3 años de experiencia en desarrollo 
                    de aplicaciones web y móviles. Actualmente trabajo como Desarrollador Fullstack en Marbelize S.A., 
                    donde desarrollo aplicaciones con Angular y Node.js, implemento APIs RESTful y automatizo procesos 
                    con Python y Django.
                  </p>
                  <p className="text-white/80 text-lg leading-relaxed font-inter mb-6">
                    Mi especialización incluye configuración de CI/CD con Jenkins, Docker y GitHub, administración 
                    de bases de datos SQL Server y PostgreSQL, y despliegue de aplicaciones en AWS usando contenedores 
                    Docker. Trabajo en equipos ágiles bajo metodología Scrum con Jira.
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-sm font-medium border border-white/10">🎓 Ing. Tecnologías de la Información</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full text-sm font-medium border border-white/10">🏆 AWS Developer Associate</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-sm font-medium border border-white/10">🌟 Scrum Certified</span>
                  </div>
                </div>
                
                <div className="liquid-glass rounded-3xl p-8 hover:scale-105 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-xl">💡</span>
                    </div>
                    <h3 className="text-3xl font-bold font-poppins text-gradient-accent">Filosofía de Trabajo</h3>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed font-inter mb-6">
                    Mi enfoque se basa en la comunicación efectiva, el pensamiento crítico y la adaptabilidad. 
                    Creo en soluciones escalables con código limpio, trabajando en equipos ágiles bajo metodología 
                    Scrum para entregar proyectos de alta calidad.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                      <span className="text-2xl">🤝</span>
                      <span className="text-white/90 font-medium">Comunicación Efectiva</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                      <span className="text-2xl">🧠</span>
                      <span className="text-white/90 font-medium">Pensamiento Crítico</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                      <span className="text-2xl">🔄</span>
                      <span className="text-white/90 font-medium">Metodologías Ágiles</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                      <span className="text-2xl">⚡</span>
                      <span className="text-white/90 font-medium">Soluciones Escalables</span>
                    </div>
                  </div>
                </div>
              </div>
            </SectionTransition>
            
            <SectionTransition effect="fade-scale" delay={400}>
              <div className="space-y-8">
                <div className="liquid-glass rounded-3xl p-8 relative overflow-hidden hover:scale-105 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl"></div>
                  <div className="relative z-10">
                    <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                      <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 animate-pulse"></div>
                        <span className="text-6xl relative z-10">👨‍💻</span>
                      </div>
                    </div>
                    <div className="text-center space-y-4">
                      <h3 className="text-3xl font-bold text-white font-poppins">Gustavo Rodríguez</h3>
                      <p className="text-xl text-gradient-accent font-medium">Senior Full Stack Developer</p>
                      <p className="text-white/70 font-inter">Especialista en React, Node.js & Cloud Architecture</p>
                      <div className="flex justify-center gap-4 pt-6">
                        <div className="glass-effect rounded-full p-4 hover:scale-110 hover:bg-white/10 transition-all cursor-pointer group">
                          <span className="text-2xl group-hover:scale-110 transition-transform inline-block">💼</span>
                        </div>
                        <div className="glass-effect rounded-full p-4 hover:scale-110 hover:bg-white/10 transition-all cursor-pointer group">
                          <span className="text-2xl group-hover:scale-110 transition-transform inline-block">🌐</span>
                        </div>
                        <div className="glass-effect rounded-full p-4 hover:scale-110 hover:bg-white/10 transition-all cursor-pointer group">
                          <span className="text-2xl group-hover:scale-110 transition-transform inline-block">📧</span>
                        </div>
                        <div className="glass-effect rounded-full p-4 hover:scale-110 hover:bg-white/10 transition-all cursor-pointer group">
                          <span className="text-2xl group-hover:scale-110 transition-transform inline-block">📱</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="liquid-glass rounded-3xl p-8 hover:scale-105 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xl">📊</span>
                    </div>
                    <h3 className="text-2xl font-bold font-poppins text-gradient-accent">Estadísticas</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <div className="text-3xl font-bold text-gradient-accent mb-2">3+</div>
                      <div className="text-white/70 text-sm font-inter">Años Experiencia</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <div className="text-3xl font-bold text-gradient-accent mb-2">40%</div>
                      <div className="text-white/70 text-sm font-inter">Reducción Tiempo Deploy</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <div className="text-3xl font-bold text-gradient-accent mb-2">B1</div>
                      <div className="text-white/70 text-sm font-inter">Nivel Inglés</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <div className="text-3xl font-bold text-gradient-accent mb-2">AWS</div>
                      <div className="text-white/70 text-sm font-inter">Certified Developer</div>
                    </div>
                  </div>
                </div>
              </div>
            </SectionTransition>
          </div>
          
          {/* Stack Tecnológico */}
          <SectionTransition effect="fade-up" delay={600}>
            <div className="liquid-glass rounded-3xl p-8 hover:scale-105 transition-all duration-500">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold font-poppins text-gradient-accent mb-4">Stack Tecnológico</h3>
                <p className="text-white/70 font-inter text-lg">Tecnologías y herramientas que domino para crear soluciones excepcionales</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Frontend */}
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-white font-poppins text-center mb-6">Frontend</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-white">A</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Angular</div>
                        <div className="text-white/60 text-sm">Experto</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-white">TS</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">TypeScript</div>
                        <div className="text-white/60 text-sm">Avanzado</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-white">I</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Ionic</div>
                        <div className="text-white/60 text-sm">Avanzado</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-white">V</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Vue.js & React</div>
                        <div className="text-white/60 text-sm">Intermedio</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Backend */}
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-white font-poppins text-center mb-6">Backend</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-white">N</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Node.js & Express</div>
                        <div className="text-white/60 text-sm">Experto</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-white">Py</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Python & Django</div>
                        <div className="text-white/60 text-sm">Avanzado</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-white">SQL</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">SQL Server & PostgreSQL</div>
                        <div className="text-white/60 text-sm">Experto</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-white">API</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">APIs RESTful</div>
                        <div className="text-white/60 text-sm">Avanzado</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* DevOps & Cloud */}
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-white font-poppins text-center mb-6">DevOps & Cloud</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-white">AWS</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Amazon Web Services</div>
                        <div className="text-white/60 text-sm">Experto</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-white">D</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Docker & Portainer</div>
                        <div className="text-white/60 text-sm">Avanzado</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-white">J</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Jenkins CI/CD</div>
                        <div className="text-white/60 text-sm">Avanzado</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-white">Git</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Git & GitHub</div>
                        <div className="text-white/60 text-sm">Experto</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionTransition>
        </div>
      </section>
      
      {/* Sección Contacto */}
      <section id="contacto" className="min-h-screen py-24 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTransition effect="fade-up">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-space-grotesk font-bold mb-6 text-gradient-hero leading-tight">
                Contacto
              </h2>
              <p className="text-xl text-white/70 font-inter max-w-3xl mx-auto leading-relaxed">
                ¿Tienes una idea brillante? ¡Hagámosla realidad juntos! Estoy aquí para 
                transformar tu visión en una solución digital excepcional.
              </p>
            </div>
          </SectionTransition>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <SectionTransition effect="fade-slide" delay={200}>
              <div className="space-y-8">
                <div className="liquid-glass rounded-3xl p-8 hover:scale-105 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-xl">💬</span>
                    </div>
                    <h3 className="text-3xl font-bold font-poppins text-gradient-accent">¡Hablemos!</h3>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed font-inter mb-8">
                    ¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas y 
                    ayudarte a convertirlas en realidad. Contactemos y creemos algo increíble juntos.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-xl">📧</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white font-poppins group-hover:text-gradient-accent transition-colors">Email</h4>
                        <p className="text-white/70 font-inter">gustavo.rodriguez@email.com</p>
                        <p className="text-white/50 text-sm font-inter">Respuesta en 24 horas</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-xl">💼</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white font-poppins group-hover:text-gradient-accent transition-colors">LinkedIn</h4>
                        <p className="text-white/70 font-inter">linkedin.com/in/gustavo-rodriguez</p>
                        <p className="text-white/50 text-sm font-inter">Conectemos profesionalmente</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-xl">📱</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white font-poppins group-hover:text-gradient-accent transition-colors">WhatsApp</h4>
                        <p className="text-white/70 font-inter">+1 (555) 123-4567</p>
                        <p className="text-white/50 text-sm font-inter">Disponible 9AM - 6PM EST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-xl">📅</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white font-poppins group-hover:text-gradient-accent transition-colors">Calendly</h4>
                        <p className="text-white/70 font-inter">calendly.com/gustavo-dev</p>
                        <p className="text-white/50 text-sm font-inter">Agenda una consulta gratuita</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="liquid-glass rounded-3xl p-8 hover:scale-105 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-xl">🌍</span>
                    </div>
                    <h3 className="text-2xl font-bold font-poppins text-gradient-accent">Ubicación & Disponibilidad</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📍</span>
                      <span className="text-white/80 font-inter">Manta, Ecuador</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">🌐</span>
                      <span className="text-white/80 font-inter">Trabajo remoto disponible</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">⏰</span>
                      <span className="text-white/80 font-inter">GMT-5 (Horario de Ecuador)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">✅</span>
                      <span className="text-white/80 font-inter">Disponible para nuevos proyectos</span>
                    </div>
                  </div>
                </div>
              </div>
            </SectionTransition>
            
            <SectionTransition effect="fade-scale" delay={400}>
              <div className="liquid-glass rounded-3xl p-8 hover:scale-105 transition-all duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xl">✉️</span>
                  </div>
                  <h3 className="text-3xl font-bold font-poppins text-gradient-accent">Envíame un mensaje</h3>
                </div>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 font-medium mb-2 font-inter">Nombre *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all duration-300 font-inter"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 font-medium mb-2 font-inter">Email *</label>
                      <input 
                        type="email" 
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all duration-300 font-inter"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 font-medium mb-2 font-inter">Empresa</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all duration-300 font-inter"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 font-medium mb-2 font-inter">Tipo de Proyecto</label>
                      <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all duration-300 font-inter">
                        <option value="" className="bg-gray-800">Selecciona una opción</option>
                        <option value="web" className="bg-gray-800">Aplicación Web</option>
                        <option value="mobile" className="bg-gray-800">Aplicación Móvil</option>
                        <option value="ecommerce" className="bg-gray-800">E-commerce</option>
                        <option value="api" className="bg-gray-800">API/Backend</option>
                        <option value="consulting" className="bg-gray-800">Consultoría</option>
                        <option value="other" className="bg-gray-800">Otro</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white/80 font-medium mb-2 font-inter">Presupuesto Estimado</label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all duration-300 font-inter">
                      <option value="" className="bg-gray-800">Selecciona un rango</option>
                      <option value="5k-10k" className="bg-gray-800">$5,000 - $10,000</option>
                      <option value="10k-25k" className="bg-gray-800">$10,000 - $25,000</option>
                      <option value="25k-50k" className="bg-gray-800">$25,000 - $50,000</option>
                      <option value="50k+" className="bg-gray-800">$50,000+</option>
                      <option value="discuss" className="bg-gray-800">Prefiero discutirlo</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white/80 font-medium mb-2 font-inter">Mensaje *</label>
                    <textarea 
                      rows={6}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all duration-300 font-inter resize-none"
                      placeholder="Cuéntame sobre tu proyecto, objetivos, timeline y cualquier detalle relevante..."
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="privacy" 
                      className="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="privacy" className="text-white/70 text-sm font-inter">
                      Acepto la política de privacidad y el tratamiento de mis datos personales
                    </label>
                  </div>
                  
                  <button 
                    type="submit"
                    className="btn-liquid-glass w-full py-4 rounded-xl text-white font-bold font-poppins text-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <span className="relative z-10">Enviar Mensaje</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  
                  <p className="text-white/50 text-sm font-inter text-center">
                    📧 Te responderé en menos de 24 horas
                  </p>
                </form>
              </div>
            </SectionTransition>
          </div>
          
          {/* Llamada a la Acción Final */}
          <SectionTransition effect="fade-up" delay={600}>
            <div className="liquid-glass rounded-3xl p-12 text-center hover:scale-105 transition-all duration-500">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-4xl md:text-5xl font-bold font-space-grotesk text-gradient-hero mb-6">
                  ¿Listo para comenzar tu próximo proyecto?
                </h3>
                <p className="text-xl text-white/70 font-inter mb-8 leading-relaxed">
                  Transformemos tu idea en una realidad digital excepcional. 
                  Con experiencia comprobada y pasión por la innovación, 
                  estoy aquí para llevar tu proyecto al siguiente nivel.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <button className="btn-liquid-glass px-8 py-4 rounded-xl text-white font-bold font-poppins text-lg transform hover:scale-105 transition-all duration-300">
                    Iniciar Proyecto
                  </button>
                  <button className="btn-liquid-glass px-8 py-4 rounded-xl text-white font-bold font-poppins text-lg transform hover:scale-105 transition-all duration-300">
                    Ver Portfolio
                  </button>
                </div>
                <div className="flex justify-center gap-8 mt-8 text-white/60">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient-accent">48h</div>
                    <div className="text-sm font-inter">Tiempo de respuesta</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient-accent">100%</div>
                    <div className="text-sm font-inter">Proyectos entregados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient-accent">5★</div>
                    <div className="text-sm font-inter">Rating promedio</div>
                  </div>
                </div>
              </div>
            </div>
          </SectionTransition>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 px-6 sm:px-8 border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold font-space-grotesk text-gradient-accent mb-4">Gustavo Rodríguez</h3>
              <p className="text-white/70 font-inter leading-relaxed">
                Desarrollador Full Stack especializado en crear experiencias digitales innovadoras.
              </p>
            </div>
            
            <div className="text-center">
              <h4 className="text-lg font-bold font-poppins text-white mb-4">Enlaces Rápidos</h4>
              <div className="space-y-2">
                <a href="#inicio" className="block text-white/70 hover:text-white transition-colors font-inter">Inicio</a>
                <a href="#proyectos" className="block text-white/70 hover:text-white transition-colors font-inter">Proyectos</a>
                <a href="#sobre-mi" className="block text-white/70 hover:text-white transition-colors font-inter">Sobre Mí</a>
                <a href="#contacto" className="block text-white/70 hover:text-white transition-colors font-inter">Contacto</a>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <h4 className="text-lg font-bold font-poppins text-white mb-4">Sígueme</h4>
              <div className="flex justify-center md:justify-end gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="text-lg">💼</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="text-lg">🐙</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="text-lg">🐦</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/60 font-inter">
              © 2024 Gustavo Rodríguez. Todos los derechos reservados. Hecho con ❤️ y mucho café.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
