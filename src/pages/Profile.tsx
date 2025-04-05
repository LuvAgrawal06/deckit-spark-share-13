
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  Bookmark, 
  Bell,
  DollarSign,
  ThumbsUp,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// Profile components
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProjectsTab from '@/components/profile/ProjectsTab';
import SavedProjectsTab from '@/components/profile/SavedProjectsTab';
import FollowingTab from '@/components/profile/FollowingTab';
import LikesTab from '@/components/profile/LikesTab';
import NotificationsTab from '@/components/profile/NotificationsTab';
import EarningsTab from '@/components/profile/EarningsTab';

// Import profile data
import { 
  userProjects, 
  savedProjects, 
  notifications, 
  earningsData 
} from '@/components/profile/data';

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
    <div className="min-h-screen flex flex-col bg-[#ECE2D0]">
      <Navbar />
      
      <main className="flex-grow">
        <ProfileHeader 
          profilePicUrl={profilePicUrl}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="mx-auto max-w-3xl flex justify-center mb-4 bg-[#BFB5AF]">
              <TabsTrigger value="projects" className="flex items-center gap-1 data-[state=active]:bg-[#A26769] data-[state=active]:text-white">
                <FileText size={16} />
                <span>My Projects</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-1 data-[state=active]:bg-[#A26769] data-[state=active]:text-white">
                <Bookmark size={16} />
                <span>Saved</span>
              </TabsTrigger>
              <TabsTrigger value="following" className="flex items-center gap-1 data-[state=active]:bg-[#A26769] data-[state=active]:text-white">
                <Users size={16} />
                <span>Following</span>
              </TabsTrigger>
              <TabsTrigger value="likes" className="flex items-center gap-1 data-[state=active]:bg-[#A26769] data-[state=active]:text-white">
                <ThumbsUp size={16} />
                <span>Likes</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-1 data-[state=active]:bg-[#A26769] data-[state=active]:text-white">
                <Bell size={16} />
                <span>Notifications</span>
                <Badge className="ml-1 bg-[#582C4D] h-5 w-5 flex items-center justify-center p-0 text-white">2</Badge>
              </TabsTrigger>
              <TabsTrigger value="earnings" className="flex items-center gap-1 data-[state=active]:bg-[#A26769] data-[state=active]:text-white">
                <DollarSign size={16} />
                <span>Earnings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects">
              <ProjectsTab userProjects={userProjects} />
            </TabsContent>
            
            <TabsContent value="saved">
              <SavedProjectsTab savedProjects={savedProjects} />
            </TabsContent>
            
            <TabsContent value="following">
              <FollowingTab />
            </TabsContent>
            
            <TabsContent value="likes">
              <LikesTab savedProjects={savedProjects} userProjects={userProjects} />
            </TabsContent>
            
            <TabsContent value="notifications">
              <NotificationsTab notifications={notifications} />
            </TabsContent>
            
            <TabsContent value="earnings">
              <EarningsTab earningsData={earningsData} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
