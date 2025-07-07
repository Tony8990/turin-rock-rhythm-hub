
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, MapPin, Music, Star } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import EventDialog from "./EventDialog";
import { useState } from "react";

const EventCarousel = () => {
  const { events } = useAppContext();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-vintage-brown/20 to-vintage-gold/10">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-up-bouncy">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-vintage-gold mb-4 text-shadow-strong animate-text-glow-rainbow">
            Eventi Rockabilly Esclusivi
          </h2>
          <p className="text-xl text-vintage-cream max-w-2xl mx-auto animate-fade-in-wave">
            Partecipa ai nostri eventi rockabilly e vivi l'autentica esperienza vintage
          </p>
        </div>

        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {events.map((event, index) => (
              <CarouselItem key={event.id} className={`md:basis-1/2 lg:basis-1/3 animate-scale-in-bouncy stagger-${Math.min(index + 1, 4)}`}>
                <Card 
                  className="cursor-pointer card-hover-mega backdrop-blur-glass-enhanced border-vintage-gold/30 hover:border-vintage-orange/60 transition-all duration-700 group overflow-hidden shadow-vintage-glow"
                  onClick={() => setSelectedEvent(event)}
                >
                  <CardContent className="p-0">
                    {/* Enhanced Header */}
                    <div className="relative h-56 flex items-center justify-center overflow-hidden vintage-gradient-warm">
                      <div className="absolute inset-0 bg-vintage-brown/10 group-hover:bg-vintage-brown/5 transition-colors duration-700" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(218,165,32,0.2),transparent_70%)] animate-pulse-waves" />
                      
                      {/* Animated Vinyl Record */}
                      <div className="relative z-10 animate-float-complex">
                        <div className="w-28 h-28 rounded-full vinyl-record-premium border-4 border-vintage-gold flex items-center justify-center group-hover:animate-vinyl-spin-fast transition-all duration-1000 shadow-vinyl-glow">
                          <div className="w-8 h-8 rounded-full bg-vintage-gold animate-pulse-rainbow" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl animate-float-rotate">
                          🎪
                        </div>
                      </div>

                      {/* Floating Musical Notes */}
                      <div className="absolute top-4 left-4 animate-float-notes">
                        <Music className="w-6 h-6 text-vintage-gold opacity-60 animate-spin-slow" />
                      </div>
                      <div className="absolute top-8 right-8 animate-float-notes stagger-2">
                        <Star className="w-5 h-5 text-vintage-cream opacity-50 animate-twinkle" />
                      </div>

                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 bg-vintage-gold text-vintage-brown px-4 py-2 rounded-full font-bold text-sm animate-glow-pulse-rainbow border-2 border-vintage-cream shadow-badge-glow">
                        {'ticketPrice' in event && event.ticketPrice ? `€${event.ticketPrice}` : '🎪 EVENTO'}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 bg-gradient-to-b from-vintage-brown/5 to-vintage-orange/10">
                      <div className="mb-4">
                        <h3 className="text-xl font-display font-bold text-vintage-gold mb-2 group-hover:text-vintage-orange transition-all duration-500 animate-text-shimmer-slow">
                          {event.name}
                        </h3>
                        <p className="text-vintage-cream/70 text-sm line-clamp-2 animate-fade-in-stagger">
                          {event.description}
                        </p>
                      </div>

                      {/* Event Details */}
                      <div className="space-y-3">
                        {'date' in event && (
                          <div className="flex items-center text-sm text-vintage-cream/70 animate-slide-in-bounce">
                            <Calendar className="w-4 h-4 mr-2 text-vintage-gold animate-float-gentle" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                        )}
                        {'venue' in event && (
                          <div className="flex items-center text-sm text-vintage-cream/70 animate-slide-in-bounce stagger-1">
                            <MapPin className="w-4 h-4 mr-2 text-vintage-orange animate-float-gentle stagger-1" />
                            <span>{event.venue}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Area */}
                      <div className="mt-6 p-4 rounded-lg vintage-gradient text-vintage-brown animate-rotate-in-mega border-2 border-vintage-gold/40 shadow-action-glow">
                        <div className="text-center animate-bounce-complex">
                          <p className="text-sm font-medium mb-2 animate-text-dance">
                            🎸 Partecipa all'evento!
                          </p>
                          <span className="text-xs opacity-80 animate-pulse-soft">
                            Clicca per dettagli →
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-vintage-gold text-vintage-gold hover:bg-vintage-gold hover:text-vintage-brown glow-effect-enhanced animate-pulse-glow -left-16" />
          <CarouselNext className="border-vintage-gold text-vintage-gold hover:bg-vintage-gold hover:text-vintage-brown glow-effect-enhanced animate-pulse-glow -right-16" />
        </Carousel>

        {/* Event Dialog */}
        {selectedEvent && (
          <EventDialog event={selectedEvent}>
            <div />
          </EventDialog>
        )}

        {/* Decorative Elements */}
        <div className="flex justify-center mt-16 space-x-12 opacity-60">
          <div className="text-4xl animate-float-dance">🎪</div>
          <div className="text-4xl animate-float-dance stagger-1">🎸</div>
          <div className="text-4xl animate-float-dance stagger-2">🎤</div>
          <div className="text-4xl animate-float-dance stagger-3">🎭</div>
        </div>
      </div>
    </section>
  );
};

export default EventCarousel;
