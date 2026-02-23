import Link from "next/link";

export default function ProjeNotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        Proje Bulunamadı
      </h2>
      <p className="text-gray-500 mb-8">
        Aradığınız proje mevcut değil veya kaldırılmış olabilir.
      </p>
      <Link
        href="/projeler"
        className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
      >
        Tüm Projelere Dön
      </Link>
    </div>
  );
}
