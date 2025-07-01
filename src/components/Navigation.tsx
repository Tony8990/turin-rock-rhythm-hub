
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Music, Users, Calendar, Mail, Settings, Menu, X } from "lucide-react";

interface NavigationProps {
  onAdminToggle: () => void;
  showAdmin: boolean;
}

const Navigation = ({ onAdminToggle, showAdmin }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-glass border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 animate-fade-in-up">
            <img 
              src="/lovable-uploads/986644e8-1ad8-4f4b-9d46-7b0a331c0781.png" 
              alt="Rock in Turin Logo" 
              className="w-12 h-12 rounded-full animate-glow-pulse"
            />
            <div>
              <h1 className="text-2xl font-display font-black gradient-text">
                Rock in Turin
              </h1>
              <p className="text-muted-foreground text-sm font-medium">Scuola di Ballo</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 animate-fade-in-up stagger-1">
            <a href="#home" className="text-foreground hover:text-primary transition-all duration-300 flex items-center space-x-2 font-medium hover:scale-105">
              <Music className="w-4 h-4" />
              <span>Home</span>
            </a>
            <a href="#carousel" className="text-foreground hover:text-primary transition-all duration-300 flex items-center space-x-2 font-medium hover:scale-105">
              <Users className="w-4 h-4" />
              <span>Corsi</span>
            </a>
            <a href="#gallery" className="text-foreground hover:text-primary transition-all duration-300 flex items-center space-x-2 font-medium hover:scale-105">
              <Calendar className="w-4 h-4" />
              <span>Galleria</span>
            </a>
            <a href="#newsletter" className="text-foreground hover:text-primary transition-all duration-300 flex items-center space-x-2 font-medium hover:scale-105">
              <Mail className="w-4 h-4" />
              <span>Newsletter</span>
            </a>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onAdminToggle}
              className="backdrop-blur-glass border-primary/30 hover:border-primary hover:bg-primary/20 transition-all duration-300 hover:scale-105 font-medium"
            >
              <Settings className="w-4 h-4 mr-2" />
              {showAdmin ? 'Vista Pubblica' : 'Admin'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-6 pb-6 animate-fade-in-up backdrop-blur-glass rounded-xl border border-primary/20 p-4">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-foreground hover:text-primary transition-colors flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/10 font-medium">
                <Music className="w-5 h-5" />
                <span>Home</span>
              </a>
              <a href="#carousel" className="text-foreground hover:text-primary transition-colors flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/10 font-medium">
                <Users className="w-5 h-5" />
                <span>Corsi</span>
              </a>
              <a href="#gallery" className="text-foreground hover:text-primary transition-colors flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/10 font-medium">
                <Calendar className="w-5 h-5" />
                <span>Galleria</span>
              </a>
              <a href="#newsletter" className="text-foreground hover:text-primary transition-colors flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/10 font-medium">
                <Mail className="w-5 h-5" />
                <span>Newsletter</span>
              </a>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onAdminToggle}
                className="backdrop-blur-glass border-primary/30 hover:border-primary hover:bg-primary/20 w-fit font-medium"
              >
                <Settings className="w-4 h-4 mr-2" />
                {showAdmin ? 'Vista Pubblica' : 'Admin'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
