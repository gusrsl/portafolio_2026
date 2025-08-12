'use client';

import { useState, useRef } from 'react';
import SectionTransition from './SectionTransition';
import SectionHeader from './SectionHeader';
import ProjectRow, { MinimalProject } from './ProjectRow';

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
    longDescription: "Portfolio personal desarrollado con Next.js 15, con animaciones 3D (Spline), cursor animado personalizado, efectos de partículas, transiciones suaves y diseño responsive. Optimizado para rendimiento y SEO.",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Spline 3D", "Framer Motion", "Vercel"],
    category: "Frontend",
    image: "🎨",
    gradient: "from-indigo-500 to-purple-500",
    githubUrl: "https://github.com/gusrsl/portafolio_gusrsl",
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // (Nota) Detección de móvil eliminada por no usarse; se puede reactivar si la UI lo requiere

  const filteredProjects = selectedCategory === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'completed': return 'text-green-400';
  //     case 'in-progress': return 'text-yellow-400';
  //     case 'planning': return 'text-blue-400';
  //     default: return 'text-gray-400';
  //   }
  // };

  // const getStatusText = (status: string) => {
  //   switch (status) {
  //     case 'completed': return 'Completado';
  //     case 'in-progress': return 'En Desarrollo';
  //     case 'planning': return 'Planificación';
  //     default: return 'Desconocido';
  //   }
  // };

  return (
    <section ref={sectionRef} id="proyectos" className="min-h-screen py-16 sm:py-20 lg:py-24 mobile-px-4 px-6 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionTransition effect="fade-up">
          <SectionHeader
            eyebrow="Proyectos"
            title="Selección de trabajos"
            subtitle="Algunos proyectos que muestran cómo combino simplicidad, interacción y foco en producto."
            align="center"
            className="mb-10 sm:mb-14 lg:mb-16"
          />
        </SectionTransition>

        {/* Filtros minimal */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors focus-ring border app-border ${
                selectedCategory === category
                  ? 'bg-overlay-2 text-fg'
                  : 'bg-overlay-1 text-fg-muted hover:bg-overlay-2 hover:text-fg'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Lista minimal de proyectos */}
        <div className="divide-y app-border rounded-2xl bg-overlay-1">
          {filteredProjects.map((p, idx) => (
            <ProjectRow
              key={p.id}
              index={idx}
              project={p as unknown as MinimalProject}
              onClick={() => setSelectedProject(p)}
            />
          ))}
        </div>

        {/* Modal de proyecto detallado */}
        {selectedProject && (
          <div className="fixed inset-0 bg-overlay-2 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
            <div className="glass-effect-expanded border app-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-fg pr-4">{selectedProject.title}</h2>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-fg-muted hover:text-fg text-xl sm:text-2xl flex-shrink-0"
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
                  <p className="text-sm sm:text-base lg:text-lg text-fg-soft leading-relaxed mb-4 sm:mb-6">
                    {selectedProject.longDescription}
                  </p>
                  
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-fg mb-2 sm:mb-3">Características Principales</h3>
                    <ul className="space-y-1 sm:space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="text-sm sm:text-base text-fg-muted flex items-center gap-2">
                          <span className="text-green-400 flex-shrink-0">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-fg mb-2 sm:mb-3">Tecnologías Utilizadas</h3>
                    <div className="flex gap-1 sm:gap-2 flex-wrap">
                      {selectedProject.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-2 sm:px-3 py-1 bg-overlay-1 rounded-full text-xs sm:text-sm font-medium text-fg-soft"
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
      </div>
    </section>
  );
}