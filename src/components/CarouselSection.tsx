
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, MapPin } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import EventDialog from "./EventDialog";

const CarouselSection = () => {
  const { events } = useAppContext();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <section id="carousel" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4 text-shadow">
            Eventi Prossimi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Non perdere i nostri eventi speciali, serate a tema e workshop esclusivi
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {events.map((event, index) => (
              <CarouselItem key={event.id} className={`md:basis-1/2 lg:basis-1/3 animate-scale-in stagger-${Math.min(index + 1, 4)}`}>
                <EventDialog event={event}>
                  <Card className="cursor-pointer card-hover backdrop-blur-glass border-primary/20 hover:border-primary/40 transition-all duration-500 group">
                    <CardContent className="p-6">
                      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 p-6 mb-4 group-hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(180,100,70,0.1),transparent_70%)]" />
                        <div className="relative">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-3xl animate-float">🎪</span>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">
                                {formatDate(event.date).split(' ')[0]}
                              </div>
                              <div className="text-sm text-accent font-medium">
                                {formatDate(event.date).split(' ')[1]}
                              </div>
                            </div>
                          </div>
                          <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:gradient-text transition-all duration-300">
                            {event.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {event.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2 text-primary" />
                          {new Date(event.date).toLocaleDateString('it-IT')}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2 text-primary" />
                          {event.venue}
                        </div>
                        {event.ticketPrice && (
                          <div className="pt-2">
                            <span className="text-lg font-bold text-accent">
                              €{event.ticketPrice}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 text-center">
                        <span className="text-sm text-primary font-medium group-hover:underline">
                          Clicca per maggiori dettagli →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </EventDialog>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
        </Carousel>
      </div>
    </section>
  );
};

export default CarouselSection;
