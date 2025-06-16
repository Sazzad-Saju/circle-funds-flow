
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Heart, Users } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
    title: "Team Dinner 2024",
    description: "Annual fund celebration dinner"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
    title: "Office Gathering",
    description: "Monthly contributors meetup"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop",
    title: "Charity Event",
    description: "Supporting local community"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=300&fit=crop",
    title: "Investment Success",
    description: "Celebrating fund milestones"
  }
];

const Gallery = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-blue-600" />
          FriendCircle Moments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-lg">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h4 className="font-semibold text-sm">{image.title}</h4>
                  <p className="text-xs opacity-90">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span>24 Contributors</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            <span>Building Together</span>
          </div>
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-green-600" />
            <span>Memories Shared</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Gallery;
