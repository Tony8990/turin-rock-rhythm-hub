
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Music, Users, Calendar, Mail, Settings } from "lucide-react";

interface NavigationProps {
  onAdminToggle: () => void;
  showAdmin: boolean;
}

const Navigation = ({ onAdminToggle, showAdmin }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 vintage-gradient backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/986644e8-1ad8-4f4b-9d46-7b0a331c0781.png" 
              alt="Rock in Turin Logo" 
              className="w-12 h-12 rounded-full animate-swing"
            />
            <div>
              <h1 className="text-2xl font-vintage font-bold text-vintage-cream">
                Rock in Turin
              </h1>
              <p className="text-vintage-cream/80 text-sm">Dance School</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-vintage-cream hover:text-vintage-gold transition-colors flex items-center space-x-1">
              <Music className="w-4 h-4" />
              <span>Home</span>
            </a>
            <a href="#carousel" className="text-vintage-cream hover:text-vintage-gold transition-colors flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Classes</span>
            </a>
            <a href="#gallery" className="text-vintage-cream hover:text-vintage-gold transition-colors flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Gallery</span>
            </a>
            <a href="#newsletter" className="text-vintage-cream hover:text-vintage-gold transition-colors flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>Newsletter</span>
            </a>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onAdminToggle}
              className="border-vintage-cream text-vintage-cream hover:bg-vintage-cream hover:text-vintage-teal"
            >
              <Settings className="w-4 h-4 mr-1" />
              {showAdmin ? 'Public View' : 'Admin'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-vintage-cream hover:text-vintage-gold transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className={`w-full h-0.5 bg-current transition-transform ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`w-full h-0.5 bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
              <div className={`w-full h-0.5 bg-current transition-transform ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in-up">
            <div className="flex flex-col space-y-3">
              <a href="#home" className="text-vintage-cream hover:text-vintage-gold transition-colors flex items-center space-x-2">
                <Music className="w-4 h-4" />
                <span>Home</span>
              </a>
              <a href="#carousel" className="text-vintage-cream hover:text-vintage-gold transition-colors flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Classes</span>
              </a>
              <a href="#gallery" className="text-vintage-cream hover:text-vintage-gold transition-colors flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Gallery</span>
              </a>
              <a href="#newsletter" className="text-vintage-cream hover:text-vintage-gold transition-colors flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Newsletter</span>
              </a>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onAdminToggle}
                className="border-vintage-cream text-vintage-cream hover:bg-vintage-cream hover:text-vintage-teal w-fit"
              >
                <Settings className="w-4 h-4 mr-1" />
                {showAdmin ? 'Public View' : 'Admin'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
