import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Upload, Users, FileText, Image, Calendar, Clock, MapPin, Mail, Phone, Bell, BellOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const AdminPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const { 
    courses, 
    events, 
    subscribers, 
    unreadNotifications, 
    addCourse, 
    addEvent, 
    getSubscribersByCourse,
    markNotificationsAsRead 
  } = useAppContext();
  const { toast } = useToast();

  // Form states for classes
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [classTime, setClassTime] = useState("");
  const [classLocation, setClassLocation] = useState("");
  const [classInstructor, setClassInstructor] = useState("");
  const [classPrice, setClassPrice] = useState("");

  // Form states for events
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventVenue, setEventVenue] = useState("");

  const handleLogin = () => {
    if (adminPassword === "rockinturin2024") {
      setIsAuthenticated(true);
      markNotificationsAsRead();
      toast({
        title: "Benvenuto Admin!",
        description: "Hai effettuato l'accesso al portale amministrativo con successo.",
      });
    } else {
      toast({
        title: "Accesso Negato",
        description: "Password non valida. Riprova.",
        variant: "destructive",
      });
    }
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (className && classDescription && classTime && classLocation) {
      addCourse({
        name: className,
        description: classDescription,
        time: classTime,
        location: classLocation,
        instructor: classInstructor || undefined,
        price: classPrice ? parseFloat(classPrice) : undefined
      });
      
      setClassName("");
      setClassDescription("");
      setClassTime("");
      setClassLocation("");
      setClassInstructor("");
      setClassPrice("");
      
      toast({
        title: "Corso Aggiunto! 🎉",
        description: `${className} è stato aggiunto con successo.`,
      });
    } else {
      toast({
        title: "Errore",
        description: "Compila tutti i campi obbligatori.",
        variant: "destructive",
      });
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (eventName && eventDescription && eventDate && eventVenue) {
      addEvent({
        name: eventName,
        description: eventDescription,
        date: eventDate,
        venue: eventVenue,
      });
      
      setEventName("");
      setEventDescription("");
      setEventDate("");
      setEventVenue("");
      
      toast({
        title: "Evento Aggiunto! 🎉",
        description: `${eventName} è stato aggiunto con successo.`,
      });
    } else {
      toast({
        title: "Errore",
        description: "Compila tutti i campi.",
        variant: "destructive",
      });
    }
  };

  const subscribersByCourse = getSubscribersByCourse();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-secondary pt-24">
        <Card className="w-full max-w-md animate-scale-in retro-shadow backdrop-blur-glass">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl gradient-text flex items-center justify-center animate-glow-pulse">
              {unreadNotifications > 0 && (
                <div className="relative mr-3">
                  <Bell className="w-6 h-6 text-accent" />
                  <Badge className="absolute -top-2 -right-2 bg-destructive text-white text-xs px-1 py-0 min-w-[1.2rem] h-5 rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </Badge>
                </div>
              )}
              Accesso Portale Admin
            </CardTitle>
            {unreadNotifications > 0 && (
              <p className="text-accent text-sm font-medium animate-float">
                {unreadNotifications} nuova registrazione{unreadNotifications > 1 ? 'i' : ''}!
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Inserisci password admin"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="border-primary/30 focus:border-primary focus:ring-primary/20"
              />
              <Button 
                onClick={handleLogin}
                className="w-full modern-gradient text-primary-foreground hover:scale-105 transition-transform duration-300"
              >
                Accedi al Portale Admin
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Password demo: rockinturin2024
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-slide-up flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-display font-bold gradient-text mb-2 animate-float">
              Portale Amministrativo
            </h1>
            <p className="text-muted-foreground">
              Gestisci i contenuti e le impostazioni della tua scuola di ballo
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 backdrop-blur-glass rounded-lg px-4 py-2">
              <Bell className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">
                {subscribers.length} Iscritti Totali
              </span>
            </div>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Esci
            </Button>
          </div>
        </div>

        <Tabs defaultValue="subscribers" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 backdrop-blur-glass">
            <TabsTrigger value="subscribers" className="relative">
              Iscritti
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-destructive text-white text-xs px-1 py-0 min-w-[1rem] h-4 rounded-full animate-glow-pulse">
                  {unreadNotifications}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="content">Contenuti</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            <TabsTrigger value="settings">Impostazioni</TabsTrigger>
          </TabsList>

          {/* Subscribers Management */}
          <TabsContent value="subscribers">
            <Card className="card-hover backdrop-blur-glass">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Users className="w-5 h-5 mr-2" />
                  Iscritti ai Corsi ({subscribers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  {Object.entries(subscribersByCourse).map(([courseName, courseSubscribers]) => (
                    <AccordionItem key={courseName} value={courseName} className="border-border">
                      <AccordionTrigger className="text-primary hover:text-primary/80">
                        <div className="flex items-center justify-between w-full mr-4">
                          <span className="font-display font-semibold">{courseName}</span>
                          <Badge className="bg-primary text-primary-foreground">
                            {courseSubscribers.length} iscritto{courseSubscribers.length > 1 ? 'i' : ''}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="rounded-md border border-border/20 mt-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Telefono</TableHead>
                                <TableHead>Esperienza</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Stato</TableHead>
                                <TableHead>Azioni</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {courseSubscribers.map((subscriber) => (
                                <TableRow key={subscriber.id}>
                                  <TableCell className="font-medium">{subscriber.name}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center">
                                      <Mail className="w-4 h-4 mr-2 text-primary" />
                                      {subscriber.email}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center">
                                      <Phone className="w-4 h-4 mr-2 text-primary" />
                                      {subscriber.phone}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="outline" className="border-primary/50 text-primary">
                                      {subscriber.experience || 'Non specificato'}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{subscriber.subscriptionDate}</TableCell>
                                  <TableCell>
                                    <Badge 
                                      className={
                                        subscriber.status === 'confirmed' 
                                          ? 'bg-green-100 text-green-800 border-green-200' 
                                          : subscriber.status === 'pending'
                                          ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                          : 'bg-red-100 text-red-800 border-red-200'
                                      }
                                    >
                                      {subscriber.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex gap-2">
                                      <Button size="sm" variant="outline" className="border-primary text-primary">
                                        <Edit className="w-3 h-3" />
                                      </Button>
                                      <Button size="sm" variant="outline" className="border-destructive text-destructive">
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management */}
          <TabsContent value="content">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-hover backdrop-blur-glass">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <FileText className="w-5 h-5 mr-2" />
                    Gestisci Corsi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddClass} className="space-y-4">
                    <Input 
                      placeholder="Nome Corso *" 
                      className="border-primary/30 focus:border-primary"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      required
                    />
                    <Textarea 
                      placeholder="Descrizione Corso *" 
                      className="border-primary/30 focus:border-primary"
                      value={classDescription}
                      onChange={(e) => setClassDescription(e.target.value)}
                      required
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        placeholder="Orario *" 
                        className="border-primary/30 focus:border-primary"
                        value={classTime}
                        onChange={(e) => setClassTime(e.target.value)}
                        required
                      />
                      <Input 
                        placeholder="Luogo *" 
                        className="border-primary/30 focus:border-primary"
                        value={classLocation}
                        onChange={(e) => setClassLocation(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        placeholder="Istruttore" 
                        className="border-primary/30 focus:border-primary"
                        value={classInstructor}
                        onChange={(e) => setClassInstructor(e.target.value)}
                      />
                      <Input 
                        placeholder="Prezzo (€)" 
                        type="number"
                        className="border-primary/30 focus:border-primary"
                        value={classPrice}
                        onChange={(e) => setClassPrice(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full modern-gradient text-primary-foreground hover:scale-105 transition-transform duration-300">
                      <Plus className="w-4 h-4 mr-1" />
                      Aggiungi Corso
                    </Button>
                  </form>
                  
                  <div className="mt-6">
                    <h4 className="font-display font-bold text-primary mb-3">Corsi Attuali ({courses.length})</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {courses.map((cls) => (
                        <div key={cls.id} className="p-3 backdrop-blur-glass rounded-lg flex justify-between items-start animate-slide-up">
                          <div className="flex-1">
                            <h5 className="font-semibold text-primary">{cls.name}</h5>
                            <p className="text-sm text-muted-foreground">{cls.description}</p>
                            <p className="text-xs text-muted-foreground">{cls.time} - {cls.location}</p>
                            {cls.instructor && (
                              <p className="text-xs text-muted-foreground">Istruttore: {cls.instructor}</p>
                            )}
                            {cls.price && (
                              <p className="text-xs text-accent font-medium">€{cls.price}</p>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="border-primary text-primary">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-destructive text-destructive">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover backdrop-blur-glass">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <Calendar className="w-5 h-5 mr-2" />
                    Gestisci Eventi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddEvent} className="space-y-4">
                    <Input 
                      placeholder="Nome Evento *" 
                      className="border-primary/30 focus:border-primary"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      required
                    />
                    <Textarea 
                      placeholder="Descrizione Evento *" 
                      className="border-primary/30 focus:border-primary"
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      required
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        type="date" 
                        className="border-primary/30 focus:border-primary"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                      />
                      <Input 
                        placeholder="Luogo *" 
                        className="border-primary/30 focus:border-primary"
                        value={eventVenue}
                        onChange={(e) => setEventVenue(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full modern-gradient text-primary-foreground hover:scale-105 transition-transform duration-300">
                      <Plus className="w-4 h-4 mr-1" />
                      Aggiungi Evento
                    </Button>
                  </form>
                  
                  <div className="mt-6">
                    <h4 className="font-display font-bold text-primary mb-3">Eventi Attuali ({events.length})</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {events.map((event) => (
                        <div key={event.id} className="p-3 backdrop-blur-glass rounded-lg flex justify-between items-start animate-slide-up">
                          <div className="flex-1">
                            <h5 className="font-semibold text-primary">{event.name}</h5>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                            <p className="text-xs text-muted-foreground">{event.date} - {event.venue}</p>
                            {event.ticketPrice && (
                              <p className="text-xs text-accent font-medium">€{event.ticketPrice}</p>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="border-primary text-primary">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-destructive text-destructive">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Media Management */}
          <TabsContent value="media">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="dance-card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center text-vintage-teal">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Media
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-vintage-teal/30 rounded-lg p-8 text-center">
                      <Image className="w-12 h-12 text-vintage-teal/50 mx-auto mb-4" />
                      <p className="text-vintage-teal/70 mb-2">Drag & drop files here</p>
                      <Button variant="outline" className="border-vintage-teal text-vintage-teal">
                        <Upload className="w-4 h-4 mr-2" />
                        Browse Files
                      </Button>
                    </div>
                    <Input placeholder="Media Title" className="border-vintage-teal/30" />
                    <Textarea placeholder="Media Description" className="border-vintage-teal/30" />
                    <Button className="w-full vintage-gradient text-vintage-cream">
                      Upload Media
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="dance-card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center text-vintage-teal">
                    <Image className="w-5 h-5 mr-2" />
                    Media Library
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="aspect-square bg-vintage-teal/10 rounded-lg flex items-center justify-center relative group">
                          <span className="text-2xl">🎬</span>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Button size="sm" variant="outline" className="text-white border-white">
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full border-vintage-teal text-vintage-teal">
                      View All Media
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Newsletter Management */}
          <TabsContent value="newsletter">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="dance-card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center text-vintage-teal">
                    <Users className="w-5 h-5 mr-2" />
                    Subscribers ({Math.floor(Math.random() * 500) + 100})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-vintage-cream/50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-vintage-teal">Recent Signups</span>
                        <span className="text-sm text-vintage-teal/60">This week</span>
                      </div>
                      <div className="text-2xl font-bold text-vintage-teal">+23</div>
                    </div>
                    <Button className="w-full vintage-gradient text-vintage-cream">
                      Export Subscribers
                    </Button>
                    <Button variant="outline" className="w-full border-vintage-teal text-vintage-teal">
                      View All Subscribers
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="dance-card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center text-vintage-teal">
                    <FileText className="w-5 h-5 mr-2" />
                    Create Newsletter
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input placeholder="Newsletter Title" className="border-vintage-teal/30" />
                    <Textarea 
                      placeholder="Newsletter Content" 
                      className="border-vintage-teal/30 min-h-[120px]"
                    />
                    <div className="flex gap-2">
                      <Button className="vintage-gradient text-vintage-cream flex-1">
                        Send Newsletter
                      </Button>
                      <Button variant="outline" className="border-vintage-teal text-vintage-teal">
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card className="dance-card-hover">
              <CardHeader>
                <CardTitle className="text-vintage-teal">System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-vintage font-bold text-vintage-teal">Site Configuration</h3>
                    <Input placeholder="Site Title" defaultValue="Rock in Turin Dance School" className="border-vintage-teal/30" />
                    <Textarea placeholder="Site Description" className="border-vintage-teal/30" />
                    <Input placeholder="Contact Email" className="border-vintage-teal/30" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-vintage font-bold text-vintage-teal">Admin Settings</h3>
                    <Input type="password" placeholder="Change Admin Password" className="border-vintage-teal/30" />
                    <Button 
                      onClick={() => setIsAuthenticated(false)}
                      variant="outline" 
                      className="w-full border-red-500 text-red-500"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="vintage-gradient text-vintage-cream">
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPortal;
