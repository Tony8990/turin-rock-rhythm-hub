
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, MapPin, Star, Music } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useState } from "react";

const CourseCarousel = () => {
  const { courses } = useAppContext();

  const getCourseIcon = (name: string) => {
    if (name.toLowerCase().includes('rockabilly')) return '🎸';
    if (name.toLowerCase().includes('swing')) return '💃';
    if (name.toLowerCase().includes('lindy')) return '🕺';
    if (name.toLowerCase().includes('charleston')) return '🎭';
    return '🎵';
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-vintage-orange/10 to-vintage-brown/20">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-up-bouncy">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-vintage-orange mb-4 text-shadow-strong animate-text-glow-rainbow">
            Corsi di Danza Rockabilly
          </h2>
          <p className="text-xl text-vintage-cream max-w-2xl mx-auto animate-fade-in-wave">
            Impara l'arte del ballo rockabilly con i nostri corsi professionali
          </p>
        </div>

        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {courses.map((course, index) => (
              <CarouselItem key={course.id} className={`md:basis-1/2 lg:basis-1/3 animate-scale-in-bouncy stagger-${Math.min(index + 1, 4)}`}>
                <Card className="card-hover-mega backdrop-blur-glass-enhanced border-vintage-orange/30 hover:border-vintage-gold/60 transition-all duration-700 group overflow-hidden shadow-vintage-glow">
                  <CardContent className="p-0">
                    {/* Enhanced Header */}
                    <div className="relative h-56 flex items-center justify-center overflow-hidden bg-gradient-to-br from-vintage-orange to-vintage-brown">
                      <div className="absolute inset-0 bg-vintage-orange/10 group-hover:bg-vintage-orange/5 transition-colors duration-700" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,140,0,0.2),transparent_70%)] animate-pulse-waves" />
                      
                      {/* Animated Vinyl Record */}
                      <div className="relative z-10 animate-float-complex">
                        <div className="w-28 h-28 rounded-full vinyl-record-premium border-4 border-vintage-orange flex items-center justify-center group-hover:animate-vinyl-spin-fast transition-all duration-1000 shadow-vinyl-glow">
                          <div className="w-8 h-8 rounded-full bg-vintage-orange animate-pulse-rainbow" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl animate-float-rotate">
                          {getCourseIcon(course.name)}
                        </div>
                      </div>

                      {/* Floating Musical Notes */}
                      <div className="absolute top-4 left-4 animate-float-notes">
                        <Music className="w-6 h-6 text-vintage-orange opacity-60 animate-spin-slow" />
                      </div>
                      <div className="absolute top-8 right-8 animate-float-notes stagger-2">
                        <Star className="w-5 h-5 text-vintage-cream opacity-50 animate-twinkle" />
                      </div>

                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 bg-vintage-orange text-vintage-brown px-4 py-2 rounded-full font-bold text-sm animate-glow-pulse-rainbow border-2 border-vintage-cream shadow-badge-glow">
                        {'price' in course && course.price ? `€${course.price}` : '🎵 CORSO'}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 bg-gradient-to-b from-vintage-orange/5 to-vintage-brown/10">
                      <div className="mb-4">
                        <h3 className="text-xl font-display font-bold text-vintage-orange mb-2 group-hover:text-vintage-gold transition-all duration-500 animate-text-shimmer-slow">
                          {course.name}
                        </h3>
                        <p className="text-vintage-cream/70 text-sm line-clamp-2 animate-fade-in-stagger">
                          {course.description}
                        </p>
                      </div>

                      {/* Course Details */}
                      <div className="space-y-3">
                        {'time' in course && (
                          <div className="flex items-center text-sm text-vintage-cream/70 animate-slide-in-bounce">
                            <Calendar className="w-4 h-4 mr-2 text-vintage-orange animate-float-gentle" />
                            <span>{course.time}</span>
                          </div>
                        )}
                        {'location' in course && (
                          <div className="flex items-center text-sm text-vintage-cream/70 animate-slide-in-bounce stagger-1">
                            <MapPin className="w-4 h-4 mr-2 text-vintage-gold animate-float-gentle stagger-1" />
                            <span>{course.location}</span>
                          </div>
                        )}
                        {'instructor' in course && course.instructor && (
                          <div className="flex items-center text-sm text-vintage-cream/70 animate-slide-in-bounce stagger-2">
                            <Star className="w-4 h-4 mr-2 text-vintage-orange animate-twinkle" />
                            <span>Istruttore: {course.instructor}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Area */}
                      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-vintage-orange to-vintage-gold text-vintage-brown animate-rotate-in-mega border-2 border-vintage-orange/40 shadow-action-glow">
                        <div className="text-center animate-bounce-complex">
                          <p className="text-sm font-medium mb-2 animate-text-dance">
                            💃 Inizia a ballare!
                          </p>
                          <span className="text-xs opacity-80 animate-pulse-soft">
                            Prenota il tuo posto →
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-vintage-orange text-vintage-orange hover:bg-vintage-orange hover:text-vintage-brown glow-effect-enhanced animate-pulse-glow -left-16" />
          <CarouselNext className="border-vintage-orange text-vintage-orange hover:bg-vintage-orange hover:text-vintage-brown glow-effect-enhanced animate-pulse-glow -right-16" />
        </Carousel>

        {/* Decorative Elements */}
        <div className="flex justify-center mt-16 space-x-12 opacity-60">
          <div className="text-4xl animate-float-dance">💃</div>
          <div className="text-4xl animate-float-dance stagger-1">🕺</div>
          <div className="text-4xl animate-float-dance stagger-2">🎵</div>
          <div className="text-4xl animate-float-dance stagger-3">🎭</div>
        </div>
      </div>
    </section>
  );
};

export default CourseCarousel;
