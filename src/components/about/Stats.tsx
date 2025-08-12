'use client';

import SectionTransition from '@/components/SectionTransition';
import { profile } from '@/data/profile';

interface StatItem {
  label: string;
  value: string;
  hint?: string;
}

export default function Stats() {
  const stats: StatItem[] = [
    { label: 'Años', value: `${profile.experienceYears}+`, hint: 'Experiencia' },
    { label: 'Proyectos', value: `${profile.completedProjects}+`, hint: 'Completados' },
    { label: 'Certificación', value: 'AWS', hint: profile.awsCertification },
  ];

  return (
    <SectionTransition effect="fade-up" delay={160}>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((s) => (
          <div key={s.label} className="surface-card rounded-2xl p-4 sm:p-5 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-fg">{s.value}</div>
            <div className="text-xs sm:text-sm text-fg-muted">{s.label}</div>
            {s.hint && <div className="text-[10px] sm:text-xs text-fg-muted mt-1">{s.hint}</div>}
          </div>
        ))}
      </div>
    </SectionTransition>
  );
}


