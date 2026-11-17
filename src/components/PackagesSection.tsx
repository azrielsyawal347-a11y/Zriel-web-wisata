import { useState } from 'react';
import { Check, MessageCircle, Users, Clock } from 'lucide-react';
import {
  TOUR_PACKAGES,
  TourPackage,
  PackageCategory,
  formatRupiah,
} from '../data/villageData';
import { ResilientImage } from './ResilientImage';

interface PackagesSectionProps {
  onSelectPackage: (pkg: TourPackage) => void;
}

const PACKAGE_TABS: { id: PackageCategory; label: string }[] = [
  { id: 'semua', label: 'Semua Paket' },
  { id: 'edukasi', label: 'Edukasi' },
  { id: 'camping', label: 'Camping' },
  { id: 'outbound', label: 'Outbound' },
  { id: 'homestay', label: 'Homestay' },
];

export function PackagesSection({ onSelectPackage }: PackagesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<PackageCategory>('semua');

  const filteredPackages =
    activeCategory === 'semua'
      ? TOUR_PACKAGES
      : TOUR_PACKAGES.filter((pkg) => pkg.category === activeCategory);

  return (
    <section id="paket" className="py-12 sm:py-16 bg-[#EEF1EC] border-t border-[#E2E7DF]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#8C4A2B]">
              Paket Wisata &amp; Daftar Harga Resmi
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#18261E] [text-wrap:balance]">
              Harga Transparan, Tanpa Biaya Tersembunyi
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#46574D]">
              Pilih paket sesuai rencana liburan Anda. Tekan tombol pesan untuk mengisi
              rencana kunjungan dan langsung terhubung ke WhatsApp admin desa.
            </p>
          </div>

          {/* Interactive Package Filter */}
          <div
            role="tablist"
            aria-label="Filter kategori paket wisata"
            className="flex flex-wrap items-center gap-1.5 rounded-xl bg-[#E1E6DE] p-1.5 self-start md:self-auto"
          >
            {PACKAGE_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`min-h-[44px] rounded-lg px-3.5 py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F5C3D] ${
                    isActive
                      ? 'bg-white text-[#18261E] shadow-sm'
                      : 'text-[#46574D] hover:text-[#18261E]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {filteredPackages.map((pkg) => (
            <article
              key={pkg.id}
              className={`flex flex-col justify-between rounded-2xl border bg-white p-5 sm:p-7 ${
                pkg.featured
                  ? 'border-[#1F5C3D] ring-1 ring-[#1F5C3D]/15'
                  : 'border-[#DCE2D8]'
              }`}
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[#ECEFE9]">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:block h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-[#E5EAE2]">
                      <ResilientImage
                        src={pkg.image}
                        alt={pkg.imageAlt}
                        fallbackTitle={pkg.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-[#526358]">
                        {pkg.categoryLabel}
                        {pkg.featured && ' · Paling Diminati'}
                      </p>
                      <h3 className="mt-1 font-display text-xl sm:text-2xl font-semibold text-[#18261E]">
                        {pkg.name}
                      </h3>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <p className="font-display text-2xl sm:text-3xl font-bold text-[#1F5C3D] tabular-nums">
                      {formatRupiah(pkg.price)}
                    </p>
                    <p className="text-xs sm:text-sm text-[#526358]">{pkg.priceUnit}</p>
                  </div>
                </div>

                {/* Unboxed metadata row */}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#46574D] tabular-nums">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-[#1F5C3D] shrink-0" aria-hidden="true" />
                    <span>
                      {pkg.id === 'paket-homestay'
                        ? 'Maks. 4 tamu / unit'
                        : `Minimal ${pkg.minPeople} orang`}
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-[#B8C2B5]">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-[#1F5C3D] shrink-0" aria-hidden="true" />
                    <span>{pkg.duration}</span>
                  </span>
                </div>

                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#46574D]">
                  {pkg.summary}
                </p>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-[#18261E]">Fasilitas Termasuk:</p>
                  <ul className="mt-2.5 space-y-2">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#394A40]">
                        <Check
                          className="h-4 w-4 text-[#1F5C3D] mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-[#617267]">{pkg.note}</p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#ECEFE9]">
                <button
                  type="button"
                  onClick={() => onSelectPackage(pkg)}
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#1F5C3D] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#17472F] active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F5C3D]"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>Pesan Paket via WhatsApp</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
