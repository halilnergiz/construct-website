import Link from "next/link";
import Image from "next/image";

import { createServerSupabase } from "@/lib/supabase";
import type { Project } from "@/types/project";

export const revalidate = 60;

export default async function Projeler() {
  const supabase = createServerSupabase();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .returns<Project[]>();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Projeler</h1>
        <p className="text-gray-500 text-lg">
          Tamamladığımız ve devam eden projelerimiz
        </p>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Henüz yayınlanmış proje bulunmuyor.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projeler/${project.slug}`}
              className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
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
                <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-sky-600 transition-colors">
                  {project.title}
                </h2>
                {project.description && (
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {project.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
