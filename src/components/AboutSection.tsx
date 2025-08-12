'use client';

import SectionTransition from '@/components/SectionTransition';
import SectionHeader from '@/components/SectionHeader';
import BioCard from '@/components/about/BioCard';
import Stats from '@/components/about/Stats';
import { profile } from '@/data/profile';

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="min-h-screen py-20 sm:py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTransition effect="fade-up">
          <SectionHeader
            eyebrow="Sobre mí"
            title="Construyo productos con foco en claridad y detalle"
            subtitle="Me apasiona convertir ideas en experiencias digitales limpias, performantes y con personalidad."
            align="center"
            className="mb-12 sm:mb-16"
          />
        </SectionTransition>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <SectionTransition effect="fade-slide" delay={80}>
              <div className="surface-card rounded-2xl p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-poppins font-semibold text-fg mb-4">Quién soy</h3>
                <p className="text-fg-soft font-inter leading-relaxed mb-4">
                  3+ años construyendo aplicaciones con React/Angular y Node.js. Me enfoco en DX, rendimiento y mantenibilidad, desde la UI hasta la infraestructura en AWS.
                </p>
                <p className="text-fg-soft font-inter leading-relaxed">
                  Disfruto diseñar sistemas claros, automatizar con CI/CD, y crear experiencias con microinteracciones que aportan valor sin distraer.
                </p>
                <div className="divider my-6" />
                <h4 className="text-xl font-poppins text-fg mb-3">Filosofía</h4>
                <ul className="grid grid-cols-2 gap-2 text-sm text-fg-soft">
                  <li className="bg-overlay-1 rounded-xl px-3 py-2">Comunicación clara</li>
                  <li className="bg-overlay-1 rounded-xl px-3 py-2">Código mantenible</li>
                  <li className="bg-overlay-1 rounded-xl px-3 py-2">UX primero</li>
                  <li className="bg-overlay-1 rounded-xl px-3 py-2">Escalabilidad</li>
                </ul>
              </div>
            </SectionTransition>

            {/* Preferencias de rol y proyecto destacado */}
            <SectionTransition effect="fade-up" delay={120}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="liquid-glass rounded-2xl p-6">
                  <h4 className="text-fg font-semibold mb-2">Lo que busco</h4>
                  <p className="text-fg-muted text-sm leading-relaxed">
                    Trabajar con Angular/React/Vue, crecer en backend con Node.js/NestJS, soluciones cloud-native, Docker/Compose y CI/CD (Jenkins/Portainer). Ambientes ágiles (Scrum/Jira) con mejora continua.
                  </p>
                  <h4 className="text-fg font-semibold mt-4 mb-2">Lo que evito</h4>
                  <p className="text-fg-muted text-sm leading-relaxed">
                    Entornos estancados con tecnologías obsoletas o sin oportunidades de crecimiento.
                  </p>
                </div>
                <div className="liquid-glass rounded-2xl p-6">
                  <h4 className="text-fg font-semibold mb-2">Proyecto destacado</h4>
                  <p className="text-fg-muted text-sm leading-relaxed">
                    Plataforma e‑commerce híbrida (web/móvil) para calzado deportivo. FE con Angular/Ionic, BE con Node.js + NestJS y PostgreSQL. Orquestación con Docker Compose, CI/CD en Jenkins y despliegues en Linux con Portainer. Procesamiento de pagos, inventario y optimización de queries con índices. Reducción del tiempo de release en 40%.
                  </p>
                </div>
              </div>
            </SectionTransition>

            {/* Se eliminó la sección de Trayectoria para evitar duplicidad con Experiencia */}
          </div>

          <div className="space-y-8">
            <BioCard
              name={profile.shortName}
              role={profile.role}
              location={profile.location}
            />
            <Stats />
          </div>
        </div>
      </div>
    </section>
  );
}


