
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle, Calendar, Star } from "lucide-react";
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
        title: "Welcome to Rock in Turin!",
        description: "You've successfully joined our newsletter. Get ready for dance updates!",
      });
      setEmail("");
    }, 1500);
  };

  const newsletters = [
    {
      id: 1,
      title: "March Dance Highlights",
      date: "March 2024",
      preview: "Check out our latest class schedules, upcoming events, and student spotlights...",
      topics: ["New Classes", "Student Spotlights", "Upcoming Events"]
    },
    {
      id: 2,
      title: "Festival Season Preview",
      date: "February 2024",
      preview: "Get ready for spring dance festivals and competitions across Italy...",
      topics: ["Festival Guide", "Competition Tips", "Travel Info"]
    },
    {
      id: 3,
      title: "Vintage Style Guide",
      date: "January 2024",
      preview: "How to dress for rockabilly and swing dancing events...",
      topics: ["Fashion Tips", "Shoe Guide", "Hair & Makeup"]
    }
  ];

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-br from-vintage-cream/50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-vintage font-bold text-vintage-teal mb-4">
              Stay in the Loop
            </h2>
            <p className="text-xl text-vintage-teal/70 max-w-2xl mx-auto">
              Get the latest dance news, class schedules, and exclusive event invitations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Newsletter Signup */}
            <div className="animate-slide-in-left">
              <Card className="border-vintage-teal/20 retro-shadow">
                <CardContent className="p-8">
                  {!isSubscribed ? (
                    <>
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 vintage-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                          <Mail className="w-8 h-8 text-vintage-cream" />
                        </div>
                        <h3 className="text-2xl font-vintage font-bold text-vintage-teal mb-2">
                          Join Our Newsletter
                        </h3>
                        <p className="text-vintage-teal/70">
                          Be the first to know about new classes, events, and dance tips
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border-vintage-teal/30 focus:border-vintage-teal h-12"
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full h-12 vintage-gradient text-vintage-cream hover:scale-105 transition-transform"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-vintage-cream mr-2"></div>
                              Subscribing...
                            </div>
                          ) : (
                            <>
                              <Mail className="w-4 h-4 mr-2" />
                              Subscribe Now
                            </>
                          )}
                        </Button>
                      </form>

                      <div className="flex items-center justify-center space-x-4 mt-6 text-sm text-vintage-teal/60">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          No spam
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Unsubscribe anytime
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center animate-fade-in-up">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-subtle">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-vintage font-bold text-vintage-teal mb-2">
                        Welcome to the Family!
                      </h3>
                      <p className="text-vintage-teal/70 mb-4">
                        You're now subscribed to our newsletter. Check your email for a welcome message!
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => setIsSubscribed(false)}
                        className="border-vintage-teal text-vintage-teal hover:bg-vintage-teal hover:text-vintage-cream"
                      >
                        Subscribe Another Email
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Past Newsletters Preview */}
            <div className="animate-slide-in-right">
              <h3 className="text-2xl font-vintage font-bold text-vintage-teal mb-6">
                Previous Newsletters
              </h3>
              <div className="space-y-4">
                {newsletters.map((newsletter, index) => (
                  <Card 
                    key={newsletter.id} 
                    className="border-vintage-teal/20 hover:shadow-lg transition-all duration-300 dance-card-hover"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-vintage font-bold text-vintage-teal">
                          {newsletter.title}
                        </h4>
                        <span className="text-sm text-vintage-teal/60 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {newsletter.date}
                        </span>
                      </div>
                      <p className="text-vintage-teal/70 mb-4 text-sm">
                        {newsletter.preview}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {newsletter.topics.map((topic, idx) => (
                          <span 
                            key={idx}
                            className="bg-vintage-gold/20 text-vintage-teal px-2 py-1 rounded-full text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-vintage-teal text-vintage-teal hover:bg-vintage-teal hover:text-vintage-cream"
                      >
                        Read More
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
