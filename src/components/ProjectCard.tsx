
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, ThumbsUp, ThumbsDown, Lock } from 'lucide-react';

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
  };
  type: 'hackathon' | 'case-competition';
  premium: boolean;
  ultraPremium: boolean;
  votes: {
    up: number;
    down: number;
  };
  views: number;
  tags: string[];
}

const ProjectCard = ({ project }: { project: ProjectProps }) => {
  const [voted, setVoted] = useState<'up' | 'down' | null>(null);

  const handleVote = (voteType: 'up' | 'down') => {
    setVoted(voted === voteType ? null : voteType);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Link to={`/project/${project.id}`}>
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-40 object-cover"
          />
          {(project.premium || project.ultraPremium) && (
            <div className="absolute top-0 right-0 p-2">
              <Badge className={project.ultraPremium ? 'bg-gradient-to-r from-amber-400 to-amber-600' : 'bg-deckit-purple'}>
                <Lock size={12} className="mr-1" />
                {project.ultraPremium ? 'Ultra Premium' : 'Premium'}
              </Badge>
            </div>
          )}
        </Link>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="outline" className="mb-2 capitalize">
              {project.type.replace('-', ' ')}
            </Badge>
            <h3 className="font-semibold text-lg line-clamp-1">
              <Link to={`/project/${project.id}`} className="hover:text-deckit-purple">
                {project.title}
              </Link>
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2 mt-1">
              {project.description}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {project.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex flex-col">
        <div className="flex items-center justify-between w-full text-sm text-gray-500">
          <div className="flex items-center">
            <img 
              src={project.author.avatar} 
              alt={project.author.name} 
              className="w-6 h-6 rounded-full mr-2"
            />
            <span>{project.author.name}</span>
          </div>
          <div className="flex items-center">
            <Eye size={14} className="mr-1" />
            <span>{project.views}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 w-full">
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-2 ${voted === 'up' ? 'text-green-600' : ''}`}
              onClick={() => handleVote('up')}
            >
              <ThumbsUp size={14} className="mr-1" />
              <span>{project.votes.up + (voted === 'up' ? 1 : 0)}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-2 ${voted === 'down' ? 'text-red-600' : ''}`}
              onClick={() => handleVote('down')}
            >
              <ThumbsDown size={14} className="mr-1" />
              <span>{project.votes.down + (voted === 'down' ? 1 : 0)}</span>
            </Button>
          </div>
          <Link to={`/project/${project.id}`}>
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
