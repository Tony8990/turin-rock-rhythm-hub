
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Ticket, Users, Star, Music } from "lucide-react";

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  venue: string;
  ticketPrice?: number;
  imageUrl?: string;
}

interface EventDialogProps {
  event: Event;
  children: React.ReactNode;
}

const EventDialog = ({ event, children }: EventDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl rockabilly-card border-primary/30 text-foreground">
        <DialogHeader className="space-y-4">
          {/* Event Header with Rockabilly Style */}
          <div className="relative overflow-hidden rounded-lg modern-gradient p-8">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
            
            {/* Vinyl Records Decoration */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full vinyl-record opacity-30 animate-vinyl-spin"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full vinyl-record opacity-20 animate-vinyl-spin" style={{animationDelay: '1s'}}></div>
            
            <div className="relative">
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30 animate-glow-pulse">
                🎪 Evento Rockabilly Speciale
              </Badge>
              <DialogTitle className="text-3xl font-display gradient-text text-shadow mb-2 animate-slide-up">
                {event.name}
              </DialogTitle>
              <p className="text-lg text-primary-foreground/90 animate-slide-up stagger-1">
                {event.description}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 animate-fade-in-up stagger-2">
          {/* Event Details Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 rounded-lg rockabilly-card border border-primary/20 hover:border-primary/40 transition-colors duration-300">
                <Calendar className="w-5 h-5 text-primary animate-float" />
                <div>
                  <p className="text-sm text-muted-foreground">Data dell'Evento</p>
                  <p className="font-semibold text-foreground">{formatDate(event.date)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-lg rockabilly-card border border-primary/20 hover:border-primary/40 transition-colors duration-300">
                <MapPin className="w-5 h-5 text-primary animate-float stagger-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold text-foreground">{event.venue}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {event.ticketPrice && (
                <div className="flex items-center space-x-3 p-4 rounded-lg rockabilly-card border border-accent/20 hover:border-accent/40 transition-colors duration-300">
                  <Ticket className="w-5 h-5 text-accent animate-float stagger-2" />
                  <div>
                    <p className="text-sm text-muted-foreground">Prezzo Biglietto</p>
                    <p className="font-bold text-accent text-lg">€{event.ticketPrice}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-3 p-4 rounded-lg rockabilly-card border border-secondary/20 hover:border-secondary/40 transition-colors duration-300">
                <Users className="w-5 h-5 text-secondary-foreground animate-float stagger-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Disponibilità</p>
                  <p className="font-semibold text-foreground">Posti Limitati!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Highlights */}
          <div className="p-6 rounded-lg modern-gradient text-primary-foreground animate-rotate-in">
            <h3 className="text-xl font-display font-bold mb-4 text-shadow flex items-center">
              <Star className="w-6 h-6 mr-2 animate-float" />
              Cosa Ti Aspetta
            </h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center">
                <Music className="w-4 h-4 mr-3 animate-glow-pulse" />
                Live band rockabilly e swing
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 mr-3 text-center animate-glow-pulse stagger-1">🕺</span>
                Esibizioni di ballo professionali
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 mr-3 text-center animate-glow-pulse stagger-2">🎓</span>
                Lezioni gratuite per principianti
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 mr-3 text-center animate-glow-pulse stagger-3">👗</span>
                Dress code vintage consigliato
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 mr-3 text-center animate-glow-pulse">🍸</span>
                Cocktail e bevande a tema
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 mr-3 text-center animate-glow-pulse stagger-1">📸</span>
                Photo booth vintage
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              size="lg" 
              className="flex-1 modern-gradient text-primary-foreground hover:scale-105 transition-transform duration-300 font-display font-semibold text-lg glow-effect"
            >
              <Ticket className="w-5 h-5 mr-2" />
              Prenota Ora
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Chiudi
            </Button>
          </div>

          {/* Footer Note */}
          <div className="text-center p-4 rounded-lg rockabilly-card border border-border/20">
            <p className="text-sm text-muted-foreground flex items-center justify-center">
              🎸 <strong className="mx-2 gradient-text">Rock in Turin</strong> - Dove il vintage incontra la modernità
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
