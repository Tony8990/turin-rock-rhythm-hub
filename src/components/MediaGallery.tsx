
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Music, Image as ImageIcon, Video, Clock } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import MediaViewer from "./MediaViewer";
import EventDialog from "./EventDialog";

const MediaGallery = () => {
  const { mediaItems, events } = useAppContext();
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Combine media items and events for display
  const allItems = [
    ...mediaItems.map(item => ({ ...item, itemType: 'media' })),
    ...events.map(event => ({ ...event, itemType: 'event' }))
  ];

  const getTypeIcon = (itemType: string, mediaType?: string) => {
    if (itemType === 'event') return Calendar;
    if (mediaType === 'video') return Video;
    if (mediaType === 'photo') return ImageIcon;
    return Music;
  };

  const getTypeColor = (itemType: string, mediaType?: string) => {
    if (itemType === 'event') return 'text-accent';
    if (mediaType === 'video') return 'text-primary';
    if (mediaType === 'photo') return 'text-secondary-foreground';
    return 'text-muted-foreground';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleItemClick = (item: any) => {
    if (item.itemType === 'event') {
      setSelectedEvent(item);
    } else {
      setSelectedMedia(item);
    }
  };

  return (
    <section id="media" className="py-24 px-4 bg-gradient-to-b from-vintage-cream/20 to-vintage-amber/10">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4 text-shadow animate-text-glow">
            Media & Eventi
          </h2>
          <p className="text-xl text-vintage-brown max-w-2xl mx-auto animate-fade-in-delayed">
            Scopri i nostri ultimi video, foto e eventi rockabilly
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allItems.map((item, index) => {
            // Type narrowing for media items
            const isMediaItem = item.itemType === 'media' && 'type' in item;
            const mediaType = isMediaItem ? item.type : undefined;
            const TypeIcon = getTypeIcon(item.itemType, mediaType);
            
            return (
              <Card 
                key={`${item.itemType}-${item.id}`} 
                className={`cursor-pointer card-hover-enhanced rockabilly-card-gradient overflow-hidden animate-scale-in stagger-${Math.min(index % 4 + 1, 4)} hover:animate-bounce-gentle`}
                onClick={() => handleItemClick(item)}
              >
                <CardContent className="p-0">
                  {/* Media/Event Header */}
                  <div className="relative h-48 overflow-hidden">
                    {isMediaItem && (item.videoUrl || item.fullImageUrl) ? (
                      item.type === 'video' ? (
                        <video 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 animate-fade-in"
                          poster={item.thumbnail}
                        >
                          <source src={item.videoUrl} type="video/mp4" />
                        </video>
                      ) : (
                        <img 
                          src={item.fullImageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 animate-zoom-in"
                        />
                      )
                    ) : (
                      // Enhanced placeholder with better colors
                      <div className="w-full h-full vintage-gradient-warm flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-vintage-brown/20 animate-pulse-soft" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(210,105,30,0.3),transparent_70%)] animate-shimmer-slow" />
                        
                        {/* Enhanced Vinyl Record for Events */}
                        {item.itemType === 'event' && (
                          <div className="relative z-10 animate-float-slow">
                            <div className="w-24 h-24 rounded-full vinyl-record-enhanced border-4 border-vintage-gold flex items-center justify-center animate-vinyl-spin-slow hover:animate-vinyl-spin">
                              <div className="w-6 h-6 rounded-full bg-vintage-gold animate-pulse-glow" />
                            </div>
                          </div>
                        )}
                        
                        <div className="relative z-10 text-center animate-bounce-in">
                          <TypeIcon className={`w-12 h-12 mx-auto mb-2 ${getTypeColor(item.itemType, mediaType)} animate-float-gentle`} />
                          <p className="text-vintage-brown font-semibold animate-text-shimmer">
                            {item.itemType === 'event' ? 'Evento Speciale' : 'Media Rockabilly'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Enhanced Type Badge */}
                    <Badge className="absolute top-4 right-4 bg-vintage-gold/90 text-vintage-brown px-3 py-1 animate-glow-pulse-enhanced border-2 border-vintage-cream">
                      {item.itemType === 'event' ? '🎪 Evento' : isMediaItem && item.type === 'video' ? '🎬 Video' : '📸 Foto'}
                    </Badge>
                  </div>

                  {/* Enhanced Content */}
                  <div className="p-6 bg-vintage-cream/5">
                    <h3 className="text-xl font-display font-bold text-vintage-brown mb-2 gradient-text-enhanced animate-text-glow-soft">
                      {item.itemType === 'event' ? item.name : item.title}
                    </h3>
                    <p className="text-vintage-brown/80 text-sm mb-4 line-clamp-2 animate-fade-in-up">
                      {item.description}
                    </p>

                    {/* Event Details with Enhanced Animations */}
                    {item.itemType === 'event' && (
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-vintage-brown/70 animate-slide-in-left">
                          <Calendar className="w-4 h-4 mr-2 text-primary animate-float-gentle" />
                          <span>{formatDate(item.date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-vintage-brown/70 animate-slide-in-left stagger-1">
                          <MapPin className="w-4 h-4 mr-2 text-accent animate-float-gentle stagger-1" />
                          <span>{item.venue}</span>
                        </div>
                        {item.ticketPrice && (
                          <div className="flex items-center text-sm animate-slide-in-left stagger-2">
                            <Clock className="w-4 h-4 mr-2 text-vintage-gold animate-float-gentle stagger-2" />
                            <span className="font-bold text-accent animate-pulse-glow">€{item.ticketPrice}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Enhanced Action Area */}
                    <div className="mt-4 p-3 rounded-lg vintage-gradient-warm text-vintage-brown animate-rotate-in-enhanced border border-vintage-gold/30">
                      <div className="text-center animate-bounce-gentle">
                        <p className="text-sm font-medium animate-text-pulse">
                          {item.itemType === 'event' ? '🎸 Scopri l\'evento' : '🎵 Visualizza media'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Media Viewer Modal */}
        {selectedMedia && (
          <MediaViewer 
            item={selectedMedia}
            isOpen={!!selectedMedia}
            onClose={() => setSelectedMedia(null)}
          />
        )}

        {/* Event Dialog */}
        {selectedEvent && (
          <EventDialog event={selectedEvent}>
            <div />
          </EventDialog>
        )}

        {/* Enhanced Decorative Elements */}
        <div className="flex justify-center mt-16 space-x-8 opacity-70">
          <div className="text-3xl animate-float-bounce">🎸</div>
          <div className="text-3xl animate-float-bounce stagger-1">🎤</div>
          <div className="text-3xl animate-float-bounce stagger-2">🎵</div>
          <div className="text-3xl animate-float-bounce stagger-3">🎭</div>
        </div>
      </div>
    </section>
  );
};

export default MediaGallery;
