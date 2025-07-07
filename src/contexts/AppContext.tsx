
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

interface Subscriber {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  experience: string;
  message: string;
  subscriptionDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface Course {
  id: number;
  name: string;
  description: string;
  time: string;
  location: string;
  instructor?: string;
  price?: number;
  maxParticipants?: number;
  imageUrl?: string;
  level?: string;
  duration?: string;
  startDate?: string;  // ideally ISO date string (e.g. "2025-07-07")
  endDate?: string;
  isActive?: boolean;
}


interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  venue: string;
  ticketPrice?: number;
  imageUrl?: string;
}

interface MediaItem {
  id: number;
  type: 'video' | 'photo' | 'event';
  category: 'videos' | 'photos' | 'events';
  title: string;
  thumbnail: string;
  description: string;
  date: string;
  videoUrl?: string;
  fullImageUrl?: string;
}

interface AppContextType {
  subscribers: Subscriber[];
  courses: Course[];
  events: Event[];
  mediaItems: MediaItem[];
  unreadNotifications: number;
  addSubscriber: (subscriber: Omit<Subscriber, 'id' | 'subscriptionDate' | 'status'>) => void;
  addCourse: (course: Omit<Course, 'id'>) => Promise<void>;
  addEvent: (event: Omit<Event, 'id'>) => void;
  getSubscribersByCourse: () => Record<string, Subscriber[]>;
  markNotificationsAsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

const initialCourses: Course[] = [
  { id: 1, name: "Beginner Rockabilly", description: "Perfect for first-time dancers", time: "7:00 PM", location: "Studio A", instructor: "Maria Rossi", maxParticipants: 20, price: 80 },
  { id: 2, name: "Advanced Swing", description: "For experienced dancers", time: "8:30 PM", location: "Studio B", instructor: "Giuseppe Bianchi", maxParticipants: 15, price: 120 },
  { id: 3, name: "Lindy Hop Basics", description: "Learn the fundamentals of Lindy Hop", time: "6:00 PM", location: "Studio A", instructor: "Anna Verdi", maxParticipants: 18, price: 90 },
  { id: 4, name: "Charleston Style", description: "Master the Charleston dance", time: "9:00 PM", location: "Studio C", instructor: "Franco Neri", maxParticipants: 12, price: 100 },
];

const initialEvents: Event[] = [
  { id: 1, name: "Summer Dance Social", description: "Join us for a night of dancing under the stars", date: "2024-07-15", venue: "Main Hall", ticketPrice: 15 },
  { id: 2, name: "Rockabilly Workshop", description: "Intensive weekend workshop with guest instructors", date: "2024-07-22", venue: "Studio Complex", ticketPrice: 50 },
  { id: 3, name: "Vintage Night", description: "Monthly themed dance night", date: "2024-08-05", venue: "Grand Ballroom", ticketPrice: 20 },
];

const initialMediaItems: MediaItem[] = [
  {
    id: 1,
    type: 'video',
    category: 'videos',
    title: 'Rockabilly Basics Tutorial',
    thumbnail: '🎬',
    description: 'Learn the fundamental steps of rockabilly dancing with our expert instructors',
    date: 'March 2024',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 2,
    type: 'video',
    category: 'videos',
    title: 'Swing Dance Choreography',
    thumbnail: '💃',
    description: 'Advanced swing routine performed by our professional dance team',
    date: 'March 2024',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 3,
    type: 'video',
    category: 'videos',
    title: 'Lindy Hop Performance',
    thumbnail: '🕺',
    description: 'Watch our students perform an amazing Lindy Hop routine',
    date: 'February 2024',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 4,
    type: 'photo',
    category: 'photos',
    title: 'Studio Practice Session',
    thumbnail: '📸',
    description: 'Our students practicing their moves in the studio',
    date: 'February 2024',
    fullImageUrl: '/lovable-uploads/986644e8-1ad8-4f4b-9d46-7b0a331c0781.png'
  },
  {
    id: 5,
    type: 'photo',
    category: 'photos',
    title: 'Vintage Night Photos',
    thumbnail: '📷',
    description: 'Highlights from our monthly vintage-themed dance night',
    date: 'February 2024',
    fullImageUrl: '/lovable-uploads/986644e8-1ad8-4f4b-9d46-7b0a331c0781.png'
  },
  {
    id: 6,
    type: 'event',
    category: 'events',
    title: 'Turin Dance Festival 2024',
    thumbnail: '🎪',
    description: 'Our spectacular performance at the annual Turin Dance Festival',
    date: 'January 2024',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

const initialSubscribers: Subscriber[] = [
  { id: 1, name: "Maria Rossi", email: "maria@email.com", phone: "+39 123 456 7890", course: "Beginner Rockabilly", experience: "complete-beginner", message: "", subscriptionDate: "2024-06-15", status: 'confirmed' },
  { id: 2, name: "Giuseppe Bianchi", email: "giuseppe@email.com", phone: "+39 987 654 3210", course: "Advanced Swing", experience: "advanced", message: "Looking forward to the advanced techniques", subscriptionDate: "2024-06-18", status: 'confirmed' },
  { id: 3, name: "Anna Verdi", email: "anna@email.com", phone: "+39 555 123 4567", course: "Beginner Rockabilly", experience: "some-experience", message: "", subscriptionDate: "2024-06-20", status: 'pending' },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [mediaItems] = useState<MediaItem[]>(initialMediaItems);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const { toast } = useToast();

  const addSubscriber = (subscriberData: Omit<Subscriber, 'id' | 'subscriptionDate' | 'status'>) => {
    const newSubscriber: Subscriber = {
      ...subscriberData,
      id: subscribers.length + 1,
      subscriptionDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    
    setSubscribers(prev => [...prev, newSubscriber]);
    setUnreadNotifications(prev => prev + 1);
    
    // Show admin notification
    toast({
      title: "🎉 New Course Registration!",
      description: `${subscriberData.name} registered for ${subscriberData.course}`,
    });
  };

  // const addCourse = (courseData: Omit<Course, 'id'>) => {
  //   const newCourse: Course = {
  //     ...courseData,
  //     id: courses.length + 1
  //   };
  //   setCourses(prev => [...prev, newCourse]);
  // };

  const toSnakeCaseCourse = (obj: any) => {
    return {
      name: obj.name,
      description: obj.description,
      instructor: obj.instructor || null,
      time: obj.time,
      location: obj.location,
      max_participants: obj.maxParticipants ?? null,
      price: obj.price ?? null,
      image_url: obj.imageUrl || null,
      level: obj.level || null,
      duration: obj.duration || null,
      start_date: obj.startDate || null,
      end_date: obj.endDate || null,
      is_active: obj.isActive ?? true,
    };
  };

  const addCourse = async (courseData: Omit<Course, 'id'>) => {
    try {
      console.log(JSON.stringify(courseData));
      const payLoad = toSnakeCaseCourse(courseData);
      console.log(JSON.stringify(payLoad));
      
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payLoad),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add course');
      }
  
      const newCourse: Course = await response.json();
      console.log('New course added:', newCourse);
      setCourses(prev => [...prev, newCourse]);
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: events.length + 1
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const getSubscribersByCourse = (): Record<string, Subscriber[]> => {
    return subscribers.reduce((acc, subscriber) => {
      if (!acc[subscriber.course]) {
        acc[subscriber.course] = [];
      }
      acc[subscriber.course].push(subscriber);
      return acc;
    }, {} as Record<string, Subscriber[]>);
  };

  const markNotificationsAsRead = () => {
    setUnreadNotifications(0);
  };

  return (
    <AppContext.Provider value={{
      subscribers,
      courses,
      events,
      mediaItems,
      unreadNotifications,
      addSubscriber,
      addCourse,
      addEvent,
      getSubscribersByCourse,
      markNotificationsAsRead
    }}>
      {children}
    </AppContext.Provider>
  );
};
