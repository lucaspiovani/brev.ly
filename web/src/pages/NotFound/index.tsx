export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-3 rounded-lg bg-white p-10 text-center shadow-md">
        <h1 className="relative text-5xl font-extrabold text-blue-base">
          <span className="absolute inset-0 -translate-x-0.5 text-red-500 opacity-70">
            404
          </span>
          <span className="absolute inset-0 translate-x-0.5 text-blue-400 opacity-70">
            404
          </span>
          <span className="relative">404</span>
        </h1>

        <h2 className="text-lg font-bold text-gray-600">Link não encontrado</h2>

        <p className="text-sm text-gray-500">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em{" "}
          <a href="/" className="font-bold text-blue-base underline">
            brev.ly
          </a>
          .
        </p>
      </div>
    </div>
  );
}