
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Clock, MapPin, Users, Star } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

const CarouselSection = () => {
  const { courses } = useAppContext();

  const getCourseIcon = (courseName: string) => {
    if (courseName.toLowerCase().includes('rockabilly')) return '🎸';
    if (courseName.toLowerCase().includes('swing')) return '💃';
    if (courseName.toLowerCase().includes('lindy')) return '🕺';
    if (courseName.toLowerCase().includes('charleston')) return '🎭';
    return '🎵';
  };

  const getCourseImage = (courseName: string) => {
    const images = [
      'linear-gradient(135deg, #8B4513 0%, #CD853F 50%, #DEB887 100%)',
      'linear-gradient(135deg, #B22222 0%, #DC143C 50%, #FF6347 100%)',
      'linear-gradient(135deg, #2F4F4F 0%, #708090 50%, #B0C4DE 100%)',
      'linear-gradient(135deg, #800080 0%, #9370DB 50%, #DDA0DD 100%)'
    ];
    return images[courseName.length % images.length];
  };

  return (
    <section id="carousel" className="py-24 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4 text-shadow">
            I Nostri Corsi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scopri i nostri corsi di ballo rockabilly e swing, perfetti per ogni livello
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {courses.map((course, index) => (
              <CarouselItem key={course.id} className={`md:basis-1/2 lg:basis-1/3 animate-scale-in stagger-${Math.min(index + 1, 4)}`}>
                <Card className="cursor-pointer card-hover backdrop-blur-glass border-primary/20 hover:border-primary/40 transition-all duration-500 group overflow-hidden">
                  <CardContent className="p-0">
                    {/* Course Image Header */}
                    <div 
                      className="relative h-48 flex items-center justify-center overflow-hidden"
                      style={{ background: getCourseImage(course.name) }}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
                      
                      {/* Vinyl Record Animation */}
                      <div className="relative z-10">
                        <div className="w-24 h-24 rounded-full bg-black/80 border-4 border-amber-400 flex items-center justify-center group-hover:animate-spin transition-all duration-1000">
                          <div className="w-6 h-6 rounded-full bg-amber-400" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl animate-float">
                          {getCourseIcon(course.name)}
                        </div>
                      </div>

                      {/* Price Badge */}
                      {course.price && (
                        <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full font-bold text-sm animate-glow-pulse">
                          €{course.price}
                        </div>
                      )}
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:gradient-text transition-all duration-300">
                          {course.name}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {course.description}
                        </p>
                      </div>

                      {/* Course Details */}
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-2 text-primary animate-float" />
                          <span>{course.time}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2 text-primary animate-float stagger-1" />
                          <span>{course.location}</span>
                        </div>

                        {course.instructor && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Star className="w-4 h-4 mr-2 text-accent animate-float stagger-2" />
                            <span>Istruttore: {course.instructor}</span>
                          </div>
                        )}

                        {course.maxParticipants && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="w-4 h-4 mr-2 text-secondary-foreground animate-float stagger-3" />
                            <span>Max {course.maxParticipants} partecipanti</span>
                          </div>
                        )}
                      </div>

                      {/* Action Area */}
                      <div className="mt-6 p-4 rounded-lg modern-gradient text-primary-foreground animate-rotate-in">
                        <div className="text-center">
                          <p className="text-sm font-medium mb-2">🎸 Pronto a ballare?</p>
                          <span className="text-xs opacity-90">Clicca per iscriverti →</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-effect" />
          <CarouselNext className="border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-effect" />
        </Carousel>

        {/* Decorative Elements */}
        <div className="flex justify-center mt-12 space-x-8 opacity-50">
          <div className="text-2xl animate-float">🎸</div>
          <div className="text-2xl animate-float stagger-1">🎵</div>
          <div className="text-2xl animate-float stagger-2">🎤</div>
          <div className="text-2xl animate-float stagger-3">🎭</div>
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
