
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Upload, Mail, Github, Twitter, Globe } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProfilePictureViewer from '@/components/ProfilePictureViewer';

interface ProfileHeaderProps {
  profilePicUrl: string;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const ProfileHeader = ({ profilePicUrl, isEditing, setIsEditing }: ProfileHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-theme-dark to-theme py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <Avatar className="h-28 w-28 border-4 border-[#FAF5FF]">
              <AvatarImage src={profilePicUrl} alt="Sarah Chen" />
              <AvatarFallback className="bg-theme-medium text-white">SC</AvatarFallback>
            </Avatar>
            <Button 
              variant="secondary" 
              size="icon" 
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-theme-light hover:bg-theme-medium text-theme-dark"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Upload size={14} />
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
                  <Badge className="bg-white/90 text-theme-dark">Featured Creator</Badge>
                </div>
                <p className="mt-3 max-w-2xl">
                  AI researcher and full-stack developer with a passion for healthcare technology. I love sharing my hackathon projects and learning from others.
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="secondary" className="text-sm h-9 bg-white text-theme-dark hover:bg-white/90">
                  <Settings size={14} className="mr-1" />
                  <span>Settings</span>
                </Button>
                <Button variant="secondary" className="text-sm h-9 bg-white text-theme-dark hover:bg-white/90" asChild>
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
  );
};

export default ProfileHeader;
