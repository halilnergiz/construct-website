import { notFound } from "next/navigation";
import Image from "next/image";

import { createServerSupabase } from "@/lib/supabase";
import type { Project, ProjectStatus } from "@/types/project";

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
    .eq("publication_state", "published")
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
    .eq("publication_state", "published")
    .single<Project>();

  if (!project) notFound();
  const galleryImages = Array.from(
    new Set([project.cover_image, ...(project.images ?? [])].filter(Boolean))
  ) as string[];
  const locationLabel = formatProjectLocation(project);
  const totalConstructionArea = getTotalConstructionArea(project);
  const mapUrl = getProjectMapUrl(project);
  const mapExternalUrl = getProjectExternalMapUrl(project);
  const detailParagraphs = (project.content ?? project.description ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <article className="pb-20">
      <section className="relative min-h-[58svh] overflow-hidden">
        {project.cover_image ? (
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-slate-200" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/35 to-slate-950/10" />

        <div className="relative mx-auto flex min-h-[58svh] max-w-7xl items-center px-4 py-34 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base text-slate-100 sm:text-lg">
              {project.description ?? "Bu proje için kısa açıklama eklenmemiş."}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.6fr] lg:px-8">
        <div>
          <h2 className="inline-block border-b-4 border-amber-400 pb-2 text-3xl font-bold text-slate-900">
            Proje Detayı
          </h2>
        </div>
        <div className="space-y-5 text-base leading-relaxed text-slate-600 sm:text-lg">
          {detailParagraphs.length > 0 ? (
            detailParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          ) : (
            <p>Bu proje için henüz detaylı açıklama eklenmemiş.</p>
          )}

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
              <span className="text-sm text-slate-500 sm:text-base">Proje Durumu</span>
              <span className="text-sm font-medium text-slate-800 sm:text-base">
                {formatProjectStatus(project.project_status)}
              </span>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
              <span className="text-sm text-slate-500 sm:text-base">Konum Bilgisi</span>
              <span className="text-sm font-medium text-slate-800 sm:text-base">{locationLabel}</span>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
              <span className="text-sm text-slate-500 sm:text-base">Proje Kategorisi</span>
              <span className="text-sm font-medium text-slate-800 sm:text-base">
                {project.category?.trim() || "Belirtilmemiş"}
              </span>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4 sm:px-6">
              <span className="text-sm text-slate-500 sm:text-base">Toplam İnşaat Alanı</span>
              <span className="text-sm font-medium text-slate-800 sm:text-base">
                {totalConstructionArea}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 inline-block border-b-4 border-amber-400 pb-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          Galeri
        </h2>
        {galleryImages.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((img, index) => (
              <div
                key={`${img}-${index}`}
                className={`group relative overflow-hidden rounded-xl ${
                  index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <div className={`relative ${index === 0 ? "aspect-4/3 sm:h-full" : "aspect-4/3"}`}>
                  <Image
                    src={img}
                    alt={`${project.title} - Galeri görseli ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-400 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-10 text-center text-slate-500">
            Bu proje için galeri görseli bulunmuyor.
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 inline-block border-b-4 border-amber-400 pb-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          Konum
        </h2>
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {mapUrl ? (
            <>
              {mapExternalUrl && (
                <a
                  href={mapExternalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-md bg-sky-700 px-3 py-2 text-xs font-semibold text-white shadow-sm ring-1 ring-sky-200/60 transition-colors hover:bg-sky-600"
                >
                  Haritada Göster
                </a>
              )}
              <iframe
                title="project-location-map"
                src={mapUrl}
                className="h-[380px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </>
          ) : (
            <div className="flex h-[220px] items-center justify-center p-6 text-center text-slate-500">
              Harita görüntüsü için konum bilgisi veya koordinat bulunmuyor.
            </div>
          )}
        </div>
      </section>
    </article>
  );
}

function formatProjectLocation(project: Project): string {
  const city = project.location?.city?.trim();
  const district = project.location?.district?.trim();
  const address = project.location?.address?.trim();

  if (district && city) return `${district}, ${city}`;
  if (district) return district;
  if (city) return city;
  if (address) return address;

  return "Konum bilgisi girilmemiş";
}

function getProjectMapUrl(project: Project): string | null {
  const latitude = project.location?.latitude;
  const longitude = project.location?.longitude;

  if (typeof latitude === "number" && typeof longitude === "number") {
    return `https://maps.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`;
  }

  const query = formatProjectLocation(project);
  if (query === "Konum bilgisi girilmemiş") return null;

  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`;
}

function getProjectExternalMapUrl(project: Project): string | null {
  const latitude = project.location?.latitude;
  const longitude = project.location?.longitude;

  if (typeof latitude === "number" && typeof longitude === "number") {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }

  const query = formatProjectLocation(project);
  if (query === "Konum bilgisi girilmemiş") return null;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function getTotalConstructionArea(project: Project): string {
  const extendedProject = project as Project & {
    total_construction_area?: string | number | null;
    construction_area?: string | number | null;
    total_area?: string | number | null;
    area?: string | number | null;
  };

  const areaValue =
    extendedProject.total_construction_area ??
    extendedProject.construction_area ??
    extendedProject.total_area ??
    extendedProject.area;

  if (typeof areaValue === "number") {
    return `${areaValue.toLocaleString("tr-TR")} m2`;
  }

  if (typeof areaValue === "string" && areaValue.trim().length > 0) {
    return areaValue.trim();
  }

  return "Belirtilmemiş";
}

function formatProjectStatus(value: ProjectStatus | null): string {
  if (value === "planned") return "Planlanan";
  if (value === "ongoing") return "Devam Eden";
  if (value === "completed") return "Tamamlanmış";
  return "Belirtilmemiş";
}
