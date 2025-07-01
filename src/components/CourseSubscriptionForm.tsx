
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, User, Mail, Phone, MessageSquare } from "lucide-react";

const CourseSubscriptionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    experience: "",
    message: ""
  });
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const courses = [
    { id: "beginner-rockabilly", name: "Beginner Rockabilly", time: "7:00 PM", location: "Studio A" },
    { id: "advanced-swing", name: "Advanced Swing", time: "8:30 PM", location: "Studio B" },
    { id: "lindy-hop", name: "Lindy Hop Basics", time: "6:00 PM", location: "Studio A" },
    { id: "charleston", name: "Charleston Style", time: "9:00 PM", location: "Studio C" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.course) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    
    toast({
      title: "Registration Successful! 🎉",
      description: `Thank you ${formData.name}! We'll contact you soon about ${formData.course}.`,
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "",
      experience: "",
      message: ""
    });
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg"
          className="vintage-gradient text-vintage-cream hover:scale-105 transition-transform retro-shadow"
        >
          <Calendar className="mr-2 h-5 w-5" />
          Join a Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-vintage text-vintage-teal">
            Join Our Dance Family
          </DialogTitle>
          <DialogDescription className="text-vintage-teal/70">
            Fill out the form below to register for a dance course. We'll get back to you within 24 hours!
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-vintage font-bold text-vintage-teal">Personal Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center text-vintage-teal">
                <User className="w-4 h-4 mr-2" />
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                className="border-vintage-teal/30 focus:border-vintage-teal"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center text-vintage-teal">
                <Mail className="w-4 h-4 mr-2" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
                className="border-vintage-teal/30 focus:border-vintage-teal"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center text-vintage-teal">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+39 123 456 7890"
                className="border-vintage-teal/30 focus:border-vintage-teal"
                required
              />
            </div>
          </div>

          {/* Course Selection */}
          <div className="space-y-4">
            <h3 className="font-vintage font-bold text-vintage-teal">Course Selection</h3>
            
            <div className="space-y-2">
              <Label className="text-vintage-teal">Choose a Course *</Label>
              <div className="grid gap-3">
                {courses.map((course) => (
                  <div 
                    key={course.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.course === course.name 
                        ? 'border-vintage-teal bg-vintage-teal/10' 
                        : 'border-vintage-teal/30 hover:border-vintage-teal/60'
                    }`}
                    onClick={() => handleInputChange("course", course.name)}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="course"
                        value={course.name}
                        checked={formData.course === course.name}
                        onChange={() => handleInputChange("course", course.name)}
                        className="text-vintage-teal"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-vintage-teal">{course.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-vintage-teal/70">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {course.time}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {course.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="font-vintage font-bold text-vintage-teal">Additional Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-vintage-teal">
                Dance Experience Level
              </Label>
              <select
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                className="w-full p-2 border border-vintage-teal/30 rounded-md focus:border-vintage-teal focus:outline-none"
              >
                <option value="">Select your experience level</option>
                <option value="complete-beginner">Complete Beginner</option>
                <option value="some-experience">Some Experience</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center text-vintage-teal">
                <MessageSquare className="w-4 h-4 mr-2" />
                Special Requests or Questions
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Any special requirements, questions, or things we should know?"
                className="border-vintage-teal/30 focus:border-vintage-teal"
                rows={3}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 border-vintage-teal text-vintage-teal"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 vintage-gradient text-vintage-cream"
            >
              Register for Course
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseSubscriptionForm;
