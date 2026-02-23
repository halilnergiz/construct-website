import Link from "next/link";

import { brandConfig } from "@/config/brand";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {brandConfig.companyName}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {brandConfig.tagline}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Sayfalar
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/hakkimizda", label: "Hakkımızda" },
                { href: "/projeler", label: "Projeler" },
                { href: "/blog", label: "Blog" },
                { href: "/iletisim", label: "İletişim" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
              İletişim
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>{brandConfig.email}</li>
              <li>{brandConfig.phone}</li>
              <li className="whitespace-pre-line">{brandConfig.address}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} {brandConfig.companyName}. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
