
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle, Calendar, Star, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      toast({
        title: "Benvenuto in Rock in Turin!",
        description: "Ti sei iscritto con successo alla nostra newsletter. Preparati per gli aggiornamenti di ballo!",
      });
      setEmail("");
    }, 1500);
  };

  const newsletters = [
    {
      id: 1,
      title: "Highlights di Marzo",
      date: "Marzo 2024",
      preview: "Scopri i nostri ultimi orari delle lezioni, eventi in arrivo e storie degli studenti...",
      topics: ["Nuove Lezioni", "Storie degli Studenti", "Eventi in Arrivo"]
    },
    {
      id: 2,
      title: "Anteprima Stagione Festival",
      date: "Febbraio 2024",
      preview: "Preparati per i festival di ballo primaverili e le competizioni in tutta Italia...",
      topics: ["Guida Festival", "Consigli Competizione", "Info Viaggio"]
    },
    {
      id: 3,
      title: "Guida Stile Vintage",
      date: "Gennaio 2024",
      preview: "Come vestirsi per eventi di ballo rockabilly e swing...",
      topics: ["Consigli Moda", "Guida Scarpe", "Trucco e Capelli"]
    }
  ];

  return (
    <section id="newsletter" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-card/50 to-background"></div>
      <div className="absolute top-16 left-20 w-48 h-48 rounded-full bg-primary/5 animate-float"></div>
      <div className="absolute bottom-32 right-16 w-36 h-36 rounded-full bg-accent/5 animate-float" style={{ animationDelay: '1.5s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              <span className="text-primary font-medium text-sm tracking-wider uppercase">
                Resta Connesso
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-display font-black gradient-text mb-6">
              Newsletter
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ricevi le ultime notizie di ballo, orari delle lezioni e inviti esclusivi agli eventi
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Newsletter Signup */}
            <div className="animate-slide-in-left">
              <Card className="backdrop-blur-glass border-primary/20 glow-effect">
                <CardContent className="p-8">
                  {!isSubscribed ? (
                    <>
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 modern-gradient rounded-full flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
                          <Mail className="w-10 h-10 text-background" />
                        </div>
                        <h3 className="text-3xl font-display font-bold gradient-text mb-3">
                          Unisciti alla Newsletter
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Sii il primo a sapere di nuove lezioni, eventi e consigli di ballo
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <Input
                            type="email"
                            placeholder="Inserisci il tuo indirizzo email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="backdrop-blur-glass border-primary/30 focus:border-primary h-14 text-lg px-6"
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full h-14 modern-gradient hover:scale-105 transition-all duration-300 font-semibold text-lg glow-effect"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-background mr-3"></div>
                              Iscrizione in corso...
                            </div>
                          ) : (
                            <>
                              <Mail className="w-5 h-5 mr-3" />
                              Iscriviti Ora
                            </>
                          )}
                        </Button>
                      </form>

                      <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                          Nessuno spam
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                          Cancellati quando vuoi
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center animate-scale-in">
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-3xl font-display font-bold gradient-text mb-3">
                        Benvenuto nella Famiglia!
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        Ora sei iscritto alla nostra newsletter. Controlla la tua email per il messaggio di benvenuto!
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => setIsSubscribed(false)}
                        className="border-primary/30 text-primary hover:bg-primary hover:text-background transition-all duration-300 hover:scale-105"
                      >
                        Iscriviti con un'altra Email
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Past Newsletters Preview */}
            <div className="animate-slide-in-right">
              <div className="flex items-center space-x-3 mb-8">
                <Star className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-display font-bold gradient-text">
                  Newsletter Precedenti
                </h3>
              </div>
              <div className="space-y-6">
                {newsletters.map((newsletter, index) => (
                  <Card 
                    key={newsletter.id} 
                    className="backdrop-blur-glass border-primary/20 hover:shadow-lg transition-all duration-500 card-hover animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-lg font-display font-bold gradient-text">
                          {newsletter.title}
                        </h4>
                        <span className="text-sm text-muted-foreground flex items-center backdrop-blur-glass bg-primary/10 px-3 py-1 rounded-full">
                          <Calendar className="w-3 h-3 mr-1" />
                          {newsletter.date}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {newsletter.preview}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {newsletter.topics.map((topic, idx) => (
                          <span 
                            key={idx}
                            className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-primary/30 text-primary hover:bg-primary hover:text-background transition-all duration-300 hover:scale-105 font-medium"
                      >
                        Leggi di Più
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
