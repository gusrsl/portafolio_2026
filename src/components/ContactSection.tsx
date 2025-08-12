'use client';

import SectionTransition from '@/components/SectionTransition';
import { profile } from '@/data/profile';
import SectionHeader from '@/components/SectionHeader';

export default function ContactSection() {
  return (
    <section id="contacto" className="min-h-screen py-20 sm:py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTransition effect="fade-up">
          <SectionHeader
            eyebrow="Contacto"
            title="Construyamos algo juntos"
            subtitle="Envíame un mensaje o usa el canal que prefieras. Respondo en menos de 24h."
            align="center"
            className="mb-12 sm:mb-16"
          />
        </SectionTransition>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Enlaces rápidos */}
          <SectionTransition effect="fade-slide" delay={100}>
            <div className="surface-card rounded-2xl p-6 sm:p-8 space-y-4">
              {[
                { label: 'GitHub', value: profile.githubUrl.replace('https://',''), icon: '🐙', href: profile.githubUrl },
                { label: 'LinkedIn', value: profile.linkedinUrl.replace('https://',''), icon: '💼', href: profile.linkedinUrl },
                { label: 'Email', value: profile.email, icon: '📧', href: `mailto:${profile.email}` },
                { label: 'WhatsApp', value: profile.phoneDisplay, icon: '📱', href: profile.whatsappUrl },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-between rounded-xl px-4 py-3 bg-overlay-1 hover:bg-overlay-2 transition-colors focus-ring"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div className="text-fg font-medium">{item.label}</div>
                      <div className="text-fg-muted text-sm">{item.value}</div>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-fg-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </SectionTransition>

          {/* Formulario corto */}
          <SectionTransition effect="fade-scale" delay={200}>
            <div className="rounded-2xl p-6 sm:p-8 liquid-glass">
              <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-fg-soft text-sm mb-2">Nombre *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-overlay-1 border app-border rounded-xl text-fg placeholder:text-fg-muted focus:outline-none focus-ring"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-fg-soft text-sm mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-overlay-1 border app-border rounded-xl text-fg placeholder:text-fg-muted focus:outline-none focus-ring"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-fg-soft text-sm mb-2">Mensaje *</label>
                  <textarea
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-overlay-1 border app-border rounded-xl text-fg placeholder:text-fg-muted focus:outline-none focus-ring resize-none"
                    placeholder="Cuéntame sobre tu proyecto, objetivos y timeline..."
                  />
                </div>
                <button type="submit" className="btn-liquid-glass w-full py-3 rounded-xl font-poppins font-semibold">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </SectionTransition>
        </div>
      </div>
    </section>
  );
}


