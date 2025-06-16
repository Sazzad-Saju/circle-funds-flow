
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, ThumbsUp, Plus, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  type: 'tour' | 'food' | 'meeting' | 'social';
  description: string;
  date: string;
  location: string;
  votes: number;
  status: 'pending' | 'approved' | 'rejected';
  createdBy: string;
  hasVoted: boolean;
}

const eventTypeColors = {
  tour: 'bg-blue-100 text-blue-800',
  food: 'bg-orange-100 text-orange-800', 
  meeting: 'bg-purple-100 text-purple-800',
  social: 'bg-green-100 text-green-800'
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Weekend Trip to Sylhet",
      type: "tour",
      description: "A relaxing trip to tea gardens and beautiful landscapes",
      date: "2024-03-15",
      location: "Sylhet, Bangladesh",
      votes: 15,
      status: "pending",
      createdBy: "Alex Johnson",
      hasVoted: false
    },
    {
      id: "2", 
      title: "Annual Food Festival",
      type: "food",
      description: "Taste different cuisines and enjoy good food together",
      date: "2024-02-28",
      location: "Dhanmondi, Dhaka",
      votes: 22,
      status: "approved",
      createdBy: "Sarah Wilson",
      hasVoted: true
    },
    {
      id: "3",
      title: "Quarterly Review Meeting",
      type: "meeting", 
      description: "Discuss fund performance and future plans",
      date: "2024-02-20",
      location: "Conference Room, Gulshan",
      votes: 8,
      status: "approved",
      createdBy: "Mike Chen",
      hasVoted: false
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    type: '' as Event['type'],
    description: '',
    date: '',
    location: ''
  });

  const { toast } = useToast();

  const handleVote = (eventId: string) => {
    setEvents(events =>
      events.map(event =>
        event.id === eventId
          ? { ...event, votes: event.votes + 1, hasVoted: true }
          : event
      )
    );
    
    toast({
      title: "Vote Recorded!",
      description: "Your vote has been counted for this event",
    });
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.type || !newEvent.description || !newEvent.date || !newEvent.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      ...newEvent,
      votes: 0,
      status: "pending",
      createdBy: "You",
      hasVoted: false
    };

    setEvents([event, ...events]);
    setNewEvent({ title: '', type: '' as Event['type'], description: '', date: '', location: '' });
    
    toast({
      title: "Event Created!",
      description: "Your event proposal has been submitted for voting",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg sm:text-xl">Community Events</CardTitle>
            <CardDescription className="text-sm">Propose and vote on upcoming events</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Propose Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Propose New Event</DialogTitle>
                <DialogDescription>
                  Create an event proposal for the community to vote on
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
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Event Type</Label>
                  <Select value={newEvent.type} onValueChange={(value) => setNewEvent({...newEvent, type: value as Event['type']})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tour">Tour/Trip</SelectItem>
                      <SelectItem value="food">Food Event</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="social">Social Gathering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Describe the event"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Event location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <Button onClick={handleCreateEvent} className="w-full">
                  Create Event Proposal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="p-4 border rounded-lg bg-white shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{event.title}</h3>
                    <Badge className={`text-xs ${eventTypeColors[event.type]}`}>
                      {event.type}
                    </Badge>
                    <Badge variant={event.status === 'approved' ? 'default' : event.status === 'rejected' ? 'destructive' : 'secondary'} className="text-xs">
                      {event.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 text-xs sm:text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>by {event.createdBy}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{event.votes} votes</span>
                  </div>
                </div>
                
                {event.status === 'pending' && !event.hasVoted && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleVote(event.id)}
                    className="w-full sm:w-auto text-xs sm:text-sm"
                  >
                    <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Vote
                  </Button>
                )}
                
                {event.hasVoted && (
                  <Badge variant="outline" className="text-xs w-fit">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Voted
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Events;
