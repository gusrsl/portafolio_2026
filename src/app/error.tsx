'use client';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <main className="min-h-screen flex items-center justify-center app-bg app-fg px-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-fg">Ocurrió un error</h1>
        <p className="text-fg-muted">Intenta recargar la página.</p>
        {error?.digest && (
          <p className="text-xs text-fg-muted">Código: {error.digest}</p>
        )}
        <a href="#inicio" className="btn-secondary-hero inline-flex">Volver al inicio</a>
      </div>
    </main>
  );
}


