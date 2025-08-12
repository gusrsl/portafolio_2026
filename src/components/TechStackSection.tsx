'use client';

import SectionHeader from '@/components/SectionHeader';
import SectionTransition from '@/components/SectionTransition';

type Skill = {
  name: string;
  tag: string;
  level: 'Experto' | 'Avanzado' | 'Intermedio';
};

const levelsToColor: Record<Skill['level'], string> = {
  Experto: 'text-fg',
  Avanzado: 'text-fg-soft',
  Intermedio: 'text-fg-muted',
};

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="surface-card rounded-2xl p-4 sm:p-5 enhanced-card-hover">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-overlay-1 grid place-items-center text-sm font-bold text-fg-soft">
          {skill.tag}
        </div>
        <div className="flex-1">
          <div className="text-sm sm:text-base text-fg">{skill.name}</div>
          <div className={`text-xs ${levelsToColor[skill.level]}`}>{skill.level}</div>
        </div>
        <div className="hidden sm:block">
          <div className="w-12 h-12 rounded-full bg-overlay-1 grid place-items-center border app-border">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[color:rgba(255,255,255,0.4)] to-[color:rgba(255,255,255,0.1)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Orbit() {
  const core = ['Next.js', 'TypeScript', 'Angular', 'Node.js', 'AWS'];
  return (
    <div className="relative h-40 sm:h-48 mb-8 sm:mb-12">
      <div className="absolute inset-0 rounded-full border app-border animate-orbit-slow opacity-50" />
      <div className="absolute inset-6 rounded-full border app-border animate-orbit-fast opacity-30" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="px-4 py-2 rounded-full bg-overlay-1 text-fg text-sm font-medium">Core Stack</div>
      </div>
      <div className="absolute inset-0">
        <div className="absolute left-1/2 -translate-x-1/2 -top-3 text-xs sm:text-sm text-fg-muted">{core[0]}</div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-fg-muted">{core[1]}</div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-fg-muted">{core[2]}</div>
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 text-xs sm:text-sm text-fg-muted">{core[3]}</div>
        <div className="absolute left-[12%] top-[20%] text-xs sm:text-sm text-fg-muted">{core[4]}</div>
      </div>
    </div>
  );
}

export default function TechStackSection() {
  const frontend: Skill[] = [
    { name: 'Angular', tag: 'A', level: 'Experto' },
    { name: 'TypeScript', tag: 'TS', level: 'Avanzado' },
    { name: 'React', tag: 'R', level: 'Intermedio' },
    { name: 'Vue', tag: 'V', level: 'Intermedio' },
    { name: 'Ionic', tag: 'Io', level: 'Avanzado' },
    { name: 'Bootstrap', tag: 'B', level: 'Avanzado' },
  ];
  const backend: Skill[] = [
    { name: 'Node.js & Express', tag: 'N', level: 'Experto' },
    { name: 'NestJS', tag: 'Ns', level: 'Avanzado' },
    { name: 'Python & Django', tag: 'Py', level: 'Avanzado' },
    { name: 'SQL Server & PostgreSQL', tag: 'SQL', level: 'Experto' },
    { name: 'MongoDB', tag: 'Mg', level: 'Avanzado' },
  ];
  const devops: Skill[] = [
    { name: 'AWS', tag: 'AWS', level: 'Experto' },
    { name: 'Azure (básico)', tag: 'Az', level: 'Intermedio' },
    { name: 'Docker & Compose', tag: 'D', level: 'Avanzado' },
    { name: 'Jenkins', tag: 'J', level: 'Avanzado' },
    { name: 'Git / GitHub / GitLab', tag: 'G', level: 'Avanzado' },
    { name: 'Linux/Portainer', tag: 'Lx', level: 'Avanzado' },
  ];

  return (
    <section id="tecnologias" className="py-20 sm:py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTransition effect="fade-up">
          <SectionHeader
            eyebrow="Tecnologías"
            title="Stack Tecnológico"
            subtitle="Herramientas con las que construyo productos claros y escalables"
            className="mb-10 sm:mb-14"
          />
        </SectionTransition>

        <SectionTransition effect="fade-up" delay={100}>
          <Orbit />
        </SectionTransition>

        <SectionTransition effect="fade-up" delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="space-y-3">
              <h4 className="text-xl font-poppins font-semibold text-fg mb-2">Frontend</h4>
              {frontend.map((s) => (
                <SkillCard key={s.name} skill={s} />
              ))}
            </div>
            <div className="space-y-3">
              <h4 className="text-xl font-poppins font-semibold text-fg mb-2">Backend</h4>
              {backend.map((s) => (
                <SkillCard key={s.name} skill={s} />
              ))}
            </div>
            <div className="space-y-3">
              <h4 className="text-xl font-poppins font-semibold text-fg mb-2">DevOps & Cloud</h4>
              {devops.map((s) => (
                <SkillCard key={s.name} skill={s} />
              ))}
            </div>
          </div>
        </SectionTransition>
      </div>
    </section>
  );
}

