import { brandConfig } from "@/config/brand";

export default function Hakkimizda() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Hakkımızda</h1>
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-4">
          {brandConfig.companyName} olarak, modern web teknolojileri kullanarak
          kullanıcı dostu ve performanslı çözümler sunmaktayız.
        </p>
        <p className="text-gray-600 mb-4">
          Misyonumuz, müşterilerimize en iyi deneyimi sağlamak ve sürekli
          gelişen teknoloji dünyasında öncü olmaktır.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Vizyonumuz
        </h2>
        <p className="text-gray-600">
          Gelecekte, sektörde lider konumda olmak ve yenilikçi çözümlerle
          müşterilerimizin başarısına katkıda bulunmak hedefimizdir.
        </p>
      </div>
    </div>
  );
}
