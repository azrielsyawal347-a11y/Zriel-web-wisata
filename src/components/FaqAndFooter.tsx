import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import {
  FAQ_ITEMS,
  VILLAGE_PROFILE,
  WHATSAPP_DISPLAY,
  buildWhatsAppUrl,
} from '../data/villageData';

interface FaqAndFooterProps {
  onOpenBooking: () => void;
}

export function FaqAndFooter({ onOpenBooking }: FaqAndFooterProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <>
      {/* FAQ + Bottom WhatsApp Conversion Banner */}
      <section className="py-12 sm:py-16 bg-[#F7F6F2] border-t border-[#E2E7DF]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-sm font-medium text-[#8C4A2B]">Pertanyaan Umum Wisatawan</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#18261E] [text-wrap:balance]">
                Hal yang Sering Ditanyakan Sebelum Berkunjung
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#46574D]">
                Masih ada pertanyaan khusus untuk rombongan keluarga, sekolah, atau acara kantor?
                Tim pengelola desa siap membalas dengan ramah.
              </p>

              <div className="mt-6 rounded-2xl bg-[#18261E] p-6 text-white">
                <h3 className="font-display text-xl font-semibold">
                  Siap Berlibur ke Lereng Asri?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#D1DDD4]">
                  Pesan paket wisata atau tanyakan ketersediaan tanggal secara langsung tanpa perlu
                  daftar akun.
                </p>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#25724B] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1E5D3D] cursor-pointer"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>Pesan via WhatsApp Sekarang</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#DCE2D8] rounded-2xl border border-[#DCE2D8] bg-white">
              {FAQ_ITEMS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id} className="px-5 sm:px-6">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="flex min-h-[60px] w-full items-center justify-between gap-4 py-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F5C3D]"
                    >
                      <span className="text-base font-semibold text-[#18261E]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#526358] transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#1F5C3D]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-5 text-sm sm:text-base leading-relaxed text-[#46574D]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Grounded Footer */}
      <footer className="border-t border-[#DCE2D8] bg-[#EEF1EC] pt-10 pb-24 md:pb-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8 pb-8 border-b border-[#DCE2D8]">
            <div className="max-w-sm">
              <p className="font-display text-2xl font-semibold text-[#18261E]">
                {VILLAGE_PROFILE.fullName}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#46574D]">
                Dikelola oleh Pokdarwis Dusun Sumber Rejo. Menyajikan wisata alam pegunungan yang
                ramah keluarga, edukatif, dan lestari.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="font-semibold text-[#18261E]">Jelajahi</p>
                <ul className="mt-3 space-y-2.5 text-[#46574D]">
                  <li>
                    <a href="#destinasi" className="hover:text-[#18261E] hover:underline">
                      Destinasi
                    </a>
                  </li>
                  <li>
                    <a href="#paket" className="hover:text-[#18261E] hover:underline">
                      Paket Wisata
                    </a>
                  </li>
                  <li>
                    <a href="#galeri" className="hover:text-[#18261E] hover:underline">
                      Galeri Foto
                    </a>
                  </li>
                  <li>
                    <a href="#lokasi" className="hover:text-[#18261E] hover:underline">
                      Peta &amp; Lokasi
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-[#18261E]">Jam Layanan</p>
                <ul className="mt-3 space-y-2 text-[#46574D] tabular-nums">
                  <li>Senin – Minggu</li>
                  <li>07.00 – 17.00 WIB</li>
                  <li className="text-xs text-[#5E6E64]">Homestay s.d. 20.00 WIB</li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="font-semibold text-[#18261E]">Kontak Resmi</p>
                <ul className="mt-3 space-y-2 text-[#46574D]">
                  <li>
                    <a
                      href={buildWhatsAppUrl('Halo Admin Desa Wisata Lereng Asri, saya ingin bertanya.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#1F5C3D] hover:underline tabular-nums"
                    >
                      WhatsApp: {WHATSAPP_DISPLAY}
                    </a>
                  </li>
                  <li>
                    <a
                      href={VILLAGE_PROFILE.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#18261E] hover:underline"
                    >
                      Petunjuk Google Maps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#5E6E64]">
            <p>© {new Date().getFullYear()} Desa Wisata Lereng Asri. Informasi resmi pengunjung.</p>
            <p>Dusun Sumber Rejo, Kec. Karangrejo, Kab. Magelang</p>
          </div>
        </div>
      </footer>
    </>
  );
}
