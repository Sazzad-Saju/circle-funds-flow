
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Smartphone } from 'lucide-react';

interface BikashPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  month: string;
  fixedAmount: number;
}

const BikashPaymentModal = ({ isOpen, onClose, month, fixedAmount }: BikashPaymentModalProps) => {
  const [amount, setAmount] = useState('');
  const [bikashNumber, setBikashNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!amount || !bikashNumber) {
      toast({
        title: "Missing Information",
        description: "Please enter both amount and Bikash number",
        variant: "destructive"
      });
      return;
    }

    if (parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful!",
        description: `$${amount} payment for ${month} has been processed via Bikash`,
      });
      
      // Reset form and close modal
      setAmount('');
      setBikashNumber('');
      onClose();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-green-600" />
            Bikash Payment for {month}
          </DialogTitle>
          <DialogDescription>
            Make an additional contribution using Bikash mobile payment
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-700">
              Fixed Amount: <span className="font-semibold">${fixedAmount}</span>
            </p>
            <p className="text-xs text-blue-600 mt-1">
              You can add any additional amount above the fixed contribution
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Additional Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0.01"
                step="0.01"
              />
            </div>

            <div>
              <Label htmlFor="bikash-number">Bikash Number</Label>
              <Input
                id="bikash-number"
                type="tel"
                placeholder="01XXXXXXXXX"
                value={bikashNumber}
                onChange={(e) => setBikashNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              Cancel
            </Button>
            <Button 
              onClick={handlePayment} 
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Pay Now
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BikashPaymentModal;
