import { ArrowDownRight, MessageCircle } from 'lucide-react';
import { VILLAGE_PROFILE } from '../data/villageData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

const QUICK_FACTS = [
  { label: 'Ketinggian Sejuk', value: '1.150 mdpl' },
  { label: 'Jam Operasional', value: '07.00 – 17.00 WIB' },
  { label: 'Destinasi Utama', value: '4 Kawasan Alam' },
  { label: 'Tiket Kawasan', value: 'Mulai Rp 15.000' },
];

export function HeroSection({ onOpenBooking }: HeroSectionProps) {
  return (
    <section id="beranda" className="bg-[#F7F6F2] pt-4 sm:pt-6 pb-8 sm:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#16241B] min-h-[490px] sm:min-h-[540px] lg:min-h-[580px] flex items-end">
          <ResilientImage
            src={VILLAGE_PROFILE.heroImage}
            alt={VILLAGE_PROFILE.heroAlt}
            loading="eager"
            fallbackTitle={VILLAGE_PROFILE.fullName}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Measured contrast scrim for >= 4.5:1 WCAG AA legibility */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0F1B14]/95 via-[#0F1B14]/55 to-[#0F1B14]/25"
          />

          <div className="relative z-10 w-full p-6 sm:p-10 lg:p-14">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-medium tracking-wide text-[#D5E2D8] mb-3">
                Desa Wisata Lereng Asri · Kab. Magelang, Jawa Tengah
              </p>

              <h1 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.12] tracking-tight text-white [text-wrap:balance]">
                Hirup Udara Segar Pegunungan, Temukan Tenang di Lereng Asri
              </h1>

              <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#E6ECE7] max-w-xl">
                Nikmati pesona hutan pinus, kesegaran air terjun alami, wisata edukasi kebun
                organik, hingga pengalaman berkemah dan menginap hangat bersama keluarga.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#25724B] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#1C5B3B] active:scale-[0.98] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>Pesan via WhatsApp</span>
                </button>

                <a
                  href="#paket"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 backdrop-blur-sm px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/20 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Cek Paket &amp; Harga</span>
                  <ArrowDownRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column info strip below hero */}
        <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#DCE2D8] rounded-2xl border border-[#E2E7DF] bg-white">
          {QUICK_FACTS.map((fact, idx) => (
            <div
              key={fact.label}
              className={`px-5 py-4 ${idx % 2 === 0 ? 'border-r lg:border-r-0 border-[#DCE2D8]' : ''} ${
                idx < 2 ? 'border-b lg:border-b-0 border-[#DCE2D8]' : ''
              }`}
            >
              <p className="text-xs font-medium text-[#526358]">{fact.label}</p>
              <p className="mt-1 text-base sm:text-lg font-semibold text-[#18261E] tabular-nums">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
