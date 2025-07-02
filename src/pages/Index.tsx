
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import CarouselSection from "@/components/CarouselSection";
import EventCarousel from "@/components/EventCarousel";
import MediaGallery from "@/components/MediaGallery";
import NewsletterSection from "@/components/NewsletterSection";
import Navigation from "@/components/Navigation";
import AdminPortal from "@/components/AdminPortal";
import Footer from "@/components/Footer";
import { AppProvider } from "@/contexts/AppContext";

const Index = () => {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <AppProvider>
      <div className="min-h-screen">
        <Navigation onAdminToggle={() => setShowAdmin(!showAdmin)} showAdmin={showAdmin} />
        
        {showAdmin ? (
          <AdminPortal />
        ) : (
          <>
            <HeroSection />
            <CarouselSection />
            <EventCarousel />
            <MediaGallery />
            <NewsletterSection />
            <Footer />
          </>
        )}
      </div>
    </AppProvider>
  );
};

export default Index;
