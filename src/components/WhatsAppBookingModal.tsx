import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, MessageCircle, Minus, Plus, X } from 'lucide-react';
import {
  TOUR_PACKAGES,
  TourPackage,
  buildWhatsAppUrl,
  formatRupiah,
} from '../data/villageData';

interface WhatsAppBookingModalProps {
  isOpen: boolean;
  selectedPackage: TourPackage | null;
  onClose: () => void;
}

export function WhatsAppBookingModal({
  isOpen,
  selectedPackage,
  onClose,
}: WhatsAppBookingModalProps) {
  const [packageId, setPackageId] = useState<string>(TOUR_PACKAGES[0].id);
  const [visitorName, setVisitorName] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [quantity, setQuantity] = useState(2);
  const [notes, setNotes] = useState('');
  const [copiedMsg, setCopiedMsg] = useState(false);

  useEffect(() => {
    if (selectedPackage) {
      setPackageId(selectedPackage.id);
      setQuantity(selectedPackage.id === 'paket-homestay' ? 1 : selectedPackage.minPeople);
    }
  }, [selectedPackage]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const activePackage = useMemo(
    () => TOUR_PACKAGES.find((p) => p.id === packageId) || TOUR_PACKAGES[0],
    [packageId]
  );

  const handlePackageChange = (newId: string) => {
    setPackageId(newId);
    const found = TOUR_PACKAGES.find((p) => p.id === newId);
    if (found) {
      setQuantity(found.id === 'paket-homestay' ? 1 : found.minPeople);
    }
  };

  const isUnitPackage = activePackage.id === 'paket-homestay';
  const minQty = isUnitPackage ? 1 : activePackage.minPeople;
  const maxQty = activePackage.maxPeople;

  const estimatedTotal = activePackage.price * quantity;

  const formattedMessage = useMemo(() => {
    const namaLine = visitorName.trim() || '(Belum diisi)';
    const tanggalLine = visitDate.trim() || '(Menyesuaikan ketersediaan)';
    const unitLabel = isUnitPackage ? 'unit rumah/malam' : 'orang';
    const catatanLine = notes.trim() ? `\nCatatan Tambahan: ${notes.trim()}` : '';

    return `Halo Admin Desa Wisata Lereng Asri, saya ingin memesan paket wisata berikut:\n\nNama Pemesan: ${namaLine}\nPaket Pilihan: ${activePackage.name}\nRencana Tanggal: ${tanggalLine}\nJumlah: ${quantity} ${unitLabel}\nEstimasi Biaya: ${formatRupiah(estimatedTotal)}${catatanLine}\n\nMohon info ketersediaan dan langkah selanjutnya. Terima kasih.`;
  }, [activePackage.name, estimatedTotal, isUnitPackage, notes, quantity, visitDate, visitorName]);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 2200);
    } catch {
      setCopiedMsg(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-xs sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sm:hidden pt-3 pb-1">
          <div className="mx-auto h-1.5 w-10 rounded-full bg-[#D0D7CD]" />
        </div>

        <div className="flex items-start justify-between gap-4 border-b border-[#ECEFE9] px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium text-[#1F5C3D]">Pemesanan Langsung Tanpa Akun</p>
            <h3
              id="wa-modal-title"
              className="mt-0.5 font-display text-xl sm:text-2xl font-semibold text-[#18261E]"
            >
              Form Pesan via WhatsApp
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup form pemesanan"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3F5F1] text-[#18261E] hover:bg-[#E5EAE1] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          {/* Package Selection */}
          <div>
            <label htmlFor="pkg-select" className="block text-sm font-semibold text-[#18261E]">
              Pilih Paket Wisata
            </label>
            <select
              id="pkg-select"
              value={packageId}
              onChange={(e) => handlePackageChange(e.target.value)}
              className="mt-1.5 w-full min-h-[48px] rounded-xl border border-[#CFD8CB] bg-white px-3.5 py-2.5 text-sm sm:text-base text-[#18261E] focus:border-[#1F5C3D] focus:outline-none"
            >
              {TOUR_PACKAGES.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} — {formatRupiah(pkg.price)} ({pkg.priceUnit})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="visitor-name" className="block text-sm font-semibold text-[#18261E]">
                Nama Anda
              </label>
              <input
                id="visitor-name"
                type="text"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className="mt-1.5 w-full min-h-[48px] rounded-xl border border-[#CFD8CB] px-3.5 py-2.5 text-sm sm:text-base text-[#18261E] placeholder:text-[#86948B] focus:border-[#1F5C3D] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="visit-date" className="block text-sm font-semibold text-[#18261E]">
                Rencana Tanggal Kunjungan
              </label>
              <input
                id="visit-date"
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="mt-1.5 w-full min-h-[48px] rounded-xl border border-[#CFD8CB] px-3.5 py-2.5 text-sm sm:text-base text-[#18261E] focus:border-[#1F5C3D] focus:outline-none"
              />
            </div>
          </div>

          {/* Quantity Stepper + Live Cost Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-[#F4F6F2] p-4 border border-[#E2E7DF]">
            <div>
              <p className="text-sm font-semibold text-[#18261E]">
                {isUnitPackage ? 'Jumlah Unit / Malam' : 'Jumlah Peserta'}
              </p>
              <p className="text-xs text-[#526358] tabular-nums">
                Minimal {minQty} {isUnitPackage ? 'unit' : 'orang'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Kurangi jumlah"
                onClick={() => setQuantity((q) => Math.max(minQty, q - 1))}
                disabled={quantity <= minQty}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#CFD8CB] bg-white text-[#18261E] disabled:opacity-40 hover:bg-[#EEF2EC] cursor-pointer"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="min-w-[3.5rem] text-center text-lg font-bold text-[#18261E] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Tambah jumlah"
                onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                disabled={quantity >= maxQty}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#CFD8CB] bg-white text-[#18261E] disabled:opacity-40 hover:bg-[#EEF2EC] cursor-pointer"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="booking-notes" className="block text-sm font-semibold text-[#18261E]">
              Catatan Tambahan (Opsional)
            </label>
            <input
              id="booking-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Bawa anak usia 5 tahun / minta menu tidak pedas"
              className="mt-1.5 w-full min-h-[48px] rounded-xl border border-[#CFD8CB] px-3.5 py-2.5 text-sm sm:text-base text-[#18261E] placeholder:text-[#86948B] focus:border-[#1F5C3D] focus:outline-none"
            />
          </div>

          {/* Transparent Estimate & Message Preview */}
          <div className="rounded-xl bg-[#EEF2EC] p-4">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#DCE2D8]">
              <span className="text-sm font-medium text-[#46574D]">Estimasi Total Biaya</span>
              <span className="font-display text-xl sm:text-2xl font-bold text-[#1F5C3D] tabular-nums">
                {formatRupiah(estimatedTotal)}
              </span>
            </div>
            <p className="mt-2.5 text-xs font-medium text-[#526358]">
              Pratinjau pesan otomatis ke WhatsApp Admin:
            </p>
            <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-[#2D3D33] bg-white/75 rounded-lg p-3 border border-[#DCE2D8]">
              {formattedMessage}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <a
              href={buildWhatsAppUrl(formattedMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2.5 rounded-xl bg-[#1F5C3D] px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#17472F]"
            >
              <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Kirim ke WhatsApp Sekarang</span>
            </a>

            <button
              type="button"
              onClick={handleCopyMessage}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[#CFD8CB] bg-white px-4 py-3.5 text-sm font-semibold text-[#18261E] hover:bg-[#F5F7F3] cursor-pointer whitespace-nowrap"
            >
              {copiedMsg ? (
                <>
                  <Check className="h-4 w-4 text-[#1F5C3D]" aria-hidden="true" />
                  <span>Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-[#526358]" aria-hidden="true" />
                  <span>Salin Pesan</span>
                </>
              )}
            </button>
          </div>

          <p className="text-center text-xs text-[#617267]">
            Pembayaran dan konfirmasi ketersediaan dikoordinasikan langsung dengan admin resmi
            Desa Wisata Lereng Asri melalui WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
