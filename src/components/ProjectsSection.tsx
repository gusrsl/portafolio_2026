'use client';

import { useState, useRef, useEffect } from 'react';
import SectionTransition from './SectionTransition';
import { FloatingText } from './AdvancedAnimations';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  image: string;
  gradient: string;
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  status: 'completed' | 'in-progress' | 'planning';
  year: number;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Backend API",
    description: "Backend robusto para aplicación de comercio electrónico con autenticación JWT y gestión completa de productos.",
    longDescription: "Sistema backend completo desarrollado con Node.js y Express.js, implementando arquitectura RESTful con autenticación JWT, gestión de usuarios, productos, órdenes y sistema de pagos integrado con Stripe. Base de datos SQL Server optimizada con procedimientos almacenados.",
    technologies: ["Node.js", "Express.js", "SQL Server", "JWT", "Stripe", "Bcrypt", "Cors"],
    category: "Backend",
    image: "🔐",
    gradient: "from-purple-500 to-pink-500",
    githubUrl: "https://github.com/gustavo-rodriguez/ecommerce-backend",
    features: ["Autenticación JWT", "API RESTful", "Gestión de productos", "Sistema de pagos", "Validación de datos"],
    status: "completed",
    year: 2024
  },
  {
    id: 2,
    title: "E-Commerce Frontend App",
    description: "Interfaz moderna y responsiva para tienda online desarrollada con Angular e Ionic.",
    longDescription: "Aplicación frontend multiplataforma desarrollada con Angular e Ionic, ofreciendo una experiencia de usuario fluida tanto en web como en dispositivos móviles. Implementa carrito de compras, autenticación, catálogo de productos y integración con pasarelas de pago.",
    technologies: ["Angular", "Ionic", "TypeScript", "SCSS", "RxJS", "Capacitor"],
    category: "Frontend",
    image: "🛒",
    gradient: "from-blue-500 to-cyan-500",
    githubUrl: "https://github.com/gustavo-rodriguez/ecommerce-frontend",
    liveUrl: "https://ecommerce-demo.vercel.app",
    features: ["Diseño responsivo", "PWA", "Carrito de compras", "Autenticación", "Multiplataforma"],
    status: "completed",
    year: 2024
  },
  {
    id: 3,
    title: "Dashboard Empresarial",
    description: "Aplicación móvil con dashboard interactivo y notificaciones push en tiempo real.",
    longDescription: "Dashboard empresarial desarrollado con Ionic y Angular, featuring analytics en tiempo real, notificaciones push, gestión de usuarios y reportes interactivos. Integración con APIs externas y sincronización offline.",
    technologies: ["Ionic", "Angular", "TypeScript", "Chart.js", "Firebase", "PWA"],
    category: "Mobile",
    image: "📊",
    gradient: "from-green-500 to-emerald-500",
    githubUrl: "https://github.com/gustavo-rodriguez/dashboard-ionic",
    liveUrl: "https://dashboard-demo.netlify.app",
    features: ["Analytics en tiempo real", "Push notifications", "Reportes interactivos", "Modo offline", "Multi-usuario"],
    status: "completed",
    year: 2023
  },
  {
    id: 4,
    title: "Sistema de Gestión AWS",
    description: "Plataforma cloud-native desarrollada en AWS con arquitectura serverless y microservicios.",
    longDescription: "Sistema de gestión empresarial desplegado en AWS utilizando Lambda, API Gateway, DynamoDB y S3. Implementa arquitectura serverless con alta disponibilidad, escalabilidad automática y costos optimizados.",
    technologies: ["AWS Lambda", "API Gateway", "DynamoDB", "S3", "CloudFormation", "Python"],
    category: "Cloud",
    image: "☁️",
    gradient: "from-orange-500 to-red-500",
    githubUrl: "https://github.com/gustavo-rodriguez/aws-management-system",
    features: ["Arquitectura serverless", "Auto-scaling", "Alta disponibilidad", "Costos optimizados", "CI/CD"],
    status: "completed",
    year: 2023
  },
  {
    id: 5,
    title: "Portfolio Personal 2026",
    description: "Portfolio personal moderno con animaciones 3D, cursor personalizado y efectos avanzados.",
    longDescription: "Portfolio personal desarrollado con Next.js 14, featuring animaciones 3D con Spline, cursor animado personalizado, efectos de partículas, transiciones suaves y diseño responsive. Optimizado para rendimiento y SEO.",
    technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Spline 3D", "Framer Motion", "Vercel"],
    category: "Frontend",
    image: "🎨",
    gradient: "from-indigo-500 to-purple-500",
    githubUrl: "https://github.com/gustavo-rodriguez/portfolio-2026",
    liveUrl: "https://gustavo-rodriguez.dev",
    features: ["Animaciones 3D", "Cursor personalizado", "Efectos de partículas", "SEO optimizado", "Performance"],
    status: "in-progress",
    year: 2024
  },
  {
    id: 6,
    title: "API de Microservicios",
    description: "Arquitectura de microservicios con Docker, Kubernetes y monitoreo avanzado.",
    longDescription: "Sistema de microservicios containerizado con Docker y orquestado con Kubernetes. Implementa service mesh, monitoreo con Prometheus y Grafana, logging centralizado y CI/CD automatizado.",
    technologies: ["Docker", "Kubernetes", "Node.js", "MongoDB", "Prometheus", "Grafana"],
    category: "DevOps",
    image: "🐳",
    gradient: "from-teal-500 to-blue-500",
    githubUrl: "https://github.com/gustavo-rodriguez/microservices-api",
    features: ["Containerización", "Orquestación", "Service mesh", "Monitoreo", "Auto-scaling"],
    status: "planning",
    year: 2024
  }
];

