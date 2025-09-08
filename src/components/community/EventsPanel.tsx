import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MapPin, Video } from "lucide-react";

const EventsPanel = () => {
  // Mock events data
  const events = [
    {
      id: 1,
      title: "Q&A with Cotton Expert",
      description: "Learn about sustainable cotton farming practices and pest management",
      date: "2024-01-15",
      time: "18:00",
      duration: "60 min",
      type: "expert_session",
      participants: 23,
      maxParticipants: 50,
      expert: "Dr. Priya Sharma",
      cropFocus: "Cotton"
    },
    {
      id: 2,
      title: "Organic Farming Workshop",
      description: "Hands-on workshop on organic pest control and soil management",
      date: "2024-01-18",
      time: "14:00",
      duration: "120 min",
      type: "workshop",
      participants: 12,
      maxParticipants: 20,
      location: "Pune Community Center"
    },
    {
      id: 3,
      title: "Water Conservation Challenge Kickoff",
      description: "Join our community challenge to save 10,000L of water this month",
      date: "2024-01-20",
      time: "16:00",
      duration: "45 min",
      type: "challenge",
      participants: 89,
      maxParticipants: 200
    }
  ];

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'expert_session': 'bg-blue-100 text-blue-800',
      'workshop': 'bg-green-100 text-green-800',
      'challenge': 'bg-purple-100 text-purple-800',
      'meetup': 'bg-orange-100 text-orange-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getEventIcon = (type: string) => {
    const icons: Record<string, any> = {
      'expert_session': Video,
      'workshop': Users,
      'challenge': Calendar,
      'meetup': MapPin,
    };
    return icons[type] || Calendar;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Upcoming Events</h3>
        <Button size="sm" variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="space-y-4">
        {events.map((event) => {
          const EventIcon = getEventIcon(event.type);
          const isAlmostFull = event.participants / event.maxParticipants > 0.8;
          
          return (
            <Card key={event.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base">{event.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={getEventTypeColor(event.type)}>
                        <EventIcon className="w-3 h-3 mr-1" />
                        {event.type.replace('_', ' ')}
                      </Badge>
                      {event.cropFocus && (
                        <Badge variant="secondary">{event.cropFocus}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{event.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {event.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {event.participants}/{event.maxParticipants}
                    {isAlmostFull && <span className="ml-1 text-orange-600">• Almost full</span>}
                  </div>
                </div>
                
                {event.expert && (
                  <p className="text-sm">
                    <span className="text-muted-foreground">Expert: </span>
                    <span className="font-medium">{event.expert}</span>
                  </p>
                )}
                
                {event.location && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    {event.location}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-muted-foreground">
                    {event.maxParticipants - event.participants} spots left
                  </div>
                  
                  <Button size="sm" disabled={event.participants >= event.maxParticipants}>
                    {event.participants >= event.maxParticipants ? 'Full' : 'Join Event'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        <Card>
          <CardContent className="text-center py-8">
            <Calendar className="w-12 h-12 mx-auto mb-2 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">More events coming soon!</p>
            <Button variant="outline" size="sm" className="mt-2">
              Suggest an Event
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventsPanel;