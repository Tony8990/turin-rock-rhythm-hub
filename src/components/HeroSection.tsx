
import { Button } from "@/components/ui/button";
import { Play, Calendar, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="pt-24 pb-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-in-left">
            <h1 className="text-5xl md:text-7xl font-vintage font-bold mb-6">
              <span className="vintage-text-gradient">Rock</span>{" "}
              <span className="text-vintage-teal">the</span>{" "}
              <span className="vintage-text-gradient">Night</span>
            </h1>
            <p className="text-xl text-vintage-teal/80 mb-8 leading-relaxed">
              Experience the magic of rockabilly and swing dancing in the heart of Turin. 
              Join our passionate community and let the rhythm move your soul.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="vintage-gradient text-vintage-cream hover:scale-105 transition-transform retro-shadow"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Our Classes
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-vintage-teal text-vintage-teal hover:bg-vintage-teal hover:text-vintage-cream transition-all"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book a Class
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-vintage font-bold text-vintage-teal mb-1">500+</div>
                <div className="text-sm text-vintage-teal/70">Happy Dancers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-vintage font-bold text-vintage-teal mb-1">12</div>
                <div className="text-sm text-vintage-teal/70">Years Teaching</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-vintage font-bold text-vintage-teal mb-1">25+</div>
                <div className="text-sm text-vintage-teal/70">Weekly Classes</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="animate-slide-in-right">
            <div className="relative">
              <div className="vintage-gradient rounded-2xl p-8 retro-shadow animate-bounce-subtle">
                <div className="bg-vintage-cream rounded-xl p-8 text-center">
                  <Users className="w-24 h-24 text-vintage-teal mx-auto mb-4" />
                  <h3 className="text-2xl font-vintage font-bold text-vintage-teal mb-4">
                    Join Our Dance Family
                  </h3>
                  <p className="text-vintage-teal/80 mb-6">
                    From beginners to advanced dancers, we welcome everyone to experience 
                    the joy of rockabilly and swing dancing.
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-vintage-gold">
                    <div className="w-3 h-3 rounded-full bg-vintage-gold animate-bounce" />
                    <div className="w-3 h-3 rounded-full bg-vintage-gold animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-3 h-3 rounded-full bg-vintage-gold animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
