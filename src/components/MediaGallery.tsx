
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, Play, Image as ImageIcon, Calendar } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import MediaViewer from "./MediaViewer";

const MediaGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { mediaItems } = useAppContext();

  const filters = [
    { id: 'all', label: 'All Media', icon: Filter },
    { id: 'photos', label: 'Photos', icon: ImageIcon },
    { id: 'videos', label: 'Videos', icon: Play },
    { id: 'events', label: 'Events', icon: Calendar }
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
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-vintage font-bold text-vintage-teal mb-4">
            Media Gallery
          </h2>
          <p className="text-xl text-vintage-teal/70 max-w-2xl mx-auto">
            Explore our collection of dance videos, photos, and event highlights
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className={`${
                  activeFilter === filter.id
                    ? 'vintage-gradient text-vintage-cream'
                    : 'border-vintage-teal text-vintage-teal hover:bg-vintage-teal hover:text-vintage-cream'
                } transition-all`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {filter.label}
              </Button>
            );
          })}
        </div>

        {/* Media Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="dance-card-hover border-vintage-teal/20 overflow-hidden animate-fade-in-up cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleMediaClick(item)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  {/* Thumbnail */}
                  <div className="h-48 bg-gradient-to-br from-vintage-teal to-vintage-teal-light flex items-center justify-center text-6xl relative overflow-hidden">
                    {item.type === 'photo' && item.fullImageUrl ? (
                      <img 
                        src={item.fullImageUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl">{item.thumbnail}</span>
                    )}
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button 
                        size="icon" 
                        className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white border-0"
                      >
                        <Play className="w-8 h-8" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Type badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-vintage-gold text-vintage-charcoal px-2 py-1 rounded-full text-xs font-medium">
                      {item.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-vintage font-bold text-vintage-teal mb-2">
                    {item.title}
                  </h3>
                  <p className="text-vintage-teal/70 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-vintage-teal/50">
                      {item.date}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-vintage-teal text-vintage-teal hover:bg-vintage-teal hover:text-vintage-cream"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMediaClick(item);
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="vintage-gradient text-vintage-cream hover:scale-105 transition-transform"
          >
            Load More Media
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
