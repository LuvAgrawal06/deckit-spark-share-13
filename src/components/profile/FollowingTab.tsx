
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const FollowingTab = () => {
  return (
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
                <Button variant="outline" size="sm" className="w-full border-[#A26769] hover:bg-[#BFB5AF]">
                  Unfollow
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
