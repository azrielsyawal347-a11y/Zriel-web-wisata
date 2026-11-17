import { MessageCircle } from 'lucide-react';
import { VILLAGE_PROFILE } from '../data/villageData';

interface HeaderProps {
  onOpenBooking: () => void;
}

export function Header({ onOpenBooking }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 h-14 md:h-[68px] border-b border-[#E2E7DF] bg-[#F7F6F2]/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand wordmark only */}
        <a
          href="#beranda"
          className="font-display text-xl md:text-2xl font-semibold tracking-tight text-[#18261E] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F5C3D]"
        >
          {VILLAGE_PROFILE.brandName}
        </a>

        {/* Zone 2: 4 single-line nav links */}
        <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-7">
          <a
            href="#destinasi"
            className="text-sm font-medium text-[#3D4F44] hover:text-[#18261E] hover:underline underline-offset-4 decoration-[#1F5C3D] transition-colors whitespace-nowrap shrink-0 py-2"
          >
            Destinasi
          </a>
          <a
            href="#paket"
            className="text-sm font-medium text-[#3D4F44] hover:text-[#18261E] hover:underline underline-offset-4 decoration-[#1F5C3D] transition-colors whitespace-nowrap shrink-0 py-2"
          >
            Paket Wisata
          </a>
          <a
            href="#galeri"
            className="text-sm font-medium text-[#3D4F44] hover:text-[#18261E] hover:underline underline-offset-4 decoration-[#1F5C3D] transition-colors whitespace-nowrap shrink-0 py-2"
          >
            Galeri
          </a>
          <a
            href="#lokasi"
            className="text-sm font-medium text-[#3D4F44] hover:text-[#18261E] hover:underline underline-offset-4 decoration-[#1F5C3D] transition-colors whitespace-nowrap shrink-0 py-2"
          >
            Lokasi &amp; Peta
          </a>
        </nav>

        {/* Zone 3: 1 primary CTA */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#1F5C3D] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#17472F] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F5C3D]"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Pesan Wisata</span>
          </button>
        </div>
      </div>
    </header>
  );
}
