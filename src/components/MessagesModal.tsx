
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  sender: 'user' | 'admin';
  message: string;
  timestamp: string;
  senderName: string;
}

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MessagesModal = ({ isOpen, onClose }: MessagesModalProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock messages data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'admin',
      message: 'Welcome to FriendCircle Fund! Feel free to reach out if you have any questions.',
      timestamp: '2024-01-15 10:30',
      senderName: 'Admin'
    },
    {
      id: '2',
      sender: 'user',
      message: 'Thank you! I have a question about the payment schedule.',
      timestamp: '2024-01-15 14:20',
      senderName: 'Alex Johnson'
    },
    {
      id: '3',
      sender: 'admin',
      message: 'Of course! The payment schedule is flexible. You can contribute the minimum amount each month or add more as per your convenience.',
      timestamp: '2024-01-15 15:45',
      senderName: 'Admin'
    }
  ]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const message: Message = {
        id: Date.now().toString(),
        sender: 'user',
        message: newMessage,
        timestamp: new Date().toLocaleString(),
        senderName: 'Alex Johnson'
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      toast({
        title: "Message Sent",
        description: "Your message has been sent to the admin.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Messages
          </DialogTitle>
          <DialogDescription>
            Communicate with the admin team
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col space-y-4">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2 max-w-[80%]`}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={message.sender === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}>
                        {message.sender === 'admin' ? 'A' : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`rounded-lg p-3 ${message.sender === 'user' ? 'bg-blue-600 text-white ml-2' : 'bg-gray-100 text-gray-900 mr-2'}`}>
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="space-y-2">
            <Label htmlFor="message">Send Message</Label>
            <div className="flex space-x-2">
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
                rows={3}
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessagesModal;
