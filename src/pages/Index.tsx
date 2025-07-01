
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import CarouselSection from "@/components/CarouselSection";
import MediaGallery from "@/components/MediaGallery";
import NewsletterSection from "@/components/NewsletterSection";
import Navigation from "@/components/Navigation";
import AdminPortal from "@/components/AdminPortal";

const Index = () => {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-cream via-white to-vintage-cream/50">
      <Navigation onAdminToggle={() => setShowAdmin(!showAdmin)} showAdmin={showAdmin} />
      
      {showAdmin ? (
        <AdminPortal />
      ) : (
        <>
          <HeroSection />
          <CarouselSection />
          <MediaGallery />
          <NewsletterSection />
        </>
      )}
    </div>
  );
};

export default Index;
