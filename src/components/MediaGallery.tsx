
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
    <section id="media" className="py-24 px-4 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4 text-shadow">
            Media & Eventi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scopri i nostri ultimi video, foto e eventi rockabilly
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allItems.map((item, index) => {
            const isEvent = item.itemType === 'event';
            const mediaType = isEvent ? undefined : item.type;
            const TypeIcon = getTypeIcon(item.itemType, mediaType);
            
            return (
              <Card 
                key={`${item.itemType}-${item.id}`} 
                className={`cursor-pointer card-hover rockabilly-card overflow-hidden animate-scale-in stagger-${Math.min(index % 4 + 1, 4)}`}
                onClick={() => handleItemClick(item)}
              >
                <CardContent className="p-0">
                  {/* Media/Event Header */}
                  <div className="relative h-48 overflow-hidden">
                    {!isEvent && (item.videoUrl || item.fullImageUrl) ? (
                      item.type === 'video' ? (
                        <video 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          poster={item.thumbnail}
                        >
                          <source src={item.videoUrl} type="video/mp4" />
                        </video>
                      ) : (
                        <img 
                          src={item.fullImageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )
                    ) : (
                      // Placeholder for events or media without URL
                      <div className="w-full h-full modern-gradient flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
                        
                        {/* Vinyl Record for Events */}
                        {isEvent && (
                          <div className="relative z-10">
                            <div className="w-24 h-24 rounded-full vinyl-record border-4 border-amber-400 flex items-center justify-center animate-vinyl-spin">
                              <div className="w-6 h-6 rounded-full bg-amber-400" />
                            </div>
                          </div>
                        )}
                        
                        <div className="relative z-10 text-center">
                          <TypeIcon className={`w-12 h-12 mx-auto mb-2 ${getTypeColor(item.itemType, mediaType)} animate-float`} />
                          <p className="text-primary-foreground font-semibold">
                            {isEvent ? 'Evento Speciale' : 'Media Rockabilly'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Type Badge */}
                    <Badge className="absolute top-4 right-4 bg-accent/90 text-accent-foreground animate-glow-pulse">
                      {isEvent ? '🎪 Evento' : item.type === 'video' ? '🎬 Video' : '📸 Foto'}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-foreground mb-2 gradient-text">
                      {isEvent ? item.name : item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Event Details */}
                    {isEvent && (
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2 text-primary animate-float" />
                          <span>{formatDate(item.date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2 text-accent animate-float stagger-1" />
                          <span>{item.venue}</span>
                        </div>
                        {item.ticketPrice && (
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2 text-secondary-foreground animate-float stagger-2" />
                            <span className="font-bold text-accent">€{item.ticketPrice}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Area */}
                    <div className="mt-4 p-3 rounded-lg modern-gradient text-primary-foreground animate-rotate-in">
                      <div className="text-center">
                        <p className="text-sm font-medium">
                          {isEvent ? '🎸 Scopri l\'evento' : '🎵 Visualizza media'}
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

        {/* Decorative Elements */}
        <div className="flex justify-center mt-16 space-x-8 opacity-60">
          <div className="text-3xl animate-float">🎸</div>
          <div className="text-3xl animate-float stagger-1">🎤</div>
          <div className="text-3xl animate-float stagger-2">🎵</div>
          <div className="text-3xl animate-float stagger-3">🎭</div>
        </div>
      </div>
    </section>
  );
};

export default MediaGallery;
