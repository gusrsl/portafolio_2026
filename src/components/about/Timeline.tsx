'use client';

import SectionTransition from '@/components/SectionTransition';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export default function Timeline() {
  const items: TimelineItem[] = [
    {
      year: '2026',
      title: 'Portfolio 2026',
      description: 'Experimentos con 3D, física y microinteracciones en Next.js 14.',
    },
    {
      year: '2024',
      title: 'E-commerce (FE/BE)',
      description: 'Arquitectura fullstack, pagos y performance, enfoque DX y mantenibilidad.',
    },
    {
      year: '2023',
      title: 'Cloud & Serverless',
      description: 'Despliegues AWS con Lambda, API Gateway y DynamoDB. CI/CD y automatización.',
    },
  ];

  return (
    <SectionTransition effect="fade-slide" delay={200}>
      <div className="surface-card rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-poppins font-semibold text-fg mb-4">Trayectoria</h3>
        <ol className="relative border-s app-border pl-6 space-y-6">
          {items.map((it) => (
            <li key={it.title} className="group">
              <div className="absolute -left-2 sm:-left-2 w-3 h-3 rounded-full bg-fg-muted group-hover:bg-fg transition-colors"></div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-fg-muted text-xs sm:text-sm mb-1">{it.year}</div>
                  <div className="text-fg font-semibold text-base sm:text-lg">{it.title}</div>
                  <p className="text-fg-muted text-sm sm:text-base font-inter mt-1 leading-relaxed">
                    {it.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionTransition>
  );
}


