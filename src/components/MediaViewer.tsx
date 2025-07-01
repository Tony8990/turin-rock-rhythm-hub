
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Play, Maximize2, Volume2, VolumeX } from "lucide-react";

interface MediaItem {
  id: number;
  type: 'video' | 'photo' | 'event';
  category: 'videos' | 'photos' | 'events';
  title: string;
  thumbnail: string;
  description: string;
  date: string;
  videoUrl?: string;
  fullImageUrl?: string;
}

interface MediaViewerProps {
  item: MediaItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const MediaViewer = ({ item, isOpen, onClose, onNext, onPrevious }: MediaViewerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!item) return null;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isFullscreen ? 'max-w-[100vw] max-h-[100vh] w-full h-full p-0' : 'max-w-4xl max-h-[90vh]'} bg-black text-white border-0`}>
        <div className="relative w-full h-full">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Media content */}
          <div className="w-full h-full flex flex-col">
            {/* Media display area */}
            <div className="flex-1 relative bg-black flex items-center justify-center">
              {item.type === 'video' || (item.type === 'event' && item.videoUrl) ? (
                <div className="relative w-full h-full">
                  <iframe
                    src={item.videoUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={item.title}
                  />
                  
                  {/* Video controls overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePlayPause}
                        className="text-white hover:bg-white/20"
                      >
                        <Play className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleMuteToggle}
                        className="text-white hover:bg-white/20"
                      >
                        {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleFullscreen}
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize2 className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={item.fullImageUrl || '/placeholder.svg'}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Information panel */}
            {!isFullscreen && (
              <div className="p-6 bg-gray-900">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-vintage text-vintage-gold mb-2">
                    {item.title}
                  </DialogTitle>
                  <DialogDescription className="text-gray-300 text-lg">
                    {item.description}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <span className="bg-vintage-teal px-3 py-1 rounded-full text-sm font-medium">
                      {item.type.toUpperCase()}
                    </span>
                    <span className="text-gray-400">{item.date}</span>
                  </div>

                  <div className="flex space-x-2">
                    {onPrevious && (
                      <Button
                        variant="outline"
                        onClick={onPrevious}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Previous
                      </Button>
                    )}
                    {onNext && (
                      <Button
                        variant="outline"
                        onClick={onNext}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>

                {/* Related content suggestions */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-3">More Like This</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
                        <span className="text-2xl">🎬</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation arrows */}
          {(onPrevious || onNext) && (
            <>
              {onPrevious && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                >
                  ←
                </Button>
              )}
              {onNext && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                >
                  →
                </Button>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaViewer;
