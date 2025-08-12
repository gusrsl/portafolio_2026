'use client';

import SectionTransition from '@/components/SectionTransition';

interface BioCardProps {
  name: string;
  role: string;
  location: string;
  availability?: string;
  avatarEmoji?: string;
}

export default function BioCard({
  name,
  role,
  location,
  availability = 'Disponible para proyectos',
  avatarEmoji = '👨‍💻',
}: BioCardProps) {
  return (
    <SectionTransition effect="fade-scale" delay={120}>
      <div className="liquid-glass rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center gap-5">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 grid place-items-center text-4xl sm:text-5xl">
          {avatarEmoji}
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-poppins font-semibold text-fg">{name}</h3>
          <p className="text-fg-muted font-inter">{role}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="px-3 py-1 rounded-full bg-overlay-1 text-fg-soft text-sm font-medium">
            📍 {location}
          </span>
          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-medium">
            ✅ {availability}
          </span>
        </div>

        <a href="#contacto" className="btn-liquid-glass px-6 py-3 rounded-xl font-poppins font-semibold w-full sm:w-auto">
          Escríbeme
        </a>
      </div>
    </SectionTransition>
  );
}


