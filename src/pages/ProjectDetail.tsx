
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Share, 
  DollarSign, 
  Lock, 
  Eye, 
  Clock, 
  MessageSquare,
  Bookmark,
  FileText,
  Code,
  Download,
  AlertCircle
} from 'lucide-react';
import { ProjectProps } from '@/components/ProjectCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Sample project data
const projectsData: Record<string, ProjectProps> = {
  '1': {
    id: '1',
    title: 'AI-Driven Healthcare Diagnostics',
    description: 'An intelligent system that uses machine learning to predict early onset of diseases based on symptoms and medical history.',
    thumbnail: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
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
  '2': {
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
  '3': {
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
  },
};

// Extended sample data for the project detail
const extendedProjectData = {
  '1': {
    fullDescription: `
      This project is an AI-driven diagnostic system designed to predict the early onset of diseases based on a combination of symptoms, medical history, and relevant health data. 
      
      It employs a sophisticated machine learning model that has been trained on a comprehensive dataset of anonymized patient records. The system can identify patterns and correlations that might be missed by conventional diagnostic methods, potentially enabling earlier intervention and improved patient outcomes.
      
      Key features include:
      - Real-time symptom analysis and risk assessment
      - Integration with electronic health records
      - Personalized health recommendations
      - Physician dashboard for monitoring high-risk patients
      
      The project was developed during the HealthTech Hackathon 2023, where it won first place in the AI healthcare category.
    `,
    achievements: ['HealthTech Hackathon 2023 - First Place', 'Featured in MedTech Innovation Journal', 'Patent Pending Technology'],
    github: 'https://github.com/sarahchen/health-ai-diagnostics',
    technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'Flask', 'React', 'MongoDB'],
    teamMembers: [
      { name: 'Sarah Chen', role: 'Lead Developer', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { name: 'David Kim', role: 'Data Scientist', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' },
      { name: 'Priya Sharma', role: 'UX Designer', avatar: 'https://randomuser.me/api/portraits/women/37.jpg' },
      { name: 'James Wilson', role: 'Backend Developer', avatar: 'https://randomuser.me/api/portraits/men/9.jpg' }
    ],
    previewImages: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2032&auto=format&fit=crop'
    ],
    priceOptions: [
      { name: 'Premium', price: 9.99, features: ['Full project deck', 'Code repository access', 'Basic documentation'] },
      { name: 'Ultra Premium', price: 24.99, features: ['Everything in Premium', 'Detailed technical documentation', 'Implementation guide', '30-min consultation with creator'] }
    ],
    comments: [
      { user: 'Mark Thompson', avatar: 'https://randomuser.me/api/portraits/men/21.jpg', content: 'Incredible work! The diagnostic accuracy on your validation set is impressive. Have you considered expanding to include more rare conditions?', time: '2 days ago', likes: 14 },
      { user: 'Jennifer Lee', avatar: 'https://randomuser.me/api/portraits/women/42.jpg', content: 'As a healthcare professional, I can see the immense value this could bring to clinical settings. Would love to see more about how it integrates with existing EMR systems.', time: '5 days ago', likes: 27 },
      { user: 'Raj Patel', avatar: 'https://randomuser.me/api/portraits/men/54.jpg', content: 'The UI is well designed and intuitive. Great job on making complex diagnostics accessible to users without a medical background.', time: '1 week ago', likes: 9 }
    ]
  }
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [voted, setVoted] = useState<'up' | 'down' | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Fallback to first project if ID doesn't exist
  const projectId = id && projectsData[id] ? id : '1';
  const project = projectsData[projectId];
  const extendedProject = extendedProjectData[projectId as keyof typeof extendedProjectData];
  
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
            <Link to="/browse">
              <Button>Browse Projects</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleVote = (voteType: 'up' | 'down') => {
    setVoted(voted === voteType ? null : voteType);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width on desktop */}
          <div className="lg:col-span-2">
            {/* Project Header */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline" className="capitalize text-sm">
                  {project.type.replace('-', ' ')}
                </Badge>
                {project.premium && (
                  <Badge className="bg-deckit-purple text-sm">
                    <Lock size={12} className="mr-1" />
                    Premium
                  </Badge>
                )}
                {project.ultraPremium && (
                  <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-sm">
                    <Lock size={12} className="mr-1" />
                    Ultra Premium
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              
              <div className="flex items-center gap-3 text-gray-600 mb-6">
                <div className="flex items-center">
                  <Eye size={16} className="mr-1" />
                  <span>{project.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>Added 2 months ago</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <Link to={`/browse?tag=${tag}`} key={index}>
                    <Badge variant="secondary" className="text-sm hover:bg-secondary/80">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Project Images */}
            <div className="mb-8 overflow-hidden rounded-lg">
              <img 
                src={project.thumbnail} 
                alt={project.title} 
                className="w-full h-auto" 
              />
            </div>
            
            {/* Tabs for Project Content */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-line">{extendedProject?.fullDescription || project.description}</p>
                  </div>
                </div>
                
                {extendedProject?.achievements && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Achievements</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {extendedProject.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {extendedProject?.technologies && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {extendedProject.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {extendedProject?.github && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Repository</h3>
                    <Button variant="outline" className="flex items-center gap-2">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                      </svg>
                      <span>View on GitHub</span>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="preview" className="space-y-6">
                <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                  {project.premium || project.ultraPremium ? (
                    <>
                      <Lock size={48} className="text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
                      <p className="text-gray-600 mb-4">Purchase this project to view all materials</p>
                      <Button className="bg-deckit-purple hover:bg-deckit-purple-dark">
                        <DollarSign size={16} className="mr-2" />
                        Purchase Access
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {extendedProject?.previewImages?.map((img, index) => (
                          <img 
                            key={index} 
                            src={img} 
                            alt={`Preview ${index + 1}`} 
                            className="rounded-lg w-full h-48 object-cover" 
                          />
                        ))}
                      </div>
                      <div className="mt-6 w-full">
                        <div className="flex justify-between mb-4">
                          <h3 className="text-xl font-semibold">Code Preview</h3>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Download size={14} />
                            <span>Download</span>
                          </Button>
                        </div>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm">
                            <code>
{`import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split

# Load and preprocess patient data
def load_patient_data(filepath):
    data = pd.read_csv(filepath)
    # Preprocess data
    data = preprocess_features(data)
    return data

# Define model architecture
def create_diagnostic_model(input_shape):
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(128, activation='relu', input_shape=input_shape),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    
    return model

# This is just a sample code preview
# Full implementation available in the premium version`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="team" className="space-y-6">
                {extendedProject?.teamMembers ? (
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">Team Members</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {extendedProject.teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                          <Avatar className="h-14 w-14">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No team information available</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="comments" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Comments</h2>
                  
                  {/* Comment Form */}
                  <div className="mb-8">
                    <Textarea
                      placeholder="Leave a comment..."
                      className="mb-3"
                    />
                    <Button>Post Comment</Button>
                  </div>
                  
                  {/* Comments List */}
                  <div className="space-y-6">
                    {extendedProject?.comments ? (
                      extendedProject.comments.map((comment, index) => (
                        <div key={index} className="border-b pb-6 last:border-0">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={comment.avatar} alt={comment.user} />
                              <AvatarFallback>{comment.user.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{comment.user}</span>
                                <span className="text-sm text-gray-500">{comment.time}</span>
                              </div>
                              <p className="text-gray-700 mb-3">{comment.content}</p>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Button variant="ghost" size="sm" className="h-7 px-2">
                                  <ThumbsUp size={14} className="mr-1" />
                                  <span>{comment.likes}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 px-2">
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <p>No comments yet. Be the first to comment!</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar - 1/3 width on desktop */}
          <div className="lg:col-span-1">
            {/* Project Actions */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Project Access</CardTitle>
                <CardDescription>
                  {project.premium 
                    ? 'This is a premium project'
                    : project.ultraPremium 
                      ? 'This is an ultra premium project'
                      : 'This is a free project'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {(project.premium || project.ultraPremium) && extendedProject?.priceOptions && (
                  <div className="space-y-4">
                    {extendedProject.priceOptions.map((option, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{option.name}</span>
                          <span className="font-bold">${option.price.toFixed(2)}</span>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1 mb-3">
                          {option.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <Check size={16} className="mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full">Purchase</Button>
                      </div>
                    ))}
                  </div>
                )}
                
                {!project.premium && !project.ultraPremium && (
                  <div className="flex flex-col gap-3">
                    <Button>
                      <Download size={16} className="mr-2" />
                      Download Project
                    </Button>
                    <Button variant="outline">
                      <FileText size={16} className="mr-2" />
                      View Documentation
                    </Button>
                    <Button variant="outline">
                      <Code size={16} className="mr-2" />
                      View Code Repository
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-3">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className={`flex-1 ${voted === 'up' ? 'bg-green-50 text-green-600 border-green-200' : ''}`}
                    onClick={() => handleVote('up')}
                  >
                    <ThumbsUp size={16} className="mr-2" />
                    {project.votes.up + (voted === 'up' ? 1 : 0)}
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex-1 ${voted === 'down' ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
                    onClick={() => handleVote('down')}
                  >
                    <ThumbsDown size={16} className="mr-2" />
                    {project.votes.down + (voted === 'down' ? 1 : 0)}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className={`flex-1 ${isBookmarked ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}`}
                    onClick={toggleBookmark}
                  >
                    <Bookmark size={16} className="mr-2" />
                    {isBookmarked ? 'Saved' : 'Save'}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        <Share size={16} className="mr-2" />
                        Share
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Share this project</DialogTitle>
                        <DialogDescription>
                          Copy the link below or share directly to social media
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex items-center gap-2">
                          <Input value={`https://deckit.com/project/${project.id}`} readOnly />
                          <Button variant="outline">Copy</Button>
                        </div>
                        <div className="flex justify-center gap-4 pt-2">
                          <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                            </svg>
                          </Button>
                          <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                            </svg>
                          </Button>
                          <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0 2c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm.5 3v4.5H15a.5.5 0 0 1 0 1h-2.5V16a.5.5 0 0 1-1 0v-4.5H9a.5.5 0 0 1 0-1h2.5V7a.5.5 0 0 1 1 0z" clipRule="evenodd"></path>
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardFooter>
            </Card>
            
            {/* Project Creator */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Project Creator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={project.author.avatar} alt={project.author.name} />
                    <AvatarFallback>{project.author.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{project.author.name}</div>
                    <div className="text-sm text-gray-500 mb-2">Project Creator</div>
                    <Button size="sm" variant="outline" className="h-8">
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Legal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Legal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="licensing">
                    <AccordionTrigger>Licensing</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-600 mb-2">
                        This project is licensed under the MIT License, which allows for modification and commercial use with attribution.
                      </p>
                      <Link to="/licensing" className="text-sm text-deckit-purple">
                        View full license details
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="usage">
                    <AccordionTrigger>Usage Rights</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-600 mb-2">
                        Purchasing this project grants you the right to use it for personal or commercial purposes, subject to the terms of the license.
                      </p>
                      <Link to="/terms" className="text-sm text-deckit-purple">
                        View terms of service
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="attribution">
                    <AccordionTrigger>Attribution Requirements</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-600">
                        If you use this project, please attribute the creator as follows: "{project.title} by {project.author.name}, available on DeckIt".
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Intellectual Property Notice</p>
                    <p>
                      Always verify that you have the necessary rights to use and share competition materials before uploading.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
