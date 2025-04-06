
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const FollowingTab = () => {
  const { toast } = useToast();
  const [followingUsers, setFollowingUsers] = useState([
    {
      id: '1',
      name: 'Alex Johnson',
      username: 'alexjohnson',
      role: 'Data Scientist',
      avatarUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
      projects: 12,
      followers: 4300,
      isFollowing: true
    },
    {
      id: '2',
      name: 'Emma Wong',
      username: 'emmawong',
      role: 'UX Designer',
      avatarUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
      projects: 8,
      followers: 2100,
      isFollowing: true
    },
    {
      id: '3',
      name: 'Michael Roberts',
      username: 'michaelroberts',
      role: 'Business Strategist',
      avatarUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
      projects: 15,
      followers: 3500,
      isFollowing: true
    },
    {
      id: '4',
      name: 'Jessica Chen',
      username: 'jessicachen',
      role: 'Full-stack Developer',
      avatarUrl: 'https://randomuser.me/api/portraits/women/13.jpg',
      projects: 20,
      followers: 6700,
      isFollowing: true
    },
    {
      id: '5',
      name: 'David Kim',
      username: 'davidkim',
      role: 'AI Researcher',
      avatarUrl: 'https://randomuser.me/api/portraits/men/14.jpg',
      projects: 9,
      followers: 4200,
      isFollowing: true
    },
    {
      id: '6',
      name: 'Lisa Park',
      username: 'lisapark',
      role: 'Product Manager',
      avatarUrl: 'https://randomuser.me/api/portraits/women/15.jpg',
      projects: 6,
      followers: 1800,
      isFollowing: true
    },
    {
      id: '7',
      name: 'James Wilson',
      username: 'jameswilson',
      role: 'Blockchain Developer',
      avatarUrl: 'https://randomuser.me/api/portraits/men/16.jpg',
      projects: 11,
      followers: 3100,
      isFollowing: true
    },
    {
      id: '8',
      name: 'Sophie Miller',
      username: 'sophiemiller',
      role: 'Marketing Specialist',
      avatarUrl: 'https://randomuser.me/api/portraits/women/17.jpg',
      projects: 7,
      followers: 2900,
      isFollowing: true
    }
  ]);

  const handleFollowToggle = (userId) => {
    setFollowingUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          const updatedUser = { ...user, isFollowing: !user.isFollowing };
          
          // Show toast notification
          toast({
            title: updatedUser.isFollowing ? "Following" : "Unfollowed",
            description: updatedUser.isFollowing 
              ? `You are now following ${user.name}` 
              : `You are no longer following ${user.name}`,
          });
          
          return updatedUser;
        }
        return user;
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-theme-dark">Following</h2>
      </div>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {followingUsers.map((user) => (
          <Card key={user.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Link to={`/user/${user.username}`}>
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <Link to={`/user/${user.username}`}>
                  <h3 className="font-medium text-lg hover:text-theme">{user.name}</h3>
                </Link>
                <p className="text-sm text-gray-500 mb-3">{user.role}</p>
                <div className="text-sm text-gray-500 mb-4">
                  {user.projects} Projects • {user.followers.toLocaleString()} Followers
                </div>
                <Button 
                  variant={user.isFollowing ? "outline" : "default"} 
                  size="sm" 
                  className={`w-full ${user.isFollowing 
                    ? "border-theme text-theme hover:bg-theme/10" 
                    : "bg-theme text-white hover:bg-theme-dark"}`}
                  onClick={() => handleFollowToggle(user.id)}
                >
                  {user.isFollowing ? "Unfollow" : "Follow"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FollowingTab;
