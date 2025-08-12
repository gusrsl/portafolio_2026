'use client';

import React from 'react';

export interface MinimalProject {
  id: number;
  title: string;
  description: string;
  year: number;
  category: string;
  technologies: string[];
  status: 'completed' | 'in-progress' | 'planning';
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectRowProps {
  index: number;
  project: MinimalProject;
  onClick?: (project: MinimalProject) => void;
}

export default function ProjectRow({ index, project, onClick }: ProjectRowProps) {
  const indexLabel = String(index + 1).padStart(2, '0');
  const statusColor =
    project.status === 'completed'
      ? 'text-green-400'
      : project.status === 'in-progress'
      ? 'text-yellow-400'
      : 'text-blue-400';

  return (
    <button
      className="group w-full text-left rounded-2xl px-4 sm:px-6 py-4 sm:py-5 hover:bg-overlay-1 transition-colors duration-300 focus-ring"
      onClick={() => onClick?.(project)}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6">
        {/* Index */}
        <div className="text-fg-muted font-mono text-sm sm:text-base tracking-wider w-10 sm:w-12">
          {indexLabel}
        </div>

        {/* Title and description */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-poppins font-semibold text-fg truncate">
              {project.title}
            </h3>
            <span className="hidden sm:inline text-xs sm:text-sm text-fg-muted">•</span>
            <span className={`hidden sm:inline text-xs sm:text-sm ${statusColor}`}>{
              project.status === 'completed' ? 'Completado' : project.status === 'in-progress' ? 'En Progreso' : 'Planificación'
            }</span>
          </div>
          <p className="text-sm sm:text-base text-fg-muted mt-1 line-clamp-2">
            {project.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded-full text-[11px] sm:text-xs bg-overlay-1 text-fg-soft">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Meta and arrow */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-fg-muted text-sm sm:text-base whitespace-nowrap">
            {project.year} · {project.category}
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-overlay-1 grid place-items-center transition-transform group-hover:translate-x-1">
            <svg className="w-4 h-4 text-fg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}


