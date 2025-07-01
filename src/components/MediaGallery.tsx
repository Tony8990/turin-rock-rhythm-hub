
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, Play, Image as ImageIcon, Calendar, Sparkles } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import MediaViewer from "./MediaViewer";

const MediaGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { mediaItems } = useAppContext();

  const filters = [
    { id: 'all', label: 'Tutti i Media', icon: Filter },
    { id: 'photos', label: 'Foto', icon: ImageIcon },
    { id: 'videos', label: 'Video', icon: Play },
    { id: 'events', label: 'Eventi', icon: Calendar }
  ];

  const filteredItems = activeFilter === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === activeFilter);

  const handleMediaClick = (item: any) => {
    setSelectedMedia(item);
    setIsViewerOpen(true);
  };

  const handleNext = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedMedia?.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedMedia(filteredItems[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedMedia?.id);
    const previousIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
    setSelectedMedia(filteredItems[previousIndex]);
  };

  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-background"></div>
      <div className="absolute top-32 left-16 w-40 h-40 rounded-full bg-primary/5 animate-float"></div>
      <div className="absolute bottom-20 right-12 w-28 h-28 rounded-full bg-accent/5 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              La Nostra Galleria
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black gradient-text mb-6">
            Galleria Media
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Esplora la nostra collezione di video di ballo, foto e momenti salienti degli eventi
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up stagger-1">
          {filters.map((filter, index) => {
            const Icon = filter.icon;
            return (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className={`${
                  activeFilter === filter.id
                    ? 'modern-gradient text-background hover:scale-105 glow-effect'
                    : 'backdrop-blur-glass border-primary/30 hover:border-primary hover:bg-primary/20'
                } transition-all duration-300 px-6 py-3 h-auto font-medium animate-scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className="w-5 h-5 mr-2" />
                {filter.label}
              </Button>
            );
          })}
        </div>

        {/* Media Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="card-hover backdrop-blur-glass border-primary/20 overflow-hidden animate-scale-in cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleMediaClick(item)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  {/* Thumbnail */}
                  <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl relative overflow-hidden">
                    {item.type === 'photo' && item.fullImageUrl ? (
                      <img 
                        src={item.fullImageUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-6xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {item.thumbnail}
                      </span>
                    )}
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <Button 
                        size="icon" 
                        className="w-16 h-16 rounded-full backdrop-blur-sm bg-white/20 hover:bg-white/30 text-white border-0 hover:scale-110 transition-all duration-300"
                      >
                        <Play className="w-8 h-8" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Type badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-background px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                      {item.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 backdrop-blur-glass">
                  <h3 className="text-xl font-display font-bold gradient-text mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-medium">
                      {item.date}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-primary/30 text-primary hover:bg-primary hover:text-background transition-all duration-300 hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMediaClick(item);
                      }}
                    >
                      Visualizza
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center animate-fade-in-up">
          <Button 
            size="lg"
            className="modern-gradient hover:scale-105 transition-all duration-300 glow-effect px-8 py-4 h-auto font-semibold"
          >
            Carica Altri Media
          </Button>
        </div>
      </div>

      {/* Media Viewer */}
      <MediaViewer
        item={selectedMedia}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        onNext={filteredItems.length > 1 ? handleNext : undefined}
        onPrevious={filteredItems.length > 1 ? handlePrevious : undefined}
      />
    </section>
  );
};

export default MediaGallery;
