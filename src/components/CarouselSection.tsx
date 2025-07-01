
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Clock, MapPin, Users, Star } from "lucide-react";

const CarouselSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Rockabilly per Principianti",
      description: "Perfetto per i nuovi arrivati nel mondo del rockabilly. Impara i passi base e muoviti al ritmo dei classici.",
      time: "19:00 - 20:30",
      location: "Studio Principale",
      participants: "12-15",
      image: "🕺",
      level: "Principiante",
      color: "from-primary/80 to-primary"
    },
    {
      id: 2,
      title: "Fondamenti di Swing",
      description: "Padroneggia i movimenti essenziali dello swing dance con i nostri istruttori esperti.",
      time: "18:00 - 19:30",
      location: "Studio A",
      participants: "10-12",
      image: "💃",
      level: "Intermedio",
      color: "from-accent/80 to-accent"
    },
    {
      id: 3,
      title: "Performance Avanzata",
      description: "Per ballerini esperti pronti a portare le loro abilità al livello delle performance.",
      time: "20:30 - 22:00",
      location: "Studio Principale",
      participants: "8-10",
      image: "🎭",
      level: "Avanzato",
      color: "from-primary/60 to-accent/80"
    },
    {
      id: 4,
      title: "Ballo Sociale Weekend",
      description: "Unisciti ai nostri eventi di ballo sociale ogni sabato sera. Tutti i livelli benvenuti!",
      time: "20:00 - 23:00",
      location: "Sala Grande",
      participants: "30-50",
      image: "🎪",
      level: "Tutti i Livelli",
      color: "from-accent/60 to-primary/60"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="carousel" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-card/50 to-background/80"></div>
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-primary/10 animate-float"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-accent/10 animate-float" style={{ animationDelay: '1.5s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Star className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              I Nostri Corsi
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black gradient-text mb-6">
            Lezioni di Ballo
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Scopri il corso perfetto per il tuo livello e stile di ballo
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-3xl glow-effect">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={slide.id} className="w-full flex-shrink-0">
                  <Card className={`bg-gradient-to-br ${slide.color} border-0 text-white overflow-hidden`}>
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-2 min-h-[500px]">
                        {/* Content Side */}
                        <div className="p-12 flex flex-col justify-center space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                {slide.level}
                              </span>
                            </div>
                            <h3 className="text-4xl font-display font-bold text-shadow animate-slide-up">
                              {slide.title}
                            </h3>
                            <p className="text-lg opacity-90 leading-relaxed animate-fade-in-up stagger-1">
                              {slide.description}
                            </p>
                          </div>
                          
                          <div className="space-y-4 animate-fade-in-up stagger-2">
                            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
                              <Clock className="w-5 h-5 flex-shrink-0" />
                              <span className="font-medium">{slide.time}</span>
                            </div>
                            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
                              <MapPin className="w-5 h-5 flex-shrink-0" />
                              <span className="font-medium">{slide.location}</span>
                            </div>
                            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
                              <Users className="w-5 h-5 flex-shrink-0" />
                              <span className="font-medium">{slide.participants} ballerini</span>
                            </div>
                          </div>

                          <Button 
                            size="lg"
                            className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm hover:scale-105 transition-all duration-300 self-start px-8 py-4 h-auto font-semibold animate-fade-in-up stagger-3"
                          >
                            Unisciti a Questo Corso
                          </Button>
                        </div>

                        {/* Image Side */}
                        <div className="bg-white/5 backdrop-blur-sm flex items-center justify-center p-12">
                          <div className="text-9xl animate-float filter drop-shadow-2xl">
                            {slide.image}
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
            className="absolute left-6 top-1/2 transform -translate-y-1/2 backdrop-blur-glass border-primary/30 hover:border-primary hover:bg-primary/20 w-12 h-12 animate-scale-in"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 backdrop-blur-glass border-primary/30 hover:border-primary hover:bg-primary/20 w-12 h-12 animate-scale-in stagger-1"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 transition-all duration-300 rounded-full ${
                  index === currentSlide 
                    ? 'bg-primary w-8 glow-effect' 
                    : 'bg-muted w-3 hover:bg-primary/50'
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
