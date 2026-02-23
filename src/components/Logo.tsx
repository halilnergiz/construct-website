import Link from "next/link";
import Image from "next/image";
import { brandConfig } from "@/config/brand";

export default function Logo() {
  const { companyName, logo } = brandConfig;

  return (
    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
      {logo ? (
        <Image
          src={logo}
          alt={companyName}
          width={120}
          height={40}
          className="h-10 w-auto object-contain"
          priority
        />
      ) : (
        <span
          className="flex items-center justify-center min-w-[80px] h-10 rounded border border-dashed border-gray-400 bg-gray-50 text-gray-500 text-sm font-medium"
          title="Logo"
        >
          Logo
        </span>
      )}
    </Link>
  );
}
