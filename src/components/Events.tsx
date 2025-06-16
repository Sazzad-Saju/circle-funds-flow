
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, MapPin, Users, ThumbsUp, Plus, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  type: 'tour' | 'foodie' | 'business' | 'social';
  date: string;
  location: string;
  votes: number;
  status: 'pending' | 'approved' | 'rejected';
  createdBy: string;
  hasVoted: boolean;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Cox\'s Bazar Beach Tour',
      description: 'A relaxing weekend trip to the longest beach in the world. Great opportunity for team bonding.',
      type: 'tour',
      date: '2024-07-15',
      location: 'Cox\'s Bazar, Bangladesh',
      votes: 18,
      status: 'approved',
      createdBy: 'Sarah Ahmed',
      hasVoted: false
    },
    {
      id: '2',
      title: 'Traditional Food Festival',
      description: 'Explore authentic Bangladeshi cuisine at the annual food festival in Old Dhaka.',
      type: 'foodie',
      date: '2024-06-20',
      location: 'Old Dhaka',
      votes: 12,
      status: 'pending',
      createdBy: 'Rahman Khan',
      hasVoted: true
    },
    {
      id: '3',
      title: 'Investment Summit 2024',
      description: 'Learn about new investment opportunities and network with industry professionals.',
      type: 'business',
      date: '2024-08-10',
      location: 'Dhaka Regency Hotel',
      votes: 8,
      status: 'pending',
      createdBy: 'Alex Johnson',
      hasVoted: false
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    type: '',
    date: '',
    location: ''
  });
  const { toast } = useToast();

  const handleVote = (eventId: string) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId && !event.hasVoted) {
        return { ...event, votes: event.votes + 1, hasVoted: true };
      }
      return event;
    }));
    
    toast({
      title: "Vote Submitted",
      description: "Your vote has been recorded successfully.",
    });
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.type || !newEvent.date || !newEvent.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      type: newEvent.type as any,
      date: newEvent.date,
      location: newEvent.location,
      votes: 1,
      status: 'pending',
      createdBy: 'You',
      hasVoted: true
    };

    setEvents(prev => [event, ...prev]);
    setNewEvent({ title: '', description: '', type: '', date: '', location: '' });
    setIsCreateModalOpen(false);
    
    toast({
      title: "Event Created",
      description: "Your event has been submitted for approval.",
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'tour': return 'bg-blue-100 text-blue-800';
      case 'foodie': return 'bg-orange-100 text-orange-800';
      case 'business': return 'bg-green-100 text-green-800';
      case 'social': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Community Events
          </CardTitle>
          
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Propose a new event for the community. Other members can vote, and admin will approve popular events.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter event title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Event Type</Label>
                  <Select value={newEvent.type} onValueChange={(value) => setNewEvent(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tour">Tour & Travel</SelectItem>
                      <SelectItem value="foodie">Food & Dining</SelectItem>
                      <SelectItem value="business">Business & Networking</SelectItem>
                      <SelectItem value="social">Social & Entertainment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date">Event Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter event location"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your event idea..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateEvent}>
                    Create Event
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-lg">{event.title}</h4>
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  </div>
                  {event.description && (
                    <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>by {event.createdBy}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVote(event.id)}
                    disabled={event.hasVoted}
                    className={event.hasVoted ? 'bg-blue-50' : ''}
                  >
                    <ThumbsUp className={`h-4 w-4 mr-1 ${event.hasVoted ? 'text-blue-600' : ''}`} />
                    {event.votes}
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No events yet. Create the first one!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Events;
