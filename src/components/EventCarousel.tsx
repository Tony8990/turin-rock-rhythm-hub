
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, MapPin, Ticket, Star, Music } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import EventDialog from "./EventDialog";
import { useState } from "react";

const EventCarousel = () => {
  const { events, courses } = useAppContext();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Combine events and courses for the carousel
  const allItems = [
    ...events.map(event => ({ ...event, itemType: 'event' })),
    ...courses.map(course => ({ ...course, itemType: 'course' }))
  ];

  const getItemIcon = (itemType: string, name: string) => {
    if (itemType === 'event') return '🎪';
    if (name.toLowerCase().includes('rockabilly')) return '🎸';
    if (name.toLowerCase().includes('swing')) return '💃';
    if (name.toLowerCase().includes('lindy')) return '🕺';
    if (name.toLowerCase().includes('charleston')) return '🎭';
    return '🎵';
  };

  const getItemGradient = (itemType: string, index: number) => {
    if (itemType === 'event') {
      const eventGradients = [
        'linear-gradient(135deg, #8B4513 0%, #CD853F 50%, #DEB887 100%)',
        'linear-gradient(135deg, #B8860B 0%, #DAA520 50%, #F4A460 100%)',
        'linear-gradient(135deg, #A0522D 0%, #D2691E 50%, #F4A460 100%)'
      ];
      return eventGradients[index % eventGradients.length];
    } else {
      const courseGradients = [
        'linear-gradient(135deg, #B22222 0%, #DC143C 50%, #FF6347 100%)',
        'linear-gradient(135deg, #800080 0%, #9370DB 50%, #DDA0DD 100%)',
        'linear-gradient(135deg, #2F4F4F 0%, #708090 50%, #B0C4DE 100%)'
      ];
      return courseGradients[index % courseGradients.length];
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-vintage-cream/10 to-vintage-amber/20">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-up-bouncy">
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text-enhanced mb-4 text-shadow-strong animate-text-glow-rainbow">
            Eventi & Corsi Rockabilly
          </h2>
          <p className="text-xl text-vintage-brown max-w-2xl mx-auto animate-fade-in-wave">
            Vivi l'esperienza completa del rockabilly con i nostri eventi esclusivi e corsi professionali
          </p>
        </div>

        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {allItems.map((item, index) => (
              <CarouselItem key={`${item.itemType}-${item.id}`} className={`md:basis-1/2 lg:basis-1/3 animate-scale-in-bouncy stagger-${Math.min(index + 1, 4)}`}>
                <Card 
                  className="cursor-pointer card-hover-mega backdrop-blur-glass-enhanced border-vintage-gold/30 hover:border-vintage-gold/60 transition-all duration-700 group overflow-hidden shadow-vintage-glow"
                  onClick={() => item.itemType === 'event' && setSelectedEvent(item)}
                >
                  <CardContent className="p-0">
                    {/* Enhanced Header with Complex Animations */}
                    <div 
                      className="relative h-56 flex items-center justify-center overflow-hidden"
                      style={{ background: getItemGradient(item.itemType, index) }}
                    >
                      <div className="absolute inset-0 bg-vintage-brown/10 group-hover:bg-vintage-brown/5 transition-colors duration-700" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(210,105,30,0.2),transparent_70%)] animate-pulse-waves" />
                      
                      {/* Animated Vinyl Record */}
                      <div className="relative z-10 animate-float-complex">
                        <div className="w-28 h-28 rounded-full vinyl-record-premium border-4 border-vintage-gold flex items-center justify-center group-hover:animate-vinyl-spin-fast transition-all duration-1000 shadow-vinyl-glow">
                          <div className="w-8 h-8 rounded-full bg-vintage-gold animate-pulse-rainbow" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl animate-float-rotate">
                          {getItemIcon(item.itemType, item.name)}
                        </div>
                      </div>

                      {/* Floating Musical Notes */}
                      <div className="absolute top-4 left-4 animate-float-notes">
                        <Music className="w-6 h-6 text-vintage-gold opacity-60 animate-spin-slow" />
                      </div>
                      <div className="absolute top-8 right-8 animate-float-notes stagger-2">
                        <Star className="w-5 h-5 text-vintage-cream opacity-50 animate-twinkle" />
                      </div>

                      {/* Enhanced Price/Type Badge */}
                      <div className="absolute top-4 right-4 bg-vintage-gold text-vintage-brown px-4 py-2 rounded-full font-bold text-sm animate-glow-pulse-rainbow border-2 border-vintage-cream shadow-badge-glow">
                        {item.itemType === 'event' ? (
                          'ticketPrice' in item && item.ticketPrice ? `€${item.ticketPrice}` : '🎪 EVENTO'
                        ) : (
                          'price' in item && item.price ? `€${item.price}` : '🎵 CORSO'
                        )}
                      </div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="p-6 bg-gradient-to-b from-vintage-cream/5 to-vintage-amber/10">
                      <div className="mb-4">
                        <h3 className="text-xl font-display font-bold text-vintage-brown mb-2 group-hover:gradient-text-enhanced transition-all duration-500 animate-text-shimmer-slow">
                          {item.name}
                        </h3>
                        <p className="text-vintage-brown/70 text-sm line-clamp-2 animate-fade-in-stagger">
                          {item.description}
                        </p>
                      </div>

                      {/* Enhanced Details */}
                      <div className="space-y-3">
                        {item.itemType === 'event' ? (
                          <>
                            {'date' in item && (
                              <div className="flex items-center text-sm text-vintage-brown/70 animate-slide-in-bounce">
                                <Calendar className="w-4 h-4 mr-2 text-primary animate-float-gentle" />
                                <span>{formatDate(item.date)}</span>
                              </div>
                            )}
                            {'venue' in item && (
                              <div className="flex items-center text-sm text-vintage-brown/70 animate-slide-in-bounce stagger-1">
                                <MapPin className="w-4 h-4 mr-2 text-accent animate-float-gentle stagger-1" />
                                <span>{item.venue}</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {'time' in item && (
                              <div className="flex items-center text-sm text-vintage-brown/70 animate-slide-in-bounce">
                                <Calendar className="w-4 h-4 mr-2 text-primary animate-float-gentle" />
                                <span>{item.time}</span>
                              </div>
                            )}
                            {'location' in item && (
                              <div className="flex items-center text-sm text-vintage-brown/70 animate-slide-in-bounce stagger-1">
                                <MapPin className="w-4 h-4 mr-2 text-accent animate-float-gentle stagger-1" />
                                <span>{item.location}</span>
                              </div>
                            )}
                            {'instructor' in item && item.instructor && (
                              <div className="flex items-center text-sm text-vintage-brown/70 animate-slide-in-bounce stagger-2">
                                <Star className="w-4 h-4 mr-2 text-vintage-gold animate-twinkle" />
                                <span>Istruttore: {item.instructor}</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {/* Mega Enhanced Action Area */}
                      <div className="mt-6 p-4 rounded-lg vintage-gradient-premium text-vintage-brown animate-rotate-in-mega border-2 border-vintage-gold/40 shadow-action-glow">
                        <div className="text-center animate-bounce-complex">
                          <p className="text-sm font-medium mb-2 animate-text-dance">
                            {item.itemType === 'event' ? '🎸 Partecipa all\'evento!' : '💃 Inizia a ballare!'}
                          </p>
                          <span className="text-xs opacity-80 animate-pulse-soft">
                            {item.itemType === 'event' ? 'Clicca per dettagli →' : 'Prenota il tuo posto →'}
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

        {/* Enhanced Decorative Elements */}
        <div className="flex justify-center mt-16 space-x-12 opacity-60">
          <div className="text-4xl animate-float-dance">🎸</div>
          <div className="text-4xl animate-float-dance stagger-1">🎵</div>
          <div className="text-4xl animate-float-dance stagger-2">🎤</div>
          <div className="text-4xl animate-float-dance stagger-3">🎭</div>
          <div className="text-4xl animate-float-dance stagger-4">💃</div>
        </div>
      </div>
    </section>
  );
};

export default EventCarousel;
