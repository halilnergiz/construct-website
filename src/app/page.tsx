import Link from "next/link";
import Image from "next/image";

import { createServerSupabase } from "@/lib/supabase";
import type { Project } from "@/types/project";

export const revalidate = 60;

export default async function Home() {
  const supabase = createServerSupabase();
  const { data: featuredProjects } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(3)
    .returns<Project[]>();

  return (
    <>
      <section className="relative h-svh overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/mixkit-time-lapse-of-a-construction-site-32388-hd-ready.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/5" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 pb-12 pt-(--site-header-height) sm:px-6 sm:pb-16 lg:px-8 lg:pb-24">
          <div className="w-full max-w-2xl lg:max-w-[40%]">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Turning Blueprints into Landmarks
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-700 sm:text-lg">
              Projeleri yalnızca inşa etmiyoruz; mühendislik disiplini, estetik yaklaşım ve
              zamanında teslim prensibiyle yaşam alanlarını kalıcı değerlere dönüştürüyoruz.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/projeler"
                className="inline-flex items-center justify-center bg-amber-400 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-gray-900 transition-colors hover:bg-amber-300"
              >
                Projeleri Keşfet
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center border border-gray-700 bg-white/75 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-gray-900 transition-colors hover:bg-white"
              >
                Hemen Danış
              </Link>
            </div>
          </div>
        </div>
      </section>

      {featuredProjects && featuredProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Öne Çıkan Projeler</h2>
              <p className="mt-2 text-gray-500">Son tamamladığımız projelerden bazıları</p>
            </div>
            <Link
              href="/projeler"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Tümünü Gör
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projeler/${project.slug}`}
                className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                  {project.cover_image ? (
                    <Image
                      src={project.cover_image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-300">
                      <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  {project.category && (
                    <span className="inline-block mb-2 text-xs font-semibold uppercase tracking-wider text-sky-600">
                      {project.category}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-sky-600 transition-colors">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">{project.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/projeler"
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Tüm Projeleri Gör
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