const categories = ['Todos', 'Frontend', 'Backend', 'Mobile', 'Cloud', 'DevOps'];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const filteredProjects = selectedCategory === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-yellow-400';
      case 'planning': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'in-progress': return 'En Desarrollo';
      case 'planning': return 'Planificación';
      default: return 'Desconocido';
    }
  };

  return (
    <section ref={sectionRef} id="proyectos" className="min-h-screen py-16 sm:py-20 lg:py-24 mobile-px-4 px-6 sm:px-8 relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <SectionTransition effect="fade-up">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <FloatingText 
              text="Proyectos Destacados" 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-space-grotesk font-bold mb-4 sm:mb-6 text-gradient-hero leading-tight block"
              delay={200}
            />
            <p className="text-base sm:text-lg lg:text-xl text-white/70 font-inter max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4 sm:px-0">
              Una selección de mis trabajos más recientes, donde combino creatividad, 
              tecnología y experiencia de usuario para crear soluciones digitales impactantes.
            </p>
            
            {/* Filtros de categoría */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8 sm:mt-10 lg:mt-12 px-4 sm:px-0">
              {categories.map((category, index) => (
                <SectionTransition key={category} effect="fade-up" delay={300 + index * 100}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                </SectionTransition>
              ))}
            </div>
          </div>
        </SectionTransition>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
          {filteredProjects.map((project, index) => (
            <SectionTransition key={project.id} effect="fade-scale" delay={200 + index * 100}>
              <div 
                className={`group relative liquid-glass p-4 sm:p-6 lg:p-8 cursor-pointer overflow-hidden ${
                  isMobile 
                    ? 'active:scale-95 transition-transform duration-200' 
                    : 'hover:transform hover:scale-105 hover:-translate-y-2 transition-all duration-500'
                }`}
                onMouseEnter={() => !isMobile && setHoveredProject(project.id)}
                onMouseLeave={() => !isMobile && setHoveredProject(null)}
                onClick={() => setSelectedProject(project)}
              >
                {/* Efecto de brillo en hover - deshabilitado en móvil */}
                {!isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}
                
                {/* Header del proyecto */}
                <div className={`w-full h-48 sm:h-52 lg:h-56 bg-gradient-to-br ${project.gradient} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 overflow-hidden relative flex items-center justify-center`}>
                  <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4">{project.image}</div>
                  
                  {/* Overlay en hover - simplificado en móvil */}
                  {!isMobile && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                  
                  {/* Status badge */}
                  <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4 bg-black/40 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1">
                    <span className={`text-xs font-medium ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>
                  
                  {/* Year badge */}
                  <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 bg-black/40 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1">
                    <span className="text-white text-xs font-medium">{project.year}</span>
                  </div>
                  
                  {/* Action buttons - siempre visibles en móvil */}
                  <div className={`absolute bottom-2 sm:bottom-3 lg:bottom-4 right-2 sm:right-3 lg:right-4 flex gap-1 sm:gap-2 transition-all duration-300 ${
                    isMobile ? 'opacity-80' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="text-white text-sm">📂</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="text-white text-sm">🔗</span>
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Contenido del proyecto */}
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 font-poppins text-white group-hover:text-gradient-accent transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-sm sm:text-base text-white/75 mb-4 sm:mb-6 font-inter leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                
                {/* Tecnologías */}
                <div className="flex gap-1 sm:gap-2 flex-wrap mb-3 sm:mb-4">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 sm:px-3 py-1 bg-white/10 rounded-full text-xs font-medium hover:bg-white/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 sm:px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white/60">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
                
                {/* Features destacadas */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-white/60">
                  <span>✨ {project.features[0]}</span>
                  <span>🚀 {project.category}</span>
                </div>
                
                {/* Indicador de hover - siempre visible en móvil */}
                <div className={`absolute bottom-2 sm:bottom-3 lg:bottom-4 left-2 sm:left-3 lg:left-4 transition-all duration-300 ${
                  isMobile ? 'opacity-60' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  <span className="text-white/60 text-xs">{isMobile ? 'Toca para ver más' : 'Click para ver más'}</span>
                </div>
              </div>
            </SectionTransition>
          ))}
        </div>

        {/* Estadísticas de proyectos */}
        <SectionTransition effect="fade-up" delay={800}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-20">
            <div className={`text-center liquid-glass p-4 sm:p-5 lg:p-6 group ${
              isMobile ? 'active:scale-95 transition-transform duration-200' : 'hover:scale-105 transition-all duration-300'
            }`}>
              <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-accent mb-1 sm:mb-2 transition-transform ${
                isMobile ? '' : 'group-hover:scale-110'
              }`}>
                {projects.length}+
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-white/70 font-inter">Proyectos Completados</div>
            </div>
            <div className="text-center liquid-glass p-4 sm:p-5 lg:p-6 hover:scale-105 transition-all duration-300 group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-accent mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                {new Set(projects.flatMap(p => p.technologies)).size}+
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-white/70 font-inter">Tecnologías Dominadas</div>
            </div>
            <div className="text-center liquid-glass p-4 sm:p-5 lg:p-6 hover:scale-105 transition-all duration-300 group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-accent mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                3+
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-white/70 font-inter">Años Experiencia</div>
            </div>
            <div className="text-center liquid-glass p-4 sm:p-5 lg:p-6 hover:scale-105 transition-all duration-300 group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-accent mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                100%
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-white/70 font-inter">Satisfacción Cliente</div>
            </div>
          </div>
        </SectionTransition>
      </div>

      {/* Modal de proyecto detallado */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white pr-4">{selectedProject.title}</h2>
              <button 
                onClick={() => setSelectedProject(null)}
                className="text-white/60 hover:text-white text-xl sm:text-2xl flex-shrink-0"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <div className={`w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-br ${selectedProject.gradient} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 flex items-center justify-center`}>
                  <div className="text-5xl sm:text-6xl lg:text-8xl">{selectedProject.image}</div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {selectedProject.githubUrl && (
                    <a 
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-hero flex-1 text-center text-sm sm:text-base"
                    >
                      Ver Código
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a 
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-hero flex-1 text-center text-sm sm:text-base"
                    >
                      Ver Demo
                    </a>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed mb-4 sm:mb-6">
                  {selectedProject.longDescription}
                </p>
                
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Características Principales</h3>
                  <ul className="space-y-1 sm:space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="text-sm sm:text-base text-white/70 flex items-center gap-2">
                        <span className="text-green-400 flex-shrink-0">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Tecnologías Utilizadas</h3>
                  <div className="flex gap-1 sm:gap-2 flex-wrap">
                    {selectedProject.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-white/10 rounded-full text-xs sm:text-sm font-medium text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}