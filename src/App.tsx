import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DestinationsSection } from './components/DestinationsSection';
import { PackagesSection } from './components/PackagesSection';
import { GallerySection } from './components/GallerySection';
import { LocationMapSection } from './components/LocationMapSection';
import { FaqAndFooter } from './components/FaqAndFooter';
import { MobileBottomBar } from './components/MobileBottomBar';
import { WhatsAppBookingModal } from './components/WhatsAppBookingModal';
import { TOUR_PACKAGES, TourPackage } from './data/villageData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(TOUR_PACKAGES[1]);

  const handleOpenDefaultBooking = () => {
    setSelectedPackage(TOUR_PACKAGES[1]);
    setIsBookingOpen(true);
  };

  const handleSelectPackage = (pkg: TourPackage) => {
    setSelectedPackage(pkg);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#18261E]">
      <Header onOpenBooking={handleOpenDefaultBooking} />

      <main>
        <HeroSection onOpenBooking={handleOpenDefaultBooking} />
        <DestinationsSection />
        <PackagesSection onSelectPackage={handleSelectPackage} />
        <GallerySection />
        <LocationMapSection />
        <FaqAndFooter onOpenBooking={handleOpenDefaultBooking} />
      </main>

      <MobileBottomBar onOpenBooking={handleOpenDefaultBooking} />

      <WhatsAppBookingModal
        isOpen={isBookingOpen}
        selectedPackage={selectedPackage}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
