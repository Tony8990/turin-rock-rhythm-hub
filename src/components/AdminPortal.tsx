
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
        title: "Welcome Admin!",
        description: "You have successfully logged into the admin portal.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddClass = () => {
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
        title: "Class Added! 🎉",
        description: `${className} has been added successfully.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  const handleAddEvent = () => {
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
        title: "Event Added! 🎉",
        description: `${eventName} has been added successfully.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
    }
  };

  const subscribersByCourse = getSubscribersByCourse();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vintage-cream to-white pt-24">
        <Card className="w-full max-w-md retro-shadow">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-vintage text-vintage-teal flex items-center justify-center">
              {unreadNotifications > 0 && (
                <div className="relative mr-3">
                  <Bell className="w-6 h-6 text-vintage-gold" />
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 py-0 min-w-[1.2rem] h-5 rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </Badge>
                </div>
              )}
              Admin Portal Access
            </CardTitle>
            {unreadNotifications > 0 && (
              <p className="text-vintage-gold text-sm font-medium">
                {unreadNotifications} new registration{unreadNotifications > 1 ? 's' : ''}!
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="border-vintage-teal/30 focus:border-vintage-teal"
              />
              <Button 
                onClick={handleLogin}
                className="w-full vintage-gradient text-vintage-cream"
              >
                Login to Admin Portal
              </Button>
              <p className="text-xs text-vintage-teal/60 text-center">
                Demo password: rockinturin2024
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-cream to-white pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in-up flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-vintage font-bold text-vintage-teal mb-2">
              Admin Portal
            </h1>
            <p className="text-vintage-teal/70">
              Manage your dance school content and settings
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-vintage-teal" />
              <span className="text-vintage-teal font-medium">
                {subscribers.length} Total Subscribers
              </span>
            </div>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="border-vintage-teal text-vintage-teal"
            >
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="subscribers" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="subscribers" className="relative">
              Subscribers
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 py-0 min-w-[1rem] h-4 rounded-full">
                  {unreadNotifications}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Subscribers Management - Now first tab */}
          <TabsContent value="subscribers">
            <Card className="dance-card-hover">
              <CardHeader>
                <CardTitle className="flex items-center text-vintage-teal">
                  <Users className="w-5 h-5 mr-2" />
                  Course Subscribers ({subscribers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Subscribers grouped by course */}
                <Accordion type="multiple" className="w-full">
                  {Object.entries(subscribersByCourse).map(([courseName, courseSubscribers]) => (
                    <AccordionItem key={courseName} value={courseName} className="border-vintage-teal/20">
                      <AccordionTrigger className="text-vintage-teal hover:text-vintage-teal/80">
                        <div className="flex items-center justify-between w-full mr-4">
                          <span className="font-vintage font-semibold">{courseName}</span>
                          <Badge className="bg-vintage-teal text-vintage-cream">
                            {courseSubscribers.length} subscriber{courseSubscribers.length > 1 ? 's' : ''}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="rounded-md border border-vintage-teal/20 mt-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Experience</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {courseSubscribers.map((subscriber) => (
                                <TableRow key={subscriber.id}>
                                  <TableCell className="font-medium">{subscriber.name}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center">
                                      <Mail className="w-4 h-4 mr-2 text-vintage-teal" />
                                      {subscriber.email}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center">
                                      <Phone className="w-4 h-4 mr-2 text-vintage-teal" />
                                      {subscriber.phone}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="outline" className="border-vintage-teal/50 text-vintage-teal">
                                      {subscriber.experience || 'Not specified'}
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
                                      <Button size="sm" variant="outline" className="border-vintage-teal text-vintage-teal">
                                        <Edit className="w-3 h-3" />
                                      </Button>
                                      <Button size="sm" variant="outline" className="border-red-500 text-red-500">
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        
                        {/* Course subscriber actions */}
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" className="vintage-gradient text-vintage-cream">
                            Export {courseName} Subscribers
                          </Button>
                          <Button size="sm" variant="outline" className="border-vintage-teal text-vintage-teal">
                            Email {courseName} Group
                          </Button>
                        </div>
                        
                        {/* Show special requests if any */}
                        {courseSubscribers.some(s => s.message) && (
                          <div className="mt-4 p-4 bg-vintage-cream/30 rounded-lg">
                            <h4 className="font-semibold text-vintage-teal mb-2">Special Requests:</h4>
                            {courseSubscribers
                              .filter(s => s.message)
                              .map(subscriber => (
                                <div key={subscriber.id} className="mb-2">
                                  <span className="font-medium text-vintage-teal">{subscriber.name}:</span>
                                  <span className="text-vintage-teal/70 ml-2">{subscriber.message}</span>
                                </div>
                              ))}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="mt-6 flex gap-2">
                  <Button className="vintage-gradient text-vintage-cream">
                    Export All Subscribers
                  </Button>
                  <Button variant="outline" className="border-vintage-teal text-vintage-teal">
                    Send Group Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management */}
          <TabsContent value="content">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="dance-card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center text-vintage-teal">
                    <FileText className="w-5 h-5 mr-2" />
                    Manage Classes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input 
                      placeholder="Class Name *" 
                      className="border-vintage-teal/30"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                    />
                    <Textarea 
                      placeholder="Class Description *" 
                      className="border-vintage-teal/30"
                      value={classDescription}
                      onChange={(e) => setClassDescription(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        placeholder="Time *" 
                        className="border-vintage-teal/30"
                        value={classTime}
                        onChange={(e) => setClassTime(e.target.value)}
                      />
                      <Input 
                        placeholder="Location *" 
                        className="border-vintage-teal/30"
                        value={classLocation}
                        onChange={(e) => setClassLocation(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        placeholder="Instructor" 
                        className="border-vintage-teal/30"
                        value={classInstructor}
                        onChange={(e) => setClassInstructor(e.target.value)}
                      />
                      <Input 
                        placeholder="Price (€)" 
                        type="number"
                        className="border-vintage-teal/30"
                        value={classPrice}
                        onChange={(e) => setClassPrice(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddClass} className="w-full vintage-gradient text-vintage-cream">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Class
                    </Button>
                    
                    <div className="mt-6">
                      <h4 className="font-vintage font-bold text-vintage-teal mb-3">Current Classes ({courses.length})</h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {courses.map((cls) => (
                          <div key={cls.id} className="p-3 bg-vintage-cream/30 rounded-lg flex justify-between items-start">
                            <div className="flex-1">
                              <h5 className="font-semibold text-vintage-teal">{cls.name}</h5>
                              <p className="text-sm text-vintage-teal/70">{cls.description}</p>
                              <p className="text-xs text-vintage-teal/60">{cls.time} - {cls.location}</p>
                              {cls.instructor && (
                                <p className="text-xs text-vintage-teal/60">Instructor: {cls.instructor}</p>
                              )}
                              {cls.price && (
                                <p className="text-xs text-vintage-gold font-medium">€{cls.price}</p>
                              )}
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" className="border-vintage-teal text-vintage-teal">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-500 text-red-500">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dance-card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center text-vintage-teal">
                    <Calendar className="w-5 h-5 mr-2" />
                    Manage Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input 
                      placeholder="Event Name *" 
                      className="border-vintage-teal/30"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                    />
                    <Textarea 
                      placeholder="Event Description *" 
                      className="border-vintage-teal/30"
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        type="date" 
                        className="border-vintage-teal/30"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                      />
                      <Input 
                        placeholder="Venue *" 
                        className="border-vintage-teal/30"
                        value={eventVenue}
                        onChange={(e) => setEventVenue(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddEvent} className="w-full vintage-gradient text-vintage-cream">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Event
                    </Button>
                    
                    <div className="mt-6">
                      <h4 className="font-vintage font-bold text-vintage-teal mb-3">Current Events ({events.length})</h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {events.map((event) => (
                          <div key={event.id} className="p-3 bg-vintage-cream/30 rounded-lg flex justify-between items-start">
                            <div className="flex-1">
                              <h5 className="font-semibold text-vintage-teal">{event.name}</h5>
                              <p className="text-sm text-vintage-teal/70">{event.description}</p>
                              <p className="text-xs text-vintage-teal/60">{event.date} - {event.venue}</p>
                              {event.ticketPrice && (
                                <p className="text-xs text-vintage-gold font-medium">€{event.ticketPrice}</p>
                              )}
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" className="border-vintage-teal text-vintage-teal">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-500 text-red-500">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
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
