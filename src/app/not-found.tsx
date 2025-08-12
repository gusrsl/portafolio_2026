export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center app-bg app-fg px-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-fg">Página no encontrada</h1>
        <p className="text-fg-muted">La ruta solicitada no existe.</p>
        <a href="#inicio" className="btn-primary-hero inline-flex">Volver al inicio</a>
      </div>
    </main>
  );
}


