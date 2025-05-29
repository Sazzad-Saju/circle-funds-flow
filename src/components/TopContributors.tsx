
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Medal, Award } from 'lucide-react';

interface Contributor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  totalContribution: number;
  monthlyAverage: number;
  consistency: number;
  rank: number;
}

const contributors: Contributor[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@friendcircle.com',
    avatar: '/placeholder.svg',
    totalContribution: 12500,
    monthlyAverage: 1563,
    consistency: 100,
    rank: 1
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@friendcircle.com',
    avatar: '/placeholder.svg',
    totalContribution: 11800,
    monthlyAverage: 1475,
    consistency: 95,
    rank: 2
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    email: 'michael@friendcircle.com',
    avatar: '/placeholder.svg',
    totalContribution: 11200,
    monthlyAverage: 1400,
    consistency: 92,
    rank: 3
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@friendcircle.com',
    avatar: '/placeholder.svg',
    totalContribution: 10500,
    monthlyAverage: 1313,
    consistency: 88,
    rank: 4
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david@friendcircle.com',
    avatar: '/placeholder.svg',
    totalContribution: 9800,
    monthlyAverage: 1225,
    consistency: 85,
    rank: 5
  },
];

const TopContributors = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <div className="h-5 w-5 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-white">{rank}</div>;
    }
  };

  const getConsistencyColor = (consistency: number) => {
    if (consistency >= 95) return 'text-green-600 border-green-600';
    if (consistency >= 85) return 'text-yellow-600 border-yellow-600';
    return 'text-red-600 border-red-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Contributors</CardTitle>
          <CardDescription>Leaderboard based on total contributions and consistency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contributors.map((contributor) => (
              <div key={contributor.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  {getRankIcon(contributor.rank)}
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contributor.avatar} alt={contributor.name} />
                    <AvatarFallback>{contributor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-sm">{contributor.name}</h3>
                      <p className="text-xs text-gray-500">{contributor.email}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">${contributor.totalContribution.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Total</div>
                    </div>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Monthly Avg</div>
                      <div className="font-semibold">${contributor.monthlyAverage.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Consistency</div>
                      <div className="flex items-center space-x-2">
                        <Progress value={contributor.consistency} className="flex-1 h-2" />
                        <Badge variant="outline" className={`text-xs ${getConsistencyColor(contributor.consistency)}`}>
                          {contributor.consistency}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-yellow-700">Champion</div>
            <div className="text-sm text-yellow-600">Alex Johnson</div>
            <div className="text-xs text-yellow-500">100% Consistency</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">$1,404</div>
            <div className="text-sm text-blue-700">Average Monthly</div>
            <div className="text-xs text-blue-500">Across all members</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">92%</div>
            <div className="text-sm text-green-700">Group Consistency</div>
            <div className="text-xs text-green-500">Above target</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TopContributors;
