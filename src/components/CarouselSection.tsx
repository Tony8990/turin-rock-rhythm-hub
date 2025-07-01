
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Clock, MapPin, Users } from "lucide-react";

const CarouselSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Beginner Rockabilly",
      description: "Perfect for newcomers to rockabilly dancing. Learn the basic steps and groove to classic tunes.",
      time: "7:00 PM - 8:30 PM",
      location: "Main Studio",
      participants: "12-15",
      image: "🕺",
      color: "from-vintage-teal to-vintage-teal-light"
    },
    {
      id: 2,
      title: "Swing Fundamentals",
      description: "Master the essential swing dance moves with our experienced instructors.",
      time: "6:00 PM - 7:30 PM",
      location: "Studio A",
      participants: "10-12",
      image: "💃",
      color: "from-vintage-red-vintage to-vintage-gold"
    },
    {
      id: 3,
      title: "Advanced Performance",
      description: "For experienced dancers ready to take their skills to the performance level.",
      time: "8:30 PM - 10:00 PM",
      location: "Main Studio",
      participants: "8-10",
      image: "🎭",
      color: "from-vintage-gold to-vintage-cream-dark"
    },
    {
      id: 4,
      title: "Weekend Social Dance",
      description: "Join our social dancing events every Saturday night. All levels welcome!",
      time: "8:00 PM - 11:00 PM",
      location: "Grand Ballroom",
      participants: "30-50",
      image: "🎪",
      color: "from-vintage-teal-dark to-vintage-teal"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="carousel" className="py-20 bg-gradient-to-r from-vintage-cream/30 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-vintage font-bold text-vintage-teal mb-4">
            Our Dance Classes
          </h2>
          <p className="text-xl text-vintage-teal/70 max-w-2xl mx-auto">
            Discover the perfect class for your skill level and dancing style
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-2xl retro-shadow">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={slide.id} className="w-full flex-shrink-0">
                  <Card className={`bg-gradient-to-br ${slide.color} border-0 text-white`}>
                    <CardContent className="p-8 md:p-12">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                          <div className="text-6xl mb-4 text-center">
                            {slide.image}
                          </div>
                          <h3 className="text-3xl font-vintage font-bold mb-4">
                            {slide.title}
                          </h3>
                          <p className="text-lg mb-6 opacity-90">
                            {slide.description}
                          </p>
                          <Button 
                            variant="secondary"
                            className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                          >
                            Join This Class
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
                            <Clock className="w-5 h-5" />
                            <span>{slide.time}</span>
                          </div>
                          <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
                            <MapPin className="w-5 h-5" />
                            <span>{slide.location}</span>
                          </div>
                          <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
                            <Users className="w-5 h-5" />
                            <span>{slide.participants} dancers</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-vintage-teal text-vintage-teal"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-vintage-teal text-vintage-teal"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-vintage-teal scale-125' 
                    : 'bg-vintage-teal/30 hover:bg-vintage-teal/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
