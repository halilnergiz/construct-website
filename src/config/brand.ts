export const brandConfig = {
  companyName: "Company Name",
  logo: null as string | null,
  tagline: "Construction Company",
  email: "info@company.com",
  phone: "+90 (XXX) XXX XX XX",
  address: "Örnek Mahallesi, Örnek Sokak No: X\nİstanbul, Türkiye",
} as const;

export type BrandConfig = typeof brandConfig;
