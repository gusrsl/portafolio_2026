'use client';

import DynamicNavbar from '@/components/DynamicNavbar';
import SectionTransition from '@/components/SectionTransition';
import { MainSpline3D } from '@/components/Spline3D';
import { InteractivePhysics } from '@/components/PhysicsElements';
import { AdvancedParticles } from '@/components/AdvancedAnimations';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import TechStackSection from '@/components/TechStackSection';
import GithubStatsSection from '@/components/GithubStatsSection';
import ResumeSection from '@/components/ResumeSection';
import { profile } from '@/data/profile';

export default function Home() {
  return (
    <main className="relative min-h-screen app-bg app-fg overflow-x-hidden">
      {/* Navbar dinámico */}
      <DynamicNavbar />
      
      {/* Sección Hero con Spline */}
        <section id="inicio" className="relative min-h-screen w-full overflow-hidden safe-area-inset">
        {/* Fondo 3D en móviles/tablet: Spline a pantalla completa detrás del contenido */}
          <div className="absolute inset-0 lg:hidden">
          <div className="absolute inset-0">
            <MainSpline3D className="w-full h-full" disableOnMobile={false} />
          </div>
            {/* Capa translúcida sobre la animación */}
            <div className="absolute inset-0 bg-overlay-1" />
        </div>
        {/* Grid Layout para Hero - Responsive */}
        <div className="relative h-full min-h-screen grid grid-cols-1 lg:grid-cols-[35%_65%] items-center">
          
          {/* Columna Izquierda - Contenido de Texto */}
          <div className="relative z-20 mobile-px-4 flex flex-col justify-center h-full min-h-screen lg:min-h-0 py-20 lg:py-0">
            {/* Fondo glass para el texto en móvil */}
            <div className="lg:hidden absolute inset-0 bg-transparent"></div>
            
            <div className="relative z-10 max-w-full sm:max-w-lg lg:max-w-xl">
              <SectionTransition effect="fade-up" delay={800}>
                 <h1 className="hero-title-improved font-space-grotesk mb-4 sm:mb-6 leading-tight text-fg text-center lg:text-left">
                   <span className="block">{profile.fullName.split(' ').slice(0,2).join(' ')}</span>
                   <span className="block text-gradient-hero-improved">{profile.fullName.split(' ').slice(2).join(' ')}</span>
                 </h1>
              </SectionTransition>
              
              <SectionTransition effect="fade-up" delay={1100}>
                <div className="hero-badge mb-6 sm:mb-8 mx-auto lg:mx-0 max-w-fit">
                   <span className="text-xs sm:text-sm font-medium text-fg tracking-wider uppercase text-center block">
                     {profile.role}
                   </span>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                     <span className="text-xs sm:text-sm text-fg-muted">Disponible para proyectos • {profile.location}</span>
                  </div>
                </div>
              </SectionTransition>
              
              <SectionTransition effect="fade-up" delay={1400}>
                <p className="text-responsive-lg text-fg-soft font-inter mb-8 sm:mb-10 leading-relaxed text-center lg:text-left">
                  Ingeniero en Tecnologías de la Información con más de 3 años de experiencia 
                  creando <span className="text-fg font-semibold">soluciones digitales escalables</span> y 
                  especializándome en <span className="text-fg font-semibold">computación en la nube</span>.
                </p>
              </SectionTransition>
              
              <SectionTransition effect="fade-up" delay={1700}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
                  <a 
                    href="#proyectos"
                    className="btn-primary-hero group flex-1 sm:flex-initial"
                  >
                    <span>Ver Proyectos</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a 
                    href="#contacto"
                    className="btn-secondary-hero flex-1 sm:flex-initial"
                  >
                    Contactar
                  </a>
                </div>
              </SectionTransition>
              
              {/* Stats rápidas */}
              <SectionTransition effect="fade-up" delay={2000}>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t app-border">
                  <div className="text-center lg:text-left">
                     <div className="text-xl sm:text-2xl font-bold text-fg">{profile.experienceYears}+</div>
                    <div className="text-xs sm:text-sm text-fg-muted">Años de experiencia</div>
                  </div>
                  <div>
                     <div className="text-2xl font-bold text-fg">{profile.completedProjects}+</div>
                    <div className="text-sm text-fg-muted">Proyectos completados</div>
                  </div>
                  <div>
                     <div className="text-2xl font-bold text-fg">AWS</div>
                    <div className="text-sm text-fg-muted">Certificado</div>
                  </div>
                </div>
              </SectionTransition>
            </div>
          </div>
          
          {/* Columna Derecha - Animación Spline (solo desktop) */}
          <div className="relative h-full hidden lg:flex items-center justify-center">
            {/* Contenedor de la animación */}
            <div className="relative w-full h-full lg:w-[130%] lg:h-[130%] flex items-center justify-center">
              {/* Overlay decorativo solo desktop, la versión móvil se gestiona arriba */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20 z-0 pointer-events-none"></div>
              
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
            <span className="text-fg-muted text-sm font-medium">Scroll para explorar</span>
            <div className="w-6 h-10 border-2 app-border rounded-full flex justify-center">
              <div className="w-1 h-3 bg-fg-soft rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección Proyectos */}
      <ProjectsSection />
      
      {/* Sección Sobre Mí */}
      <AboutSection />
      
      {/* Sección Tecnologías */}
      <TechStackSection />

      {/* CV resumido */}
      <ResumeSection />

      {/* Sección GitHub */}
      <GithubStatsSection />

      {/* Sección Contacto (unificada) */}
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-16 px-6 sm:px-8 border-t app-border bg-overlay-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold font-space-grotesk text-gradient-accent mb-4">{profile.shortName}</h3>
              <p className="text-fg-muted font-inter leading-relaxed">
                Desarrollador Full Stack especializado en crear experiencias digitales innovadoras.
              </p>
            </div>
            
            <div className="text-center">
              <h4 className="text-lg font-bold font-poppins text-fg mb-4">Enlaces Rápidos</h4>
              <div className="space-y-2">
                <a href="#inicio" className="block text-fg-muted hover:text-fg transition-colors font-inter">Inicio</a>
                <a href="#proyectos" className="block text-fg-muted hover:text-fg transition-colors font-inter">Proyectos</a>
                <a href="#sobre-mi" className="block text-fg-muted hover:text-fg transition-colors font-inter">Sobre Mí</a>
                <a href="#contacto" className="block text-fg-muted hover:text-fg transition-colors font-inter">Contacto</a>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <h4 className="text-lg font-bold font-poppins text-fg mb-4">Sígueme</h4>
              <div className="flex justify-center md:justify-end gap-4">
                <a href="#" className="w-10 h-10 bg-overlay-1 rounded-full flex items-center justify-center hover:bg-overlay-2 transition-colors">
                  <span className="text-lg">💼</span>
                </a>
                <a href="#" className="w-10 h-10 bg-overlay-1 rounded-full flex items-center justify-center hover:bg-overlay-2 transition-colors">
                  <span className="text-lg">🐙</span>
                </a>
                <a href="#" className="w-10 h-10 bg-overlay-1 rounded-full flex items-center justify-center hover:bg-overlay-2 transition-colors">
                  <span className="text-lg">🐦</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t app-border pt-8 text-center">
            <p className="text-fg-muted font-inter">
              © {new Date().getFullYear()} {profile.shortName}. Todos los derechos reservados. Hecho con ❤️ y mucho café.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
