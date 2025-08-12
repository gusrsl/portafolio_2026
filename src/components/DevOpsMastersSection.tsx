'use client';

import SectionHeader from '@/components/SectionHeader';
import { profile } from '@/data/profile';
import SectionTransition from '@/components/SectionTransition';

export default function DevOpsMastersSection() {
  const categories: { title: string; items: string[] }[] = [
    {
      title: 'IaC & Infraestructura',
      items: ['Terraform', 'Packer', 'Vagrant', 'Ansible', 'Puppet', 'Chef', 'VirtualBox', 'Servidor SSH']
    },
    {
      title: 'Contenedores & Orquestación',
      items: ['Docker', 'Kubernetes']
    },
    {
      title: 'CI/CD & Calidad',
      items: ['Jenkins', 'Git', 'GitLab', 'Bitbucket', 'Pipeline', 'SonarQube', 'Nexus']
    },
    {
      title: 'Observabilidad & Scripting',
      items: ['Kibana', 'MongoDB', 'Shell', 'Bash', 'PowerShell', 'PHP']
    },
    {
      title: 'Cultura & Agile',
      items: ['Dojo', 'Scrum', 'Lean', 'Kanban', 'Trello']
    },
  ];

  const roadmap = [
    { icon: '🏗️', title: 'Infraestructura como Código', desc: 'Terraform, Ansible, Packer, Vagrant' },
    { icon: '🐳', title: 'Contenedores', desc: 'Imágenes, redes y seguridad con Docker' },
    { icon: '🧭', title: 'Orquestación', desc: 'Kubernetes: despliegue, servicios y observabilidad' },
    { icon: '⚙️', title: 'CI/CD', desc: 'Pipelines con Jenkins, GitLab y calidad con SonarQube/Nexus' },
    { icon: '🔭', title: 'Observabilidad', desc: 'Logs y visualización con Kibana' },
    { icon: '🤝', title: 'Cultura DevOps', desc: 'Scrum, Kanban, Lean, Trello, Dojo' },
  ];

  const progressPercent = profile.devopsMastersProgress; // Centralizado

  return (
    <section id="maestria-devops" className="py-20 sm:py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTransition effect="fade-up">
          <SectionHeader
            eyebrow="Formación"
            title="Máster Universitario en Desarrollo y Operaciones (DevOps)"
            subtitle="UNIR — Universidad Internacional de La Rioja • En curso"
            className="mb-10 sm:mb-14"
          />
        </SectionTransition>

        {/* Hero + Certificaciones */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {/* Hero */}
          <SectionTransition effect="fade-slide" delay={60}>
            <div className="liquid-glass rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-overlay-1 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h3 className="text-fg font-semibold text-xl">UNIR — Máster DevOps</h3>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-medium">En curso</span>
                </div>
                <p className="text-fg-muted leading-relaxed">
                  Formación enfocada en automatización, IaC, contenedores, orquestación, CI/CD, observabilidad
                  y cultura DevOps para acelerar el ciclo de entrega y la calidad del software.
                </p>

                {/* Progreso */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs text-fg-muted mb-2">
                    <span>Progreso</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-overlay-1 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-400" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>

                {/* Meta cards */}
                <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
                  <div className="surface-card rounded-xl p-4">
                    <div className="text-fg-muted">Modalidad</div>
                    <div className="text-fg font-semibold">Online</div>
                  </div>
                  <div className="surface-card rounded-xl p-4">
                    <div className="text-fg-muted">Enfoque</div>
                    <div className="text-fg font-semibold">IaC • CI/CD • Observabilidad</div>
                  </div>
                </div>
              </div>
            </div>
          </SectionTransition>

          {/* Certificaciones */}
          <SectionTransition effect="fade-up" delay={100} className="xl:col-span-2">
            <div className="liquid-glass rounded-2xl p-6 sm:p-8">
              <h4 className="text-fg font-semibold mb-4">Certificaciones y complementos</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="surface-card rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-overlay-1 grid place-items-center text-lg">🐍</div>
                  <div>
                    <div className="text-fg font-medium text-sm">Curso de Programación Python</div>
                    <div className="text-fg-muted text-xs">Incluido</div>
                  </div>
                </div>
                <a className="surface-card rounded-xl p-4 flex items-center gap-3 hover:bg-overlay-2 transition-colors" href="#" target="_blank" rel="noopener noreferrer">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 grid place-items-center text-lg">🟦</div>
                  <div>
                    <div className="text-fg font-medium text-sm">AZ‑900: Azure Fundamentals</div>
                    <div className="text-fg-muted text-xs">Certificación opcional</div>
                  </div>
                </a>
                <a className="surface-card rounded-xl p-4 flex items-center gap-3 hover:bg-overlay-2 transition-colors" href="#" target="_blank" rel="noopener noreferrer">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 grid place-items-center text-lg">🟧</div>
                  <div>
                    <div className="text-fg font-medium text-sm">AWS Cloud Practitioner</div>
                    <div className="text-fg-muted text-xs">Certificación opcional</div>
                  </div>
                </a>
              </div>
            </div>
          </SectionTransition>
        </div>

        {/* Roadmap */}
        <SectionTransition effect="fade-up" delay={140}>
          <div className="surface-card rounded-2xl p-6 sm:p-8 mb-8">
            <h4 className="text-fg font-semibold mb-4">Ruta de aprendizaje</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
              {roadmap.map((step) => (
                <div key={step.title} className="liquid-glass rounded-xl p-4">
                  <div className="text-2xl mb-2">{step.icon}</div>
                  <div className="text-fg font-medium text-sm mb-1">{step.title}</div>
                  <div className="text-fg-muted text-xs leading-relaxed">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </SectionTransition>

        {/* Tecnologías por categoría */}
        <SectionTransition effect="fade-up" delay={160}>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((cat) => (
              <div key={cat.title} className="liquid-glass rounded-2xl p-6">
                <h5 className="text-fg font-semibold mb-3">{cat.title}</h5>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((t) => (
                    <span key={t} className="px-3 py-1.5 bg-overlay-1 rounded-full text-sm text-fg-soft hover:bg-overlay-2 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionTransition>
      </div>
    </section>
  );
}


