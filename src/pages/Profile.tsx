
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, 
  Settings, 
  LogOut, 
  Edit, 
  Trash, 
  Eye, 
  ThumbsUp, 
  Download,
  MessageSquare,
  FileText, 
  Users, 
  Bookmark, 
  Bell,
  DollarSign,
  BarChart3,
  Upload,
  Link as LinkIcon,
  Github,
  Mail,
  Globe,
  Twitter
} from 'lucide-react';
import ProjectCard, { ProjectProps } from '@/components/ProjectCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import ProfilePictureViewer from '@/components/ProfilePictureViewer';

const userProjects: ProjectProps[] = [
  {
    id: '1',
    title: 'AI-Driven Healthcare Diagnostics',
    description: 'An intelligent system that uses machine learning to predict early onset of diseases based on symptoms and medical history.',
    thumbnail: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    type: 'hackathon',
    premium: true,
    ultraPremium: false,
    votes: {
      up: 145,
      down: 12
    },
    views: 2350,
    tags: ['AI', 'Machine Learning', 'Healthcare', 'Python']
  },
  {
    id: '4',
    title: 'Urban Mobility Revolution',
    description: 'A sustainable transportation solution for congested urban areas combining electric vehicles and smart infrastructure.',
    thumbnail: 'https://images.unsplash.com/photo-1556139966-56c3df1ddc63?q=80&w=2070&auto=format&fit=crop',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    type: 'hackathon',
    premium: false,
    ultraPremium: false,
    votes: {
      up: 104,
      down: 8
    },
    views: 1750,
    tags: ['Mobility', 'Smart City', 'Sustainability', 'IoT']
  }
];

