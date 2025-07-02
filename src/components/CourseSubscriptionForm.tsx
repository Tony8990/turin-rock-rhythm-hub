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
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { Calendar, Clock, MapPin, User, Mail, Phone, MessageSquare, Euro } from "lucide-react";

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
  const { courses, addSubscriber } = useAppContext();

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

    addSubscriber({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      course: formData.course,
      experience: formData.experience,
      message: formData.message
    });
    
    toast({
      title: "Registration Successful! 🎉",
      description: `Thank you ${formData.name}! We'll contact you soon about ${formData.course}.`,
    });

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
          className="bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700 hover:scale-105 transition-transform shadow-lg"
        >
          <Calendar className="mr-2 h-5 w-5" />
          Join a Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-blue-900">
            Join Our Dance Family
          </DialogTitle>
          <DialogDescription className="text-blue-700">
            Fill out the form below to register for a dance course. We'll get back to you within 24 hours!
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-blue-900">Personal Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center text-blue-800">
                <User className="w-4 h-4 mr-2" />
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                className="border-blue-300 focus:border-blue-600"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center text-blue-800">
                <Mail className="w-4 h-4 mr-2" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
                className="border-blue-300 focus:border-blue-600"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center text-blue-800">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+39 123 456 7890"
                className="border-blue-300 focus:border-blue-600"
                required
              />
            </div>
          </div>

          {/* Course Selection */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-blue-900">Course Selection</h3>
            
            <div className="space-y-2">
              <Label className="text-blue-800">Choose a Course *</Label>
              <div className="grid gap-3">
                {courses.map((course) => (
                  <div 
                    key={course.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.course === course.name 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-blue-300 hover:border-blue-500'
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
                        className="text-blue-600"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-900">{course.name}</h4>
                        <p className="text-sm text-blue-700 mb-1">{course.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-blue-600">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {course.time}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {course.location}
                          </span>
                          {course.price && (
                            <span className="flex items-center">
                              <Euro className="w-3 h-3 mr-1" />
                              {course.price}
                            </span>
                          )}
                        </div>
                        {course.instructor && (
                          <p className="text-xs text-blue-500 mt-1">Instructor: {course.instructor}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-blue-900">Additional Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-blue-800">
                Dance Experience Level
              </Label>
              <select
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                className="w-full p-2 border border-blue-300 rounded-md focus:border-blue-600 focus:outline-none bg-white text-blue-900"
              >
                <option value="">Select your experience level</option>
                <option value="complete-beginner">Complete Beginner</option>
                <option value="some-experience">Some Experience</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center text-blue-800">
                <MessageSquare className="w-4 h-4 mr-2" />
                Special Requests or Questions
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Any special requirements, questions, or things we should know?"
                className="border-blue-300 focus:border-blue-600"
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
              className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700"
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
