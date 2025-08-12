'use client';

import { useEffect, useState } from 'react';
import { profile } from '@/data/profile';
import SectionHeader from '@/components/SectionHeader';
import SectionTransition from '@/components/SectionTransition';
import Image from 'next/image';

interface RepoInfo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

const username = profile.githubUsername;

export default function GithubStatsSection() {
  const [repos, setRepos] = useState<RepoInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ avatar_url: string; html_url: string; login: string; bio?: string | null; public_repos: number; followers: number; following: number } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setLoading(true);
        // Perfil
        const ures = await fetch(`https://api.github.com/users/${username}`, {
          signal: controller.signal,
          headers: { 'Accept': 'application/vnd.github+json' },
          cache: 'no-store',
        });
        if (!ures.ok) throw new Error(`GitHub API (user): ${ures.status}`);
        const udata = await ures.json();
        setUser(udata);

        // Repos
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
          signal: controller.signal,
          headers: { 'Accept': 'application/vnd.github+json' },
          cache: 'no-store',
        });
        if (!res.ok) throw new Error(`GitHub API (repos): ${res.status}`);
        const data: RepoInfo[] = await res.json();
        setRepos(data);
      } catch (e) {
        const err = e as Error & { name?: string };
        if (err.name !== 'AbortError') setError(err.message || 'Error al cargar datos de GitHub');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <section id="github" className="py-20 sm:py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTransition effect="fade-up">
          <SectionHeader
            eyebrow="GitHub"
            title="Actividad y estadísticas"
            subtitle="Resumen visual de contribuciones y repos actualizados"
            className="mb-10 sm:mb-14"
          />
        </SectionTransition>

        {/* Perfil y métricas compactas */}
        <SectionTransition effect="fade-up" delay={80}>
          <div className="liquid-glass rounded-2xl p-5 sm:p-6 mb-8">
            <div className="flex items-center gap-4 sm:gap-6">
              <Image
                src={`https://github.com/${username}.png`}
                alt={`${username} avatar`}
                width={64}
                height={64}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border app-border"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="text-fg font-semibold text-lg sm:text-xl truncate hover:underline">
                    @{username}
                  </a>
                </div>
                {user?.bio && <p className="text-fg-muted text-sm sm:text-base line-clamp-2">{user.bio}</p>}
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2.5 py-1 bg-overlay-1 rounded-full text-xs text-fg-soft">Repos: {user?.public_repos ?? '—'}</span>
                  <span className="px-2.5 py-1 bg-overlay-1 rounded-full text-xs text-fg-soft">Followers: {user?.followers ?? '—'}</span>
                  <span className="px-2.5 py-1 bg-overlay-1 rounded-full text-xs text-fg-soft">Following: {user?.following ?? '—'}</span>
                </div>
              </div>
            </div>
          </div>
        </SectionTransition>

        {/* Simplificado: solo repos recientes; se removieron gráficos/estadísticas para evitar ruido */}

        {/* Repos recientes */}
        <SectionTransition effect="fade-up" delay={150}>
          <div className="surface-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-fg font-semibold text-lg">Repositorios recientes</h3>
              <a href={`https://github.com/${username}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-fg text-sm underline">
                Ver todos
              </a>
            </div>
            {loading && <div className="text-fg-muted text-sm">Cargando repos...</div>}
            {error && <div className="text-red-400 text-sm">{error}</div>}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {repos.map((r) => (
                  <a
                    key={r.id}
                    href={r.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass rounded-xl p-4 hover:scale-[1.02] transition-transform block"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-fg font-semibold truncate">{r.name}</h4>
                      <span className="text-fg-muted text-xs">{new Date(r.updated_at).toLocaleDateString()}</span>
                    </div>
                    {r.description && (
                      <p className="text-fg-muted text-sm line-clamp-3 mb-3">{r.description}</p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-fg-muted">
                      {r.language && <span className="px-2 py-1 bg-overlay-1 rounded-full">{r.language}</span>}
                      <span>★ {r.stargazers_count}</span>
                      <span>⑂ {r.forks_count}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </SectionTransition>
      </div>
    </section>
  );
}


