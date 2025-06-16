
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart, MessageCircle, Share2, Plus, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  author: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop",
      caption: "Great team dinner last weekend! 🍽️",
      author: "Alex Johnson",
      likes: 12,
      comments: 3,
      timestamp: "2 hours ago"
    },
    {
      id: "2", 
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop",
      caption: "Fun times at the annual meetup 🎉",
      author: "Sarah Wilson",
      likes: 18,
      comments: 5,
      timestamp: "5 hours ago"
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      caption: "Celebrating our fund milestone! 🎊",
      author: "Mike Chen",
      likes: 25,
      comments: 8,
      timestamp: "1 day ago"
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=300&fit=crop",
      caption: "Planning session for next quarter 📊",
      author: "Emily Davis",
      likes: 9,
      comments: 2,
      timestamp: "2 days ago"
    }
  ]);

  const [newCaption, setNewCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleLike = (id: string) => {
    setGalleryItems(items =>
      items.map(item =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const handleAddPhoto = () => {
    if (!selectedFile || !newCaption.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a photo and add a caption",
        variant: "destructive"
      });
      return;
    }

    const newItem: GalleryItem = {
      id: Date.now().toString(),
      image: URL.createObjectURL(selectedFile),
      caption: newCaption,
      author: "You",
      likes: 0,
      comments: 0,
      timestamp: "Just now"
    };

    setGalleryItems([newItem, ...galleryItems]);
    setNewCaption('');
    setSelectedFile(null);
    
    toast({
      title: "Photo Added!",
      description: "Your photo has been added to the gallery",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg sm:text-xl">Khajana Moments</CardTitle>
            <CardDescription className="text-sm">Share your memorable moments with the community</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Photo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Photo</DialogTitle>
                <DialogDescription>
                  Share a moment with your fund community
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="photo">Photo</Label>
                  <div className="mt-2">
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="caption">Caption</Label>
                  <Input
                    id="caption"
                    placeholder="Write a caption..."
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <Button onClick={handleAddPhoto} className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Add Photo
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {galleryItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-32 sm:h-40 object-cover"
              />
              <div className="p-3 sm:p-4">
                <p className="text-sm text-gray-900 mb-2 line-clamp-2">{item.caption}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="font-medium">{item.author}</span>
                  <span>{item.timestamp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <button
                      onClick={() => handleLike(item.id)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                      <span className="text-xs">{item.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-xs">{item.comments}</span>
                    </button>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700 transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Gallery;