const savedProjects: ProjectProps[] = [
  {
    id: '2',
    title: 'Sustainable Supply Chain Strategy',
    description: 'A comprehensive analysis and strategic plan for implementing eco-friendly practices in global supply chains.',
    thumbnail: 'https://images.unsplash.com/photo-1493946820527-0d00feee2c34?q=80&w=2070&auto=format&fit=crop',
    author: {
      name: 'Michael Roberts',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    type: 'case-competition',
    premium: false,
    ultraPremium: false,
    votes: {
      up: 87,
      down: 5
    },
    views: 1290,
    tags: ['Strategy', 'Sustainability', 'Supply Chain', 'Business']
  },
  {
    id: '3',
    title: 'Blockchain for Secure Voting',
    description: 'A decentralized voting platform ensuring transparency and security in elections using blockchain technology.',
    thumbnail: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop',
    author: {
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    type: 'hackathon',
    premium: false,
    ultraPremium: true,
    votes: {
      up: 232,
      down: 18
    },
    views: 3780,
    tags: ['Blockchain', 'Security', 'Voting', 'Ethereum', 'Smart Contracts']
  }
];

const notifications = [
  {
    id: 1,
    type: 'like',
    content: 'Michael Roberts liked your project "AI-Driven Healthcare Diagnostics"',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'comment',
    content: 'Alex Johnson commented on your project "Urban Mobility Revolution"',
    time: '1 day ago',
    read: false,
  },
  {
    id: 3,
    type: 'payment',
    content: 'You received a payment of $15.99 for "AI-Driven Healthcare Diagnostics"',
    time: '3 days ago',
    read: true,
  },
  {
    id: 4,
    type: 'milestone',
    content: 'Your project "AI-Driven Healthcare Diagnostics" reached 2,000 views!',
    time: '1 week ago',
    read: true,
  }
];

const earningsData = {
  totalEarnings: 245.78,
  thisMonth: 68.92,
  pendingPayout: 42.50,
  projects: [
    { name: 'AI-Driven Healthcare Diagnostics', amount: 185.25 },
    { name: 'Urban Mobility Revolution', amount: 60.53 }
  ],
  recentTransactions: [
    { id: 1, type: 'payout', amount: -150.00, date: 'Jun 15, 2023', status: 'Completed' },
    { id: 2, type: 'earning', amount: 24.99, date: 'Jun 10, 2023', project: 'AI-Driven Healthcare Diagnostics', status: 'Received' },
    { id: 3, type: 'earning', amount: 9.99, date: 'Jun 5, 2023', project: 'Urban Mobility Revolution', status: 'Received' },
    { id: 4, type: 'earning', amount: 9.99, date: 'Jun 1, 2023', project: 'AI-Driven Healthcare Diagnostics', status: 'Received' }
  ]
};

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const profilePicUrl = "https://randomuser.me/api/portraits/women/44.jpg";
  
  // Set active tab based on location or query params
  useEffect(() => {
    // If we're coming from upload page, show projects tab and notification
    if (location.state?.fromUpload) {
      setActiveTab('projects');
      toast({
        title: "Upload Complete",
        description: "Your project is now visible in your profile",
      });
    }
  }, [location, toast]);
  
  return (
    <div className="min-h-screen flex flex-col bg-theme-cream">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-theme-dark to-theme py-12 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <Avatar className="h-28 w-28 border-4 border-theme-cream">
                  <AvatarImage src={profilePicUrl} alt="Sarah Chen" />
                  <AvatarFallback className="bg-theme text-white">SC</AvatarFallback>
                </Avatar>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-theme-medium hover:bg-theme text-theme-dark"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit size={14} />
                </Button>
                
                <ProfilePictureViewer
                  src={profilePicUrl}
                  alt="Sarah Chen"
                  fallback="SC"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">Sarah Chen</h1>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                      <Badge className="bg-theme-medium/50 text-white">Pro Member</Badge>
                      <Badge className="bg-theme-cream/90 text-theme-dark">Featured Creator</Badge>
                    </div>
                    <p className="mt-3 max-w-2xl">
                      AI researcher and full-stack developer with a passion for healthcare technology. I love sharing my hackathon projects and learning from others.
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="secondary" className="text-sm h-9 bg-theme-cream text-theme-dark hover:bg-theme-medium">
                      <Settings size={14} className="mr-1" />
                      <span>Settings</span>
                    </Button>
                    <Button variant="secondary" className="text-sm h-9 bg-theme-cream text-theme-dark hover:bg-theme-medium" asChild>
                      <Link to="/upload">
                        <Upload size={14} className="mr-1" />
                        <span>Upload</span>
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                  <a href="#" className="flex items-center text-sm text-white/80 hover:text-white">
                    <Mail size={16} className="mr-1" />
                    sarah.chen@example.com
                  </a>
                  <a href="#" className="flex items-center text-sm text-white/80 hover:text-white">
                    <Github size={16} className="mr-1" />
                    sarahchen
                  </a>
                  <a href="#" className="flex items-center text-sm text-white/80 hover:text-white">
                    <Twitter size={16} className="mr-1" />
                    @sarahchentech
                  </a>
                  <a href="#" className="flex items-center text-sm text-white/80 hover:text-white">
                    <Globe size={16} className="mr-1" />
                    sarahchen.dev
                  </a>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-5">
                  <div className="text-center">
                    <div className="text-xl font-bold">24</div>
                    <div className="text-sm text-white/80">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">8.4k</div>
                    <div className="text-sm text-white/80">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">143</div>
                    <div className="text-sm text-white/80">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">95k</div>
                    <div className="text-sm text-white/80">Views</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="mx-auto max-w-3xl flex justify-center mb-4 bg-theme-light">
              <TabsTrigger value="projects" className="flex items-center gap-1 data-[state=active]:bg-theme data-[state=active]:text-white">
                <FileText size={16} />
                <span>My Projects</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-1 data-[state=active]:bg-theme data-[state=active]:text-white">
                <Bookmark size={16} />
                <span>Saved</span>
              </TabsTrigger>
              <TabsTrigger value="following" className="flex items-center gap-1 data-[state=active]:bg-theme data-[state=active]:text-white">
                <Users size={16} />
                <span>Following</span>
              </TabsTrigger>
              <TabsTrigger value="likes" className="flex items-center gap-1 data-[state=active]:bg-theme data-[state=active]:text-white">
                <ThumbsUp size={16} />
                <span>Likes</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-1 data-[state=active]:bg-theme data-[state=active]:text-white">
                <Bell size={16} />
                <span>Notifications</span>
                <Badge className="ml-1 bg-theme-dark h-5 w-5 flex items-center justify-center p-0 text-white">2</Badge>
              </TabsTrigger>
              <TabsTrigger value="earnings" className="flex items-center gap-1 data-[state=active]:bg-theme data-[state=active]:text-white">
                <DollarSign size={16} />
                <span>Earnings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-theme-dark">My Projects</h2>
                  <Button className="flex items-center gap-1 bg-theme hover:bg-theme-dark" asChild>
                    <a href="/upload">
                      <Upload size={16} />
                      <span>Upload New Project</span>
                    </a>
                  </Button>
                </div>
                
                {userProjects.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <Card className="text-center py-16 border-theme-medium">
                    <CardContent>
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-theme-light mb-4">
                        <FileText className="h-6 w-6 text-theme-dark" />
                      </div>
                      <h3 className="text-lg font-medium mb-2 text-theme-dark">No projects yet</h3>
                      <p className="text-theme-dark/70 mb-6">
                        Upload your first project to showcase your work
                      </p>
                      <Button className="flex items-center gap-1 bg-theme hover:bg-theme-dark" asChild>
                        <a href="/upload">
                          <Upload size={16} />
                          <span>Upload Project</span>
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="saved">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-theme-dark">Saved Projects</h2>
                </div>
                
                {savedProjects.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <Card className="text-center py-16 border-theme-medium">
                    <CardContent>
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-theme-light mb-4">
                        <Bookmark className="h-6 w-6 text-theme-dark" />
                      </div>
                      <h3 className="text-lg font-medium mb-2 text-theme-dark">No saved projects</h3>
                      <p className="text-theme-dark/70 mb-6">
                        Start browsing and save projects that interest you
                      </p>
                      <Button variant="outline" className="border-theme hover:bg-theme-light" asChild>
                        <a href="/browse">Browse Projects</a>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="following">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Following</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <Avatar className="h-20 w-20 mb-4">
                            <AvatarImage src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 10}.jpg`} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <h3 className="font-medium text-lg">{['Alex Johnson', 'Emma Wong', 'Michael Roberts', 'Jessica Chen', 'David Kim', 'Lisa Park', 'James Wilson', 'Sophie Miller'][i]}</h3>
                          <p className="text-sm text-gray-500 mb-3">{['Data Scientist', 'UX Designer', 'Business Strategist', 'Full-stack Developer', 'AI Researcher', 'Product Manager', 'Blockchain Developer', 'Marketing Specialist'][i]}</p>
                          <div className="text-sm text-gray-500 mb-4">
                            {Math.floor(Math.random() * 30) + 5} Projects • {Math.floor(Math.random() * 10000) + 1000} Followers
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            Unfollow
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="likes">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Liked Projects</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...savedProjects, ...userProjects].map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Notifications</h2>
                  <Button variant="outline" size="sm">Mark all as read</Button>
                </div>
                
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`${!notification.read ? 'border-l-4 border-l-deckit-purple' : ''}`}
                    >
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className={`rounded-full p-2 ${
                          notification.type === 'like' ? 'bg-red-100 text-red-500' :
                          notification.type === 'comment' ? 'bg-blue-100 text-blue-500' :
                          notification.type === 'payment' ? 'bg-green-100 text-green-500' :
                          'bg-amber-100 text-amber-500'
                        }`}>
                          {notification.type === 'like' && <ThumbsUp size={18} />}
                          {notification.type === 'comment' && <MessageSquare size={18} />}
                          {notification.type === 'payment' && <DollarSign size={18} />}
                          {notification.type === 'milestone' && <BarChart3 size={18} />}
                        </div>
                        <div className="flex-1">
                          <p className={`${!notification.read ? 'font-medium' : ''}`}>
                            {notification.content}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <Badge variant="outline" className="h-2 w-2 rounded-full bg-deckit-purple"></Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="earnings">
              <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">Earnings Dashboard</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500">Total Earnings</p>
                          <h3 className="text-3xl font-bold">${earningsData.totalEarnings.toFixed(2)}</h3>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full text-green-600">
                          <DollarSign size={20} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500">This Month</p>
                          <h3 className="text-3xl font-bold">${earningsData.thisMonth.toFixed(2)}</h3>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                          <BarChart3 size={20} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500">Pending Payout</p>
                          <h3 className="text-3xl font-bold">${earningsData.pendingPayout.toFixed(2)}</h3>
                        </div>
                        <Button variant="outline" size="sm">Withdraw</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">Earnings by Project</h3>
                      <div className="space-y-4">
                        {earningsData.projects.map((project, index) => (
                          <div key={index} className="flex justify-between items-center border-b pb-3">
                            <div className="flex items-center gap-3">
                              <LinkIcon size={16} className="text-gray-400" />
                              <span className="font-medium">{project.name}</span>
                            </div>
                            <span className="font-bold">${project.amount.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
                      <div className="space-y-4">
                        {earningsData.recentTransactions.map((transaction) => (
                          <div key={transaction.id} className="flex justify-between items-center border-b pb-3">
                            <div>
                              <div className="font-medium">
                                {transaction.type === 'payout' ? 'Payout to bank account' : 
                                 `Earning from ${transaction.project}`}
                              </div>
                              <div className="text-sm text-gray-500">{transaction.date}</div>
                            </div>
                            <div className="text-right">
                              <div className={`font-bold ${transaction.type === 'payout' ? 'text-red-500' : 'text-green-500'}`}>
                                {transaction.type === 'payout' ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {transaction.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
