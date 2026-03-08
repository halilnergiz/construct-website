import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { createServerSupabase } from "@/lib/supabase";
import type { Project } from "@/types/project";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const supabase = createServerSupabase();
  const { data: project } = await supabase
    .from("projects")
    .select("title, description")
    .eq("slug", slug)
    .eq("status", "published")
    .single<Pick<Project, "title" | "description">>();

  if (!project) return { title: "Proje Bulunamadı" };

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjeDetay({ params }: Props) {
  const { slug } = await params;
  const supabase = createServerSupabase();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single<Project>();

  if (!project) notFound();
  const galleryImages =
    project.images?.filter((img, index) =>
      project.cover_image ? img !== project.cover_image || index !== 0 : true
    ) ?? [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/projeler"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-8"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Tüm Projeler
      </Link>

      {project.category && (
        <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-wider text-sky-600">
          {project.category}
        </span>
      )}

      <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>

      {project.description && (
        <p className="text-xl text-gray-500 mb-8">{project.description}</p>
      )}

      {project.cover_image && (
        <div className="relative aspect-video overflow-hidden rounded-xl mb-10">
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
        </div>
      )}

      {project.content && (
        <div className="prose prose-lg prose-gray max-w-none">
          {project.content.split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}

      {galleryImages.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Galeri</h2>
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={img}
                  alt={`${project.title} - Görsel ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 50vw, 448px"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
