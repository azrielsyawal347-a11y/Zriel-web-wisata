import { Compass, MapPin, MessageCircle, Ticket } from 'lucide-react';

interface MobileBottomBarProps {
  onOpenBooking: () => void;
}

export function MobileBottomBar({ onOpenBooking }: MobileBottomBarProps) {
  return (
    <nav
      aria-label="Navigasi Cepat Seluler"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden h-14 border-t border-[#DCE2D8] bg-white/95 backdrop-blur-md"
    >
      <div className="grid h-full grid-cols-4 items-center px-1">
        <a
          href="#destinasi"
          className="flex min-h-[44px] flex-col items-center justify-center text-[#3D4F44] active:text-[#1F5C3D]"
        >
          <Compass className="h-[20px] w-[20px]" aria-hidden="true" />
          <span className="mt-0.5 text-[11px] font-medium leading-none">Destinasi</span>
        </a>

        <a
          href="#paket"
          className="flex min-h-[44px] flex-col items-center justify-center text-[#3D4F44] active:text-[#1F5C3D]"
        >
          <Ticket className="h-[20px] w-[20px]" aria-hidden="true" />
          <span className="mt-0.5 text-[11px] font-medium leading-none">Paket</span>
        </a>

        <a
          href="#lokasi"
          className="flex min-h-[44px] flex-col items-center justify-center text-[#3D4F44] active:text-[#1F5C3D]"
        >
          <MapPin className="h-[20px] w-[20px]" aria-hidden="true" />
          <span className="mt-0.5 text-[11px] font-medium leading-none">Lokasi</span>
        </a>

        <button
          type="button"
          onClick={onOpenBooking}
          className="mx-1 flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-[#1F5C3D] px-2 text-white active:bg-[#17472F] cursor-pointer"
        >
          <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="text-xs font-semibold leading-none whitespace-nowrap">Pesan WA</span>
        </button>
      </div>
    </nav>
  );
}
