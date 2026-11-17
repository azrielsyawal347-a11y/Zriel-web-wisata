import { useState } from 'react';
import {
  Check,
  Clock,
  Compass,
  Copy,
  ExternalLink,
  MapPin,
  MessageCircle,
  Navigation,
} from 'lucide-react';
import {
  MAP_SPOTS,
  VILLAGE_PROFILE,
  WHATSAPP_DISPLAY,
  buildWhatsAppUrl,
} from '../data/villageData';

export function LocationMapSection() {
  const [selectedSpotId, setSelectedSpotId] = useState<string>(MAP_SPOTS[0].id);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const activeSpot = MAP_SPOTS.find((s) => s.id === selectedSpotId) || MAP_SPOTS[0];

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(VILLAGE_PROFILE.address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2200);
    } catch {
      setCopiedAddress(false);
    }
  };

  return (
    <section id="lokasi" className="py-12 sm:py-16 bg-[#EEF1EC] border-t border-[#E2E7DF]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#8C4A2B]">Lokasi, Peta &amp; Jam Operasional</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#18261E] [text-wrap:balance]">
            Cara Menuju Desa Wisata Lereng Asri
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#46574D]">
            Klik titik lokasi pada peta kawasan di bawah untuk melihat jarak jalan kaki dari
            gerbang utama, atau buka rute berkendara langsung melalui Google Maps.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Interactive Kawasan Map */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#DCE2D8] bg-white p-4 sm:p-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-[#18261E]">
                  Peta Kawasan &amp; Titik Spot Wisata
                </h3>
                <span className="text-xs sm:text-sm text-[#526358] tabular-nums">
                  Koordinat: {VILLAGE_PROFILE.coordinates}
                </span>
              </div>

              {/* Custom Topographic Vector Kawasan Map */}
              <div className="relative w-full aspect-[16/11] overflow-hidden rounded-xl border border-[#DCE2D8] bg-[#E8EFE5]">
                <svg
                  viewBox="0 0 800 550"
                  className="h-full w-full select-none"
                  role="img"
                  aria-label="Peta interaktif kawasan Desa Wisata Lereng Asri"
                >
                  {/* Topographic elevation contour bands */}
                  <rect width="800" height="550" fill="#EBF1E7" />
                  <path
                    d="M-40,140 C160,90 290,180 480,110 C620,60 720,90 840,40 L840,580 L-40,580 Z"
                    fill="#E1EADB"
                  />
                  <path
                    d="M-40,260 C190,220 340,300 520,210 C660,145 730,180 840,150 L840,580 L-40,580 Z"
                    fill="#D7E3D0"
                  />
                  <path
                    d="M-40,390 C210,360 360,410 580,350 C690,320 760,340 840,310 L840,580 L-40,580 Z"
                    fill="#CEDDC6"
                  />

                  {/* Mountain stream line */}
                  <path
                    d="M210,190 C235,250 180,310 155,390 C138,445 105,495 80,550"
                    fill="none"
                    stroke="#7FB3C8"
                    strokeWidth="9"
                    strokeLinecap="round"
                    opacity="0.7"
                  />

                  {/* Main paved access road to gate */}
                  <path
                    d="M25,530 C85,490 125,465 160,430"
                    fill="none"
                    stroke="#8A8E86"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <path
                    d="M25,530 C85,490 125,465 160,430"
                    fill="none"
                    stroke="#F4F5F1"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                    strokeLinecap="round"
                  />

                  {/* Walking trails connecting spots */}
                  <path
                    d="M160,430 Q260,390 336,341 T448,253 T640,132"
                    fill="none"
                    stroke="#B87A56"
                    strokeWidth="4"
                    strokeDasharray="7 6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M448,253 Q330,220 208,187"
                    fill="none"
                    stroke="#B87A56"
                    strokeWidth="4"
                    strokeDasharray="7 6"
                    strokeLinecap="round"
                  />

                  {/* Compass mark */}
                  <g transform="translate(740, 60)" opacity="0.75">
                    <circle cx="0" cy="0" r="22" fill="#FFFFFF" stroke="#B7C4B2" strokeWidth="1.5" />
                    <polygon points="0,-14 5,2 0,-1 -5,2" fill="#1F5C3D" />
                    <polygon points="0,14 5,2 0,5 -5,2" fill="#8C4A2B" />
                    <text
                      x="0"
                      y="-26"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill="#18261E"
                    >
                      U
                    </text>
                  </g>

                  {/* Legend label inside map */}
                  <text x="24" y="42" fontSize="13" fontWeight="600" fill="#2A4033">
                    Kawasan Wisata Lereng Asri (1.095 – 1.210 mdpl)
                  </text>
                  <text x="24" y="61" fontSize="11" fill="#516659">
                    Garis putus-putus cokelat = jalur jalan kaki antar spot
                  </text>
                </svg>

                {/* Interactive Spot Pins Overlay (HTML buttons >= 44px hitbox) */}
                {MAP_SPOTS.map((spot) => {
                  const isSelected = spot.id === activeSpot.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setSelectedSpotId(spot.id)}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      aria-pressed={isSelected}
                      className="absolute -translate-x-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F5C3D]"
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-md transition-transform ${
                          isSelected
                            ? 'scale-110 bg-[#1F5C3D] border-white text-white'
                            : 'bg-white border-[#1F5C3D] text-[#1F5C3D] group-hover:scale-105'
                        }`}
                      >
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span
                        className={`mt-1 rounded-md px-2 py-0.5 text-[11px] font-semibold shadow-sm whitespace-nowrap transition-colors ${
                          isSelected
                            ? 'bg-[#18261E] text-white'
                            : 'bg-white/95 text-[#18261E] border border-[#DCE2D8]'
                        }`}
                      >
                        {spot.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Pin Info Box */}
            <div className="mt-4 rounded-xl bg-[#F5F7F3] p-4 sm:p-5 border border-[#E2E7DF]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs sm:text-sm font-medium text-[#1F5C3D]">
                  {activeSpot.zone} · {activeSpot.elevation}
                </p>
                <span className="text-xs sm:text-sm font-medium text-[#526358] tabular-nums">
                  {activeSpot.distanceFromGate}
                </span>
              </div>
              <h4 className="mt-1 font-display text-lg sm:text-xl font-semibold text-[#18261E]">
                {activeSpot.label}
              </h4>
              <p className="mt-1.5 text-sm text-[#46574D] leading-relaxed">
                {activeSpot.description}
              </p>
              <p className="mt-2.5 text-xs sm:text-sm text-[#526358]">
                <span className="font-semibold text-[#18261E]">Fasilitas: </span>
                {activeSpot.facilities}
              </p>
            </div>
          </div>

          {/* Address, Hours & Direct Google Maps / WA Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#DCE2D8] bg-white p-5 sm:p-7">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-[#1F5C3D]">
                  <MapPin className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <h3 className="font-display text-xl font-semibold text-[#18261E]">
                    Alamat Resmi Lokasi
                  </h3>
                </div>
                <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#46574D]">
                  {VILLAGE_PROFILE.address}
                </p>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#DCE2D8] bg-[#F7F9F5] px-4 py-2 text-sm font-medium text-[#18261E] hover:bg-[#EDF2EA] cursor-pointer"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="h-4 w-4 text-[#1F5C3D]" aria-hidden="true" />
                      <span>Alamat Berhasil Disalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-[#526358]" aria-hidden="true" />
                      <span>Salin Alamat Lengkap</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-5 border-t border-[#ECEFE9]">
                <div className="flex items-center gap-2 text-[#1F5C3D]">
                  <Clock className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <h3 className="font-display text-xl font-semibold text-[#18261E]">
                    Jam Operasional
                  </h3>
                </div>
                <p className="mt-2 text-sm sm:text-base font-semibold text-[#18261E] tabular-nums">
                  {VILLAGE_PROFILE.operationalHours}
                </p>
                <p className="mt-1 text-sm text-[#526358]">{VILLAGE_PROFILE.overnightNote}</p>
              </div>

              <div className="pt-5 border-t border-[#ECEFE9]">
                <div className="flex items-center gap-2 text-[#1F5C3D]">
                  <Compass className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <h3 className="font-display text-xl font-semibold text-[#18261E]">
                    Akses Kendaraan &amp; Parkir
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#46574D]">
                  Berjarak sekitar 35 menit dari pusat kota Magelang melalui jalan beraspal mulus.
                  Area parkir luas tersedia untuk sepeda motor, mobil keluarga, hingga bus medium.
                </p>
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-[#ECEFE9] space-y-3">
              <a
                href={VILLAGE_PROFILE.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#18261E] px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#24382C]"
              >
                <Navigation className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Buka Lokasi di Google Maps</span>
                <ExternalLink className="h-4 w-4 shrink-0 opacity-80" aria-hidden="true" />
              </a>

              <a
                href={buildWhatsAppUrl(
                  'Halo Admin Desa Wisata Lereng Asri, saya ingin menanyakan rute perjalanan dan informasi kunjungan hari ini.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#1F5C3D] px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#17472F]"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Chat Admin ({WHATSAPP_DISPLAY})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
