import { brandConfig } from "@/config/brand";

export default function Iletisim() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">İletişim</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Bize Ulaşın
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">E-posta</h3>
              <p className="text-gray-600">{brandConfig.email}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Telefon</h3>
              <p className="text-gray-600">{brandConfig.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Adres</h3>
              <p className="text-gray-600 whitespace-pre-line">{brandConfig.address}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            İletişim Formu
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ad Soyad
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                E-posta
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mesaj
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
