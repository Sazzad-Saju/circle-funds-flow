
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';
import { AlertTriangle, TrendingUp, DollarSign, Calendar, Users, Target, User, LogOut, MessageCircle, Bell, Home, BarChart3, CreditCard, UsersIcon, Menu } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import FundGrowthChart from '@/components/FundGrowthChart';
import MonthlyPaymentGrid from '@/components/MonthlyPaymentGrid';
import ContributionChart from '@/components/ContributionChart';
import TopContributors from '@/components/TopContributors';
import Gallery from '@/components/Gallery';
import ProfileModal from '@/components/ProfileModal';
import MessagesModal from '@/components/MessagesModal';
import NotificationsDropdown from '@/components/NotificationsDropdown';
import KhajanaLogo from '@/components/KhajanaLogo';
import Events from '@/components/Events';
import Footer from '@/components/Footer';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  totalContribution: number;
  pendingAmount: number;
}

interface FundData {
  totalFunds: number;
  targetAmount: number;
  totalContributors: number;
  averageContribution: number;
  monthlyGrowth: number;
}

const menuItems = [
  {
    title: "Overview",
    value: "overview",
    icon: Home,
  },
  {
    title: "Payments",
    value: "payments", 
    icon: CreditCard,
  },
  {
    title: "Analytics",
    value: "analytics",
    icon: BarChart3,
  },
  {
    title: "Contributors",
    value: "contributors",
    icon: UsersIcon,
  },
];

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [fundData, setFundData] = useState<FundData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Mock data - replace with your API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        setUser({
          id: "1",
          name: "Alex Johnson",
          email: "alex@friendcircle.com",
          avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
          totalContribution: 12500,
          pendingAmount: 500
        });

        // Mock fund data
        setFundData({
          totalFunds: 245800,
          targetAmount: 500000,
          totalContributors: 24,
          averageContribution: 1024,
          monthlyGrowth: 8.5
        });

        setLoading(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleLogout = () => {
    toast({
      title: "Logged Out", 
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  const handleUpdateUser = (updatedUser: { name: string; email: string; avatar?: string }) => {
    if (user) {
      setUser({
        ...user,
        ...updatedUser
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const fundProgress = fundData ? (fundData.totalFunds / fundData.targetAmount) * 100 : 0;

  // Mobile Layout
  if (isMobile) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 to-indigo-100">
          <Sidebar className="border-r">
            <SidebarHeader className="border-b p-4">
              <KhajanaLogo />
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.value}>
                    <SidebarMenuButton 
                      isActive={activeTab === item.value}
                      onClick={() => setActiveTab(item.value)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              
              {user && (
                <div className="mt-auto p-4 border-t">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <SidebarMenuButton onClick={() => setIsProfileModalOpen(true)}>
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </SidebarMenuButton>
                    <SidebarMenuButton onClick={() => setIsMessagesModalOpen(true)}>
                      <MessageCircle className="h-4 w-4" />
                      <span>Messages</span>
                    </SidebarMenuButton>
                    <SidebarMenuButton onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </div>
                </div>
              )}
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="flex-1">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b bg-white/95 backdrop-blur-sm">
              <SidebarTrigger />
              <div className="flex items-center space-x-3">
                <NotificationsDropdown />
                {user && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
              <div className="p-4 space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Funds</CardTitle>
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold text-green-600">
                        ${fundData?.totalFunds.toLocaleString()}
                      </div>
                      <Progress value={fundProgress} className="mt-2" />
                      <p className="text-xs text-gray-500 mt-1">
                        {fundProgress.toFixed(1)}% of ${fundData?.targetAmount.toLocaleString()} target
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Your Contribution</CardTitle>
                      <Target className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold text-blue-600">
                        ${user?.totalContribution.toLocaleString()}
                      </div>
                      {user?.pendingAmount && user.pendingAmount > 0 && (
                        <Badge variant="outline" className="mt-2 text-orange-600 border-orange-600">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          ${user.pendingAmount} due
                        </Badge>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Contributors</CardTitle>
                      <Users className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold text-purple-600">
                        {fundData?.totalContributors}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Avg: ${fundData?.averageContribution.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold text-emerald-600">
                        +{fundData?.monthlyGrowth}%
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Fund Growth Over Time</CardTitle>
                          <CardDescription>Monthly progression towards target</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <FundGrowthChart />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Contribution Breakdown</CardTitle>
                          <CardDescription>Distribution by contribution type</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ContributionChart />
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Gallery />
                    <Events />
                  </div>
                )}

                {activeTab === "payments" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>12-Month Payment Status</CardTitle>
                      <CardDescription>Track your monthly contributions and due dates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MonthlyPaymentGrid />
                    </CardContent>
                  </Card>
                )}

                {activeTab === "analytics" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Performance Metrics</CardTitle>
                        <CardDescription>Key financial indicators</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Funding Rate</span>
                            <span className="font-semibold">{fundProgress.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Time to Target</span>
                            <span className="font-semibold">8.2 months</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Monthly Velocity</span>
                            <span className="font-semibold">$18,450</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Risk Assessment</CardTitle>
                        <CardDescription>Fund stability indicators</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Contribution Consistency</span>
                            <Badge variant="outline" className="text-green-600 border-green-600">High</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Member Retention</span>
                            <Badge variant="outline" className="text-green-600 border-green-600">96%</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Payment Delays</span>
                            <Badge variant="outline" className="text-yellow-600 border-yellow-600">Low</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "contributors" && (
                  <TopContributors />
                )}
              </div>
            </div>

            {/* Footer */}
            <Footer />
          </SidebarInset>

          {/* Modals */}
          {user && (
            <>
              <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                user={user}
                onUpdateUser={handleUpdateUser}
              />
              <MessagesModal
                isOpen={isMessagesModalOpen}
                onClose={() => setIsMessagesModalOpen(false)}
              />
            </>
          )}
        </div>
      </SidebarProvider>
    );
  }

  const fundProgress = fundData ? (fundData.totalFunds / fundData.targetAmount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <KhajanaLogo />
            
            {user && (
              <div className="flex items-center space-x-4">
                <NotificationsDropdown />
                
                <div className="relative group">
                  <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button
                      onClick={() => setIsProfileModalOpen(true)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </button>
                    <button
                      onClick={() => setIsMessagesModalOpen(true)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Messages
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Funds</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${fundData?.totalFunds.toLocaleString()}
              </div>
              <Progress value={fundProgress} className="mt-2" />
              <p className="text-xs text-gray-500 mt-1">
                {fundProgress.toFixed(1)}% of ${fundData?.targetAmount.toLocaleString()} target
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Contribution</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ${user?.totalContribution.toLocaleString()}
              </div>
              {user?.pendingAmount && user.pendingAmount > 0 && (
                <Badge variant="outline" className="mt-2 text-orange-600 border-orange-600">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  ${user.pendingAmount} due
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contributors</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {fundData?.totalContributors}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Avg: ${fundData?.averageContribution.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">
                +{fundData?.monthlyGrowth}%
              </div>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="contributors">Contributors</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fund Growth Over Time</CardTitle>
                  <CardDescription>Monthly progression towards target</CardDescription>
                </CardHeader>
                <CardContent>
                  <FundGrowthChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contribution Breakdown</CardTitle>
                  <CardDescription>Distribution by contribution type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ContributionChart />
                </CardContent>
              </Card>
            </div>
            
            <Gallery />
            <Events />
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>12-Month Payment Status</CardTitle>
                <CardDescription>Track your monthly contributions and due dates</CardDescription>
              </CardHeader>
              <CardContent>
                <MonthlyPaymentGrid />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key financial indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Funding Rate</span>
                      <span className="font-semibold">{fundProgress.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Time to Target</span>
                      <span className="font-semibold">8.2 months</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Monthly Velocity</span>
                      <span className="font-semibold">$18,450</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment</CardTitle>
                  <CardDescription>Fund stability indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Contribution Consistency</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">High</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Member Retention</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">96%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Payment Delays</span>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">Low</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contributors">
            <TopContributors />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {user && (
        <>
          <ProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            user={user}
            onUpdateUser={handleUpdateUser}
          />
          <MessagesModal
            isOpen={isMessagesModalOpen}
            onClose={() => setIsMessagesModalOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default Index;
