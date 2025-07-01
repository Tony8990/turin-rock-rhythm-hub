
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Heart } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-500" }
  ];

  const quickLinks = [
    { label: "Corsi", href: "#carousel" },
    { label: "Galleria", href: "#gallery" },
    { label: "Newsletter", href: "#newsletter" },
    { label: "Chi Siamo", href: "#home" }
  ];

  const contactInfo = [
    { icon: MapPin, text: "Via del Ballo 123, Torino, Italia" },
    { icon: Phone, text: "+39 011 123 4567" },
    { icon: Mail, text: "info@rockinturin.it" }
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 modern-gradient opacity-90"></div>
      <div className="absolute inset-0 bg-background/80"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/10 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-accent/10 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-primary/5 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 animate-slide-up">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/lovable-uploads/986644e8-1ad8-4f4b-9d46-7b0a331c0781.png" 
                  alt="Rock in Turin Logo" 
                  className="w-12 h-12 rounded-full animate-glow-pulse"
                />
                <div>
                  <h3 className="text-2xl font-display font-bold gradient-text">
                    Rock in Turin
                  </h3>
                  <p className="text-muted-foreground text-sm">Scuola di Ballo</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                La passione per il ballo rockabilly e swing nel cuore di Torino. 
                Unisciti alla nostra comunità e lascia che il ritmo muova la tua anima.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={social.label}
                      variant="outline"
                      size="icon"
                      className={`backdrop-blur-glass border-primary/20 hover:border-primary/50 ${social.color} transition-all duration-300 hover:scale-110 animate-scale-in stagger-${index + 1}`}
                      asChild
                    >
                      <a href={social.href} aria-label={social.label}>
                        <Icon className="w-5 h-5" />
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="animate-slide-up stagger-1">
              <h4 className="text-lg font-display font-semibold mb-6 gradient-text">
                Link Rapidi
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className={`text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2 block animate-fade-in-up stagger-${index + 1}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="animate-slide-up stagger-2">
              <h4 className="text-lg font-display font-semibold mb-6 gradient-text">
                Contattaci
              </h4>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div 
                      key={index}
                      className={`flex items-start space-x-3 text-muted-foreground animate-fade-in-up stagger-${index + 1}`}
                    >
                      <Icon className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{info.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="animate-slide-up stagger-3">
              <h4 className="text-lg font-display font-semibold mb-6 gradient-text">
                Resta Aggiornato
              </h4>
              <Card className="backdrop-blur-glass border-primary/20">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Iscriviti alla nostra newsletter per ricevere aggiornamenti sui corsi e eventi speciali.
                  </p>
                  <Button 
                    className="w-full modern-gradient hover:scale-105 transition-all duration-300 font-medium"
                    asChild
                  >
                    <a href="#newsletter">
                      <Mail className="w-4 h-4 mr-2" />
                      Iscriviti Ora
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-primary/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground animate-fade-in-up">
                <p className="flex items-center">
                  © 2024 Rock in Turin. Tutti i diritti riservati. Fatto con{" "}
                  <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" />{" "}
                  a Torino.
                </p>
              </div>
              <div className="flex space-x-6 text-sm animate-fade-in-up stagger-1">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Termini di Servizio
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
