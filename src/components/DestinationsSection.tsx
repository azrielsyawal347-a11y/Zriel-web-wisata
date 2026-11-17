import { useState } from 'react';
import { ArrowUpRight, Clock, Footprints, X, MessageCircle, Check } from 'lucide-react';
import {
  DESTINATIONS,
  Destination,
  DestinationCategory,
  buildWhatsAppUrl,
} from '../data/villageData';
import { ResilientImage } from './ResilientImage';

const CATEGORY_TABS: { id: DestinationCategory; label: string }[] = [
  { id: 'semua', label: 'Semua Spot' },
  { id: 'alam', label: 'Alam & Air' },
  { id: 'edukasi', label: 'Edukasi & Kebun' },
  { id: 'inap', label: 'Camping & Inap' },
];

export function DestinationsSection() {
  const [activeCategory, setActiveCategory] = useState<DestinationCategory>('semua');
  const [selectedSpot, setSelectedSpot] = useState<Destination | null>(null);

  const filteredDestinations =
    activeCategory === 'semua'
      ? DESTINATIONS
      : DESTINATIONS.filter((item) => item.category === activeCategory);

  return (
    <section id="destinasi" className="py-12 sm:py-16 border-t border-[#E2E7DF]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#8C4A2B]">
              Profil &amp; Katalog Destinasi
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#18261E] [text-wrap:balance]">
              Jelajahi Daya Tarik Utama Lereng Asri
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#46574D]">
              Semua spot wisata berada dalam satu kawasan terpadu yang bersih, tertata rapi,
              dan dikelola langsung oleh warga Dusun Sumber Rejo.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter kategori destinasi"
            className="flex flex-wrap items-center gap-1.5 rounded-xl bg-[#EAECE6] p-1.5 self-start md:self-auto"
          >
            {CATEGORY_TABS.map((tab) => {
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

        {/* Asymmetric Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDestinations.map((dest) => (
            <article
              key={dest.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#DCE2D8] bg-white transition-colors hover:border-[#B9C6B4]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E5EAE2]">
                <ResilientImage
                  src={dest.image}
                  alt={dest.imageAlt}
                  fallbackTitle={dest.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  {/* Clean unboxed metadata */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-medium text-[#526358] tabular-nums">
                    <span className="text-[#1F5C3D] font-semibold">{dest.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{dest.ticketInfo}</span>
                    <span aria-hidden="true">·</span>
                    <span>{dest.hours}</span>
                  </div>

                  <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-[#18261E]">
                    {dest.name}
                  </h3>

                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#46574D]">
                    {dest.shortDesc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#ECEFE9] flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#526358]">
                    <Footprints className="h-4 w-4 text-[#1F5C3D] shrink-0" aria-hidden="true" />
                    <span>{dest.walkTime}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedSpot(dest)}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[#EEF2EC] px-4 py-2 text-sm font-semibold text-[#18261E] transition-colors hover:bg-[#DFE7DC] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F5C3D]"
                  >
                    <span>Detail Spot</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Detail Destination Modal / Mobile Bottom Sheet */}
      {selectedSpot && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-xs sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="spot-modal-title"
          onClick={() => setSelectedSpot(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sm:hidden pt-3 pb-1">
              <div className="mx-auto h-1.5 w-10 rounded-full bg-[#D0D7CD]" />
            </div>

            <div className="relative aspect-[16/9] w-full bg-[#E5EAE2]">
              <ResilientImage
                src={selectedSpot.image}
                alt={selectedSpot.imageAlt}
                fallbackTitle={selectedSpot.name}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedSpot(null)}
                aria-label="Tutup detail destinasi"
                className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#18261E] shadow-md transition-colors hover:bg-white cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-[#526358] tabular-nums">
                <span className="text-[#1F5C3D] font-semibold">{selectedSpot.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedSpot.ticketInfo}</span>
              </div>

              <h3
                id="spot-modal-title"
                className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold text-[#18261E]"
              >
                {selectedSpot.name}
              </h3>

              <p className="mt-3 text-base leading-relaxed text-[#46574D]">
                {selectedSpot.fullDesc}
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl bg-[#F5F7F3] p-4 text-sm">
                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-[#1F5C3D] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#18261E]">Jam &amp; Waktu Terbaik</p>
                    <p className="text-[#526358] tabular-nums">
                      Buka {selectedSpot.hours} (Terbaik: {selectedSpot.bestTime})
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Footprints className="h-4 w-4 text-[#1F5C3D] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#18261E]">Akses Jalan Kaki</p>
                    <p className="text-[#526358]">{selectedSpot.walkTime}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h4 className="text-sm font-semibold text-[#18261E]">Daya Tarik &amp; Aktivitas</h4>
                <ul className="mt-2.5 space-y-2">
                  {selectedSpot.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#46574D]">
                      <Check className="h-4 w-4 text-[#1F5C3D] mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <h4 className="text-sm font-semibold text-[#18261E]">Fasilitas Tersedia</h4>
                <p className="mt-1.5 text-sm text-[#526358]">
                  {selectedSpot.facilities.join(' · ')}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#E2E7DF] flex flex-col sm:flex-row gap-3">
                <a
                  href={buildWhatsAppUrl(
                    `Halo Admin Desa Wisata Lereng Asri, saya ingin bertanya informasi kunjungan ke *${selectedSpot.name}*. Mohon infonya ya.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#1F5C3D] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#17472F]"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>Tanya Spot Ini via WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedSpot(null)}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[#D4DCD0] px-5 py-3 text-base font-medium text-[#18261E] hover:bg-[#F5F7F3] cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
