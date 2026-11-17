import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/villageData';
import { ResilientImage } from './ResilientImage';

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % GALLERY_ITEMS.length));
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  const activeItem = activeIndex !== null ? GALLERY_ITEMS[activeIndex] : null;

  return (
    <section id="galeri" className="py-12 sm:py-16 border-t border-[#E2E7DF] bg-[#F7F6F2]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#8C4A2B]">Galeri Suasana &amp; Kegiatan</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#18261E] [text-wrap:balance]">
            Potret Hangat dari Lereng Pegunungan
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#46574D]">
            Sentuh foto mana saja untuk melihat ukuran penuh beserta keterangan lokasi
            pengambilannya.
          </p>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
          {GALLERY_ITEMS.map((item, idx) => {
            const spanClass =
              idx === 0
                ? 'sm:col-span-2 lg:col-span-7 aspect-[16/10]'
                : idx === 1
                ? 'lg:col-span-5 aspect-[4/3] lg:aspect-auto'
                : 'lg:col-span-4 aspect-[4/3]';

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`group relative overflow-hidden rounded-2xl bg-[#1A2B22] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F5C3D] ${spanClass}`}
              >
                <ResilientImage
                  src={item.image}
                  alt={item.imageAlt}
                  fallbackTitle={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0D1811]/90 via-[#0D1811]/25 to-transparent"
                />

                <div className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <Expand className="h-4 w-4" aria-hidden="true" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p className="text-xs font-medium text-[#D1DFD4]">{item.location}</p>
                  <p className="mt-0.5 font-display text-lg sm:text-xl font-semibold text-white">
                    {item.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galeri: ${activeItem.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-[#142019] text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-white/10">
              <div className="min-w-0">
                <p className="text-xs text-[#BDD0C2] truncate">
                  {activeItem.location} · Foto {activeIndex + 1} dari {GALLERY_ITEMS.length}
                </p>
                <h3 className="font-display text-lg font-semibold truncate">{activeItem.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Tutup galeri"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full bg-black">
              <ResilientImage
                src={activeItem.image}
                alt={activeItem.imageAlt}
                fallbackTitle={activeItem.title}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4">
              <p className="text-sm text-[#DCE5DE]">{activeItem.caption}</p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      (activeIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
                    )
                  }
                  aria-label="Foto sebelumnya"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  <span>Sebelumnya</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex + 1) % GALLERY_ITEMS.length)}
                  aria-label="Foto berikutnya"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[#25724B] px-4 py-2 text-sm font-medium text-white hover:bg-[#1C5B3B] cursor-pointer"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
