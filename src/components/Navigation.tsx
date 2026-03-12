"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "./Logo";

const links = [
  { href: "/", label: "Anasayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/projeler", label: "Projeler" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const isHomePage = pathname === "/";
  const isOverlayMode = !hasScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <>
      <div className="bg-[#2f2f32] text-white">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5 text-sm sm:text-base">
            <span className="flex items-center gap-2 text-gray-200">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5.25C3 4.007 4.007 3 5.25 3h2.22c1.04 0 1.93.713 2.156 1.728l.637 2.867a2.25 2.25 0 01-.95 2.37l-1.72 1.147a11.042 11.042 0 005.276 5.277l1.147-1.72a2.25 2.25 0 012.37-.95l2.867.637A2.25 2.25 0 0121 16.53v2.22A2.25 2.25 0 0118.75 21h-.75C9.716 21 3 14.284 3 6v-.75z" />
              </svg>
              <span className="hidden sm:inline">Call Us</span>
              <span>+123 456 7890</span>
            </span>
            <span className="hidden h-4 w-px bg-gray-500 sm:block" />
            <span className="hidden items-center gap-2 text-gray-200 sm:flex">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21c4.97-4.667 7.5-8.498 7.5-11.5a7.5 7.5 0 10-15 0c0 3.002 2.53 6.833 7.5 11.5z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              <span>123 Anywhere St, Anycity</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a href="#" className="rounded-full border border-gray-500 p-1.5 text-gray-200 transition-colors hover:bg-white hover:text-gray-900" aria-label="Facebook">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.5 9H16V6h-2.5C11.57 6 10 7.57 10 9.5V12H8v3h2v6h3v-6h2.5l.5-3H13v-2.5c0-.28.22-.5.5-.5z" />
              </svg>
            </a>
            <a href="#" className="rounded-full border border-gray-500 p-1.5 text-gray-200 transition-colors hover:bg-white hover:text-gray-900" aria-label="Twitter">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.9 3H22l-6.77 7.75L23.2 21h-6.26l-4.9-6.4L6.4 21H3.3l7.23-8.27L1 3h6.42l4.43 5.84L18.9 3zm-1.1 16h1.74L6.5 4.9H4.66L17.8 19z" />
              </svg>
            </a>
            <a href="#" className="rounded-full border border-gray-500 p-1.5 text-gray-200 transition-colors hover:bg-white hover:text-gray-900" aria-label="Instagram">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="4" strokeWidth={2} />
                <circle cx="12" cy="12" r="3.5" strokeWidth={2} />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth={0} />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <nav
        className={`${
          isHomePage && !hasScrolled
            ? "absolute inset-x-0 top-10 z-50"
            : "fixed inset-x-0 top-0 z-50"
        } transition-colors duration-500 ease-out ${
          isOverlayMode
            ? "bg-linear-to-b from-black/45 via-black/20 to-transparent"
            : "bg-white/95 backdrop-blur"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center">
            <Logo />

            <div className="ml-auto hidden items-center gap-3 md:flex">
              <div className="flex items-center gap-1">
                {links.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-lg px-3.5 py-2 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-gray-900 text-white"
                          : isOverlayMode
                            ? "text-white hover:bg-white/15"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center bg-amber-400 px-6 py-3 text-base font-semibold uppercase tracking-wide text-gray-900 transition-colors hover:bg-amber-300"
              >
                Teklif Al
              </Link>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`ml-auto rounded-lg p-2 transition-colors md:hidden ${
                isOverlayMode
                  ? "text-white hover:bg-white/15"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="Menü"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {menuOpen && (
            <div
              className={`space-y-1 py-3 md:hidden ${
                isOverlayMode
                  ? "border-t border-white/20 bg-black/40 backdrop-blur-sm"
                  : "border-t border-gray-100"
              }`}
            >
              {links.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : isOverlayMode
                          ? "text-white hover:bg-white/15"
                          : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/iletisim"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex w-full items-center justify-center bg-amber-400 px-4 py-2.5 text-base font-semibold uppercase tracking-wide text-gray-900"
              >
                Teklif Al
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
