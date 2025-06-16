
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Plus, ThumbsUp, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  location: string;
  organizer: string;
  votes: number;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

const eventTypes = [
  { value: 'tour', label: 'Tour Event' },
  { value: 'food', label: 'Foodie Event' },
  { value: 'social', label: 'Social Gathering' },
  { value: 'business', label: 'Business Meeting' },
  { value: 'cultural', label: 'Cultural Event' },
  { value: 'sports', label: 'Sports Activity' }
];

const Events = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Annual Fund Gathering",
      description: "Join us for our yearly celebration and planning session for the upcoming year.",
      type: "social",
      date: "2024-07-15",
      location: "Community Center Hall",
      organizer: "Sarah Wilson",
      votes: 15,
      status: "approved",
      timestamp: "2 days ago"
    },
    {
      id: "2",
      title: "Food Festival Tour",
      description: "Explore the local food scene together! We'll visit 5 different restaurants.",
      type: "food",
      date: "2024-07-22",
      location: "Downtown Food District",
      organizer: "Mike Chen",
      votes: 8,
      status: "pending",
      timestamp: "1 day ago"
    },
    {
      id: "3",
      title: "Historical City Tour",
      description: "Educational tour of our city's historical landmarks and museums.",
      type: "tour",
      date: "2024-08-05",
      location: "City Historical District",
      organizer: "Emily Davis",
      votes: 12,
      status: "pending",
      timestamp: "5 hours ago"
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    type: '',
    date: '',
    location: ''
  });

  const { toast } = useToast();

  const handleVote = (eventId: string) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId ? { ...event, votes: event.votes + 1 } : event
      )
    );
    
    toast({
      title: "Vote Recorded!",
      description: "Your vote has been submitted for this event.",
    });
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.description || !newEvent.type || !newEvent.date || !newEvent.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to create an event",
        variant: "destructive"
      });
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      type: newEvent.type,
      date: newEvent.date,
      location: newEvent.location,
      organizer: "You",
      votes: 0,
      status: "pending",
      timestamp: "Just now"
    };

    setEvents([event, ...events]);
    setNewEvent({
      title: '',
      description: '',
      type: '',
      date: '',
      location: ''
    });

    toast({
      title: "Event Created!",
      description: "Your event has been submitted for approval.",
    });
  };

  const getEventTypeLabel = (type: string) => {
    return eventTypes.find(t => t.value === type)?.label || type;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg sm:text-xl">Upcoming Events</CardTitle>
            <CardDescription className="text-sm">Create and vote on community events</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Propose an event for the community to vote on
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Event Type</Label>
                  <Select value={newEvent.type} onValueChange={(value) => setNewEvent({...newEvent, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date">Event Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter event location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event..."
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <Button onClick={handleCreateEvent} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {getEventTypeLabel(event.type)}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>by {event.organizer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{event.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-row sm:flex-col items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleVote(event.id)}
                    className="flex items-center gap-1"
                    disabled={event.status === 'rejected'}
                  >
                    <ThumbsUp className="h-3 w-3" />
                    <span className="text-xs">{event.votes}</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Events;
