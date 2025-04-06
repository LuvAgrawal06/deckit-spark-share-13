
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  UserPlus, 
  UserMinus,
  ThumbsUp,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Profile components
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProjectsTab from '@/components/profile/ProjectsTab';
import FollowingTab from '@/components/profile/FollowingTab';
import LikesTab from '@/components/profile/LikesTab';

// Import mock data
import { userProjects, savedProjects } from '@/components/profile/data';

// Mock user data
const mockUsers = [
  {
    id: "1",
    username: "sarahchen",
    displayName: "Sarah Chen",
    profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "AI researcher and full-stack developer with a passion for healthcare technology.",
    email: "sarah.chen@example.com",
    github: "sarahchen",
    twitter: "sarahchentech",
    website: "sarahchen.dev",
    projectCount: 24,
    followerCount: 8400,
    followingCount: 143,
    viewCount: 95000,
    isProMember: true,
    isFeaturedCreator: true
  },
  {
    id: "2",
    username: "alexjohnson",
    displayName: "Alex Johnson",
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Data scientist and machine learning enthusiast.",
    email: "alex.johnson@example.com",
    github: "alexj",
    twitter: "alexjtech",
    website: "alexjohnson.dev",
    projectCount: 18,
    followerCount: 3200,
    followingCount: 86,
    viewCount: 42000,
    isProMember: false,
    isFeaturedCreator: false
  }
];

const UserProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('projects');
  const [isFollowing, setIsFollowing] = useState(false);
  const [user, setUser] = useState(null);
  
  // In a real app, fetch user data based on username
  useEffect(() => {
    // Simulate API call
    const foundUser = mockUsers.find(u => u.username === username);
    if (foundUser) {
      setUser(foundUser);
      // Check if we're already following this user
      // In a real app, this would be determined by comparing with current user's following list
      setIsFollowing(Math.random() > 0.5); // random for demo purposes
    } else {
      // User not found
      toast({
        title: "User not found",
        description: "The user profile you're looking for doesn't exist",
        variant: "destructive"
      });
      navigate('/profile');
    }
  }, [username, navigate, toast]);
  
  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing 
        ? `You are no longer following ${user.displayName}` 
        : `You are now following ${user.displayName}`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5FF]">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-theme-dark to-theme py-12 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <img 
                  src={user.profilePic} 
                  alt={user.displayName} 
                  className="h-28 w-28 rounded-full object-cover border-4 border-white"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">{user.displayName}</h1>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                      {user.isProMember && (
                        <Badge className="bg-theme-medium/50 text-white">Pro Member</Badge>
                      )}
                      {user.isFeaturedCreator && (
                        <Badge className="bg-white/90 text-theme-dark">Featured Creator</Badge>
                      )}
                    </div>
                    <p className="mt-3 max-w-2xl">
                      {user.bio}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant={isFollowing ? "outline" : "secondary"} 
                      className={`text-sm h-9 ${isFollowing 
                        ? "bg-white text-theme-dark hover:bg-white/90" 
                        : "bg-theme-medium text-white hover:bg-theme-medium/80"}`}
                      onClick={handleFollowToggle}
                    >
                      {isFollowing ? (
                        <>
                          <UserMinus size={14} className="mr-1" />
                          <span>Unfollow</span>
                        </>
                      ) : (
                        <>
                          <UserPlus size={14} className="mr-1" />
                          <span>Follow</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                  <a href={`mailto:${user.email}`} className="flex items-center text-sm text-white/80 hover:text-white">
                    {user.email}
                  </a>
                  <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-white/80 hover:text-white">
                    @{user.github}
                  </a>
                  <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-white/80 hover:text-white">
                    @{user.twitter}
                  </a>
                  <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-white/80 hover:text-white">
                    {user.website}
                  </a>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-5">
                  <div className="text-center">
                    <div className="text-xl font-bold">{user.projectCount}</div>
                    <div className="text-sm text-white/80">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{user.followerCount.toLocaleString()}</div>
                    <div className="text-sm text-white/80">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{user.followingCount}</div>
                    <div className="text-sm text-white/80">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{user.viewCount.toLocaleString()}</div>
                    <div className="text-sm text-white/80">Views</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="mx-auto max-w-3xl flex justify-center mb-4 bg-theme-medium/20">
              <TabsTrigger value="projects" className="flex items-center gap-1 data-[state=active]:bg-theme data-[state=active]:text-white">
                <FileText size={16} />
                <span>Projects</span>
              </TabsTrigger>
              <TabsTrigger value="likes" className="flex items-center gap-1 data-[state=active]:bg-theme data-[state=active]:text-white">
                <ThumbsUp size={16} />
                <span>Likes</span>
              </TabsTrigger>
              <TabsTrigger value="following" className="flex items-center gap-1 data-[state=active]:bg-theme data-[state=active]:text-white">
                <Users size={16} />
                <span>Following</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects">
              <ProjectsTab userProjects={userProjects} readOnly={true} />
            </TabsContent>
            
            <TabsContent value="likes">
              <LikesTab savedProjects={savedProjects} userProjects={userProjects} />
            </TabsContent>
            
            <TabsContent value="following">
              <FollowingTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
