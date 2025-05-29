
import { Calendar, CheckCircle, AlertTriangle, Clock, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface MonthlyPayment {
  month: string;
  fixedAmount: number;
  actualAmount: number;
  status: 'paid' | 'due' | 'overdue' | 'upcoming';
  dueDate: string;
  canAddMore: boolean;
}

const monthlyData: MonthlyPayment[] = [
  { month: 'Jan 2024', fixedAmount: 1000, actualAmount: 1200, status: 'paid', dueDate: '2024-01-15', canAddMore: false },
  { month: 'Feb 2024', fixedAmount: 1000, actualAmount: 1000, status: 'paid', dueDate: '2024-02-15', canAddMore: false },
  { month: 'Mar 2024', fixedAmount: 1000, actualAmount: 1500, status: 'paid', dueDate: '2024-03-15', canAddMore: false },
  { month: 'Apr 2024', fixedAmount: 1000, actualAmount: 1000, status: 'paid', dueDate: '2024-04-15', canAddMore: false },
  { month: 'May 2024', fixedAmount: 1000, actualAmount: 1300, status: 'paid', dueDate: '2024-05-15', canAddMore: false },
  { month: 'Jun 2024', fixedAmount: 1000, actualAmount: 1000, status: 'paid', dueDate: '2024-06-15', canAddMore: false },
  { month: 'Jul 2024', fixedAmount: 1000, actualAmount: 1100, status: 'paid', dueDate: '2024-07-15', canAddMore: false },
  { month: 'Aug 2024', fixedAmount: 1000, actualAmount: 500, status: 'overdue', dueDate: '2024-08-15', canAddMore: true },
  { month: 'Sep 2024', fixedAmount: 1000, actualAmount: 0, status: 'due', dueDate: '2024-09-15', canAddMore: true },
  { month: 'Oct 2024', fixedAmount: 1000, actualAmount: 0, status: 'upcoming', dueDate: '2024-10-15', canAddMore: true },
  { month: 'Nov 2024', fixedAmount: 1000, actualAmount: 0, status: 'upcoming', dueDate: '2024-11-15', canAddMore: true },
  { month: 'Dec 2024', fixedAmount: 1000, actualAmount: 0, status: 'upcoming', dueDate: '2024-12-15', canAddMore: true },
];

const MonthlyPaymentGrid = () => {
  const [additionalAmount, setAdditionalAmount] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<MonthlyPayment | null>(null);
  const { toast } = useToast();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'due':
        return <Clock className="h-5 w-5 text-orange-600" />;
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'upcoming':
        return <Calendar className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'border-green-200 bg-green-50';
      case 'due':
        return 'border-orange-200 bg-orange-50';
      case 'overdue':
        return 'border-red-200 bg-red-50';
      case 'upcoming':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-gray-200';
    }
  };

  const handleAddContribution = () => {
    if (selectedMonth && additionalAmount) {
      toast({
        title: "Contribution Added",
        description: `Successfully added $${additionalAmount} to ${selectedMonth.month}`,
      });
      setAdditionalAmount('');
      setSelectedMonth(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {monthlyData.map((payment, index) => (
          <Card key={index} className={`transition-all hover:shadow-md ${getStatusColor(payment.status)}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-sm">{payment.month}</h3>
                  <p className="text-xs text-gray-500">Due: {new Date(payment.dueDate).toLocaleDateString()}</p>
                </div>
                {getStatusIcon(payment.status)}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fixed:</span>
                  <span className="font-medium">${payment.fixedAmount}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Paid:</span>
                  <span className={`font-medium ${
                    payment.actualAmount >= payment.fixedAmount ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${payment.actualAmount}
                  </span>
                </div>

                {payment.actualAmount > payment.fixedAmount && (
                  <Badge variant="outline" className="text-xs text-blue-600 border-blue-600">
                    +${payment.actualAmount - payment.fixedAmount} extra
                  </Badge>
                )}

                {payment.canAddMore && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                        onClick={() => setSelectedMonth(payment)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add More
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Contribution for {payment.month}</DialogTitle>
                        <DialogDescription>
                          Add an additional amount to your monthly contribution.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="amount">Additional Amount</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={additionalAmount}
                            onChange={(e) => setAdditionalAmount(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setSelectedMonth(null)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddContribution}>
                            Add Contribution
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-green-700">Months Paid</div>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">2</div>
            <div className="text-sm text-orange-700">Due/Overdue</div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">$1,100</div>
            <div className="text-sm text-blue-700">Extra Contributed</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MonthlyPaymentGrid;
