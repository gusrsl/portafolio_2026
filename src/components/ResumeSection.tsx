'use client';

import SectionHeader from '@/components/SectionHeader';
import SectionTransition from '@/components/SectionTransition';
import { profile } from '@/data/profile';

export default function ResumeSection() {
  const contacts = [
    { label: 'Teléfono', value: profile.phoneDisplay, href: `tel:${profile.phoneE164}` , icon: '📞' },
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: '📧' },
    { label: 'LinkedIn', value: profile.linkedinUrl.replace('https://',''), href: profile.linkedinUrl, icon: '🔗' },
    { label: 'GitHub', value: profile.githubUrl.replace('https://',''), href: profile.githubUrl, icon: '🐙' },
  ];

  const experience = [
    {
      company: 'Marbelize S.A.',
      role: 'Desarrollador Fullstack',
      period: 'Dic 2023 – Presente',
      bullets: [
        'Aplicaciones web completas: Angular (FE) y Node.js (BE).',
        'CI/CD con Jenkins, reduciendo despliegues en 40%.',
        'Pruebas automatizadas con Jest (hasta 95% coverage).',
        'Trabajo ágil con Scrum y Jira.',
      ],
    },
    {
      company: 'Independiente',
      role: 'Desarrollador Web Freelance',
      period: 'Ene 2021 – Dic 2022',
      bullets: [
        'Sitios personalizados con WordPress, UX responsiva.',
        'Integración de plugins, SEO básico y mantenimiento.',
      ],
    },
    {
      company: 'OceanoTV',
      role: 'Técnico Audiovisual y Editor',
      period: 'Ago 2019 – Mar 2020',
      bullets: [
        'Edición de streaming (Facebook Live) y soporte audiovisual en vivo.',
      ],
    },
    {
      company: 'Quotech',
      role: 'Desarrollador Frontend (Prácticas)',
      period: 'Abr 2018 – Ene 2019',
      bullets: [
        'Apps móviles híbridas con Ionic y Angular.',
        'Optimización de interfaces para móvil.',
      ],
    },
  ];

  const education = [
    { title: 'Ingeniero en Tecnologías de la Información', place: 'Universidad Laica Eloy Alfaro de Manabí', year: '2024' },
    { title: 'Bachiller en Ciencias', place: 'Unidad Educativa Juan Montalvo', year: '2019' },
  ];

  const certifications = [
    'Inglés Nivel B1',
    'Taller de Ofimática',
    'Modern Data Visualization with Oracle Analytics Cloud',
    'MEAN Stack E-Commerce App (Angular 15, NX, PrimeNG) — 2023',
    'CRUD Angular - Node - MEAN',
    'Ionic - Build iOS, Android & Web Apps',
  ];

  const extraSkills = [
    {
      title: 'Desarrollo y CI/CD',
      items: ['Git/GitHub/GitLab', 'Jenkins', 'Docker & Compose', 'Jest', 'NPM', 'Swagger'],
    },
    {
      title: 'Redes y Servidores',
      items: ['Linux (Squid, VPN, DNS, DHCP, Firewall, Samba)', 'Configuración de redes locales'],
    },
    {
      title: 'Otros',
      items: ['Impresoras ZPL', 'Etiquetado', 'Básculas Giropes', 'Instalación de cámaras y equipos de red'],
    },
  ];

  return (
    <section id="resume" className="py-20 sm:py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTransition effect="fade-up">
          <SectionHeader
            eyebrow="CV"
            title="Perfil profesional y experiencia"
            subtitle="Resumen, experiencia, formación y certificaciones"
            className="mb-10 sm:mb-14"
          />
        </SectionTransition>

        {/* Summary + Contacts */}
        <SectionTransition effect="fade-up" delay={80}>
          <div className="liquid-glass rounded-2xl p-6 sm:p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
              <div>
                <h3 className="text-fg font-semibold text-xl mb-2">{profile.shortName}</h3>
                <p className="text-fg-muted leading-relaxed">
                  Ingeniero en Tecnologías de la Información con más de 3 años de experiencia en desarrollo web y móvil.
                  Experto en Angular, Ionic y Node.js; dominio de SQL Server y PostgreSQL. Enfoque en soluciones escalables,
                  despliegues continuos con Jenkins y pruebas automatizadas. Conocimientos de AWS y Azure, y diseño de
                  reportes dinámicos. Orientado a resultados, calidad y eficiencia.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {contacts.map((c) => (
                  <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                     className="surface-card rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-overlay-2 transition-colors">
                    <span className="text-lg">{c.icon}</span>
                    <div>
                      <div className="text-fg text-sm font-medium">{c.label}</div>
                      <div className="text-fg-muted text-sm truncate">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </SectionTransition>

        {/* Experience */}
        <SectionTransition effect="fade-up" delay={120}>
          <div className="surface-card rounded-2xl p-6 sm:p-8 mb-8">
            <h4 className="text-fg font-semibold mb-4">Experiencia</h4>
            <ol className="relative border-s app-border pl-6 space-y-6">
              {experience.map((job) => (
                <li key={job.company} className="group">
                  <div className="absolute -left-2 w-3 h-3 rounded-full bg-fg-muted group-hover:bg-fg transition-colors" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div className="text-fg font-medium">{job.role} · {job.company}</div>
                    <div className="text-fg-muted text-sm">{job.period}</div>
                  </div>
                  <ul className="mt-2 text-fg-muted text-sm list-disc ml-5 space-y-1">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </SectionTransition>

        {/* Education & Certifications */}
        <SectionTransition effect="fade-up" delay={140}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="liquid-glass rounded-2xl p-6">
              <h4 className="text-fg font-semibold mb-4">Formación</h4>
              <ul className="space-y-3">
                {education.map((e) => (
                  <li key={e.title} className="flex items-start gap-3">
                    <span className="text-fg-muted mt-0.5">🎓</span>
                    <div>
                      <div className="text-fg text-sm font-medium">{e.title}</div>
                      <div className="text-fg-muted text-xs">{e.place} · {e.year}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="liquid-glass rounded-2xl p-6">
              <h4 className="text-fg font-semibold mb-4">Certificaciones</h4>
              <ul className="space-y-2 text-sm text-fg-soft">
                {certifications.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span className="text-fg-muted mt-0.5">🏅</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionTransition>

        {/* Extra skills */}
        <SectionTransition effect="fade-up" delay={160}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {extraSkills.map((group) => (
              <div key={group.title} className="surface-card rounded-2xl p-6">
                <h5 className="text-fg font-semibold mb-3">{group.title}</h5>
                <ul className="text-sm text-fg-soft space-y-1 list-disc ml-5">
                  {group.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionTransition>
      </div>
    </section>
  );
}


