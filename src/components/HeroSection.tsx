
import { Button } from "@/components/ui/button";
import { Play, Calendar, Users, Sparkles } from "lucide-react";
import CourseSubscriptionForm from "./CourseSubscriptionForm";

const HeroSection = () => {
  return (
    <section id="home" className="pt-24 pb-16 min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 animate-float"></div>
      <div className="absolute bottom-32 right-16 w-48 h-48 rounded-full bg-accent/5 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-primary/3 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-in-left">
            <div className="flex items-center space-x-2 mb-6 animate-fade-in-up">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              <span className="text-primary font-medium text-sm tracking-wider uppercase">
                Benvenuti nella Danza
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-display font-black mb-6 leading-none">
              <span className="gradient-text animate-slide-up">Rock</span>{" "}
              <span className="text-foreground animate-slide-up stagger-1">the</span>{" "}
              <br />
              <span className="gradient-text animate-slide-up stagger-2">Night</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl animate-fade-in-up stagger-1">
              Vivi la magia del rockabilly e dello swing nel cuore di Torino. 
              Unisciti alla nostra comunità appassionata e lascia che il ritmo muova la tua anima.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up stagger-2">
              <Button 
                size="lg" 
                className="modern-gradient hover:scale-105 transition-all duration-300 glow-effect text-lg px-8 py-4 h-auto font-semibold"
              >
                <Play className="mr-3 h-6 w-6" />
                Guarda le Nostre Lezioni
              </Button>
              <CourseSubscriptionForm />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 animate-fade-in-up stagger-3">
              <div className="text-center group">
                <div className="text-4xl font-display font-black gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                  500+
                </div>
                <div className="text-sm text-muted-foreground font-medium">Ballerini Felici</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-display font-black gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                  12
                </div>
                <div className="text-sm text-muted-foreground font-medium">Anni di Esperienza</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-display font-black gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                  25+
                </div>
                <div className="text-sm text-muted-foreground font-medium">Lezioni Settimanali</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="animate-slide-in-right">
            <div className="relative">
              <div className="backdrop-blur-glass rounded-3xl p-8 glow-effect animate-rotate-in">
                <div className="bg-card/80 rounded-2xl p-8 text-center backdrop-blur-glass border border-primary/20">
                  <div className="w-24 h-24 modern-gradient rounded-full flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
                    <Users className="w-12 h-12 text-background" />
                  </div>
                  <h3 className="text-3xl font-display font-bold gradient-text mb-4">
                    Unisciti alla Famiglia
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Da principianti a ballerini avanzati, accogliamo tutti per vivere 
                    la gioia del ballo rockabilly e swing.
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    <div className="w-3 h-3 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
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
