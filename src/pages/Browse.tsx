
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, ChevronDown, Filter, Search, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard, { ProjectProps } from '@/components/ProjectCard';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Sample data
const projects: ProjectProps[] = [
  {
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
  },
  {
    id: '4',
    title: 'Urban Mobility Revolution',
    description: 'A sustainable transportation solution for congested urban areas combining electric vehicles and smart infrastructure.',
    thumbnail: 'https://images.unsplash.com/photo-1556139966-56c3df1ddc63?q=80&w=2070&auto=format&fit=crop',
    author: {
      name: 'Emma Zhang',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
    },
    type: 'hackathon',
    premium: true,
    ultraPremium: false,
    votes: {
      up: 104,
      down: 8
    },
    views: 1750,
    tags: ['Mobility', 'Smart City', 'Sustainability', 'IoT']
  },
  {
    id: '5',
    title: 'Digital Banking Transformation',
    description: 'Strategic roadmap for traditional banks to successfully transition to digital-first financial institutions.',
    thumbnail: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=2070&auto=format&fit=crop',
    author: {
      name: 'Daniel Park',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    type: 'case-competition',
    premium: true,
    ultraPremium: false,
    votes: {
      up: 167,
      down: 14
    },
    views: 2890,
    tags: ['FinTech', 'Digital Transformation', 'Banking', 'Strategy']
  },
  {
    id: '6',
    title: 'AI-Powered Crop Monitoring',
    description: 'Machine learning solution that helps farmers optimize crop yields through real-time monitoring and predictive analytics.',
    thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop',
    author: {
      name: 'Sophia Carter',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
    },
    type: 'hackathon',
    premium: false,
    ultraPremium: false,
    votes: {
      up: 128,
      down: 7
    },
    views: 2120,
    tags: ['AgTech', 'Machine Learning', 'IoT', 'Sustainability']
  }
];

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'most-viewed', label: 'Most Viewed' },
];

const tags = [
  'AI', 'Machine Learning', 'Blockchain', 'IoT', 'Mobile', 'Web',
  'Sustainability', 'Healthcare', 'Finance', 'Education', 'Gaming',
  'AR/VR', 'Cybersecurity', 'Cloud', 'DevOps', 'Data Science',
  'Business Strategy', 'Marketing', 'Supply Chain', 'Retail'
];

const Browse = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showPremium, setShowPremium] = useState(true);
  const [showUltraPremium, setShowUltraPremium] = useState(true);
  const [showFree, setShowFree] = useState(true);

  const filteredProjects = projects.filter(project => {
    // Filter by tab
    if (activeTab !== 'all' && project.type !== activeTab) return false;
    
    // Filter by search query
    if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !project.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0 && !project.tags.some(tag => selectedTags.includes(tag))) {
      return false;
    }
    
    // Filter by content type
    if (!showFree && !project.premium && !project.ultraPremium) return false;
    if (!showPremium && project.premium) return false;
    if (!showUltraPremium && project.ultraPremium) return false;
    
    return true;
  });

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold">Browse Projects</h1>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <SlidersHorizontal size={16} />
                    <span>Filters</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h3 className="font-medium">Content Type</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="free" 
                          checked={showFree} 
                          onCheckedChange={() => setShowFree(!showFree)} 
                        />
                        <Label htmlFor="free">Free Content</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="premium" 
                          checked={showPremium} 
                          onCheckedChange={() => setShowPremium(!showPremium)} 
                        />
                        <Label htmlFor="premium">Premium Content</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="ultra" 
                          checked={showUltraPremium} 
                          onCheckedChange={() => setShowUltraPremium(!showUltraPremium)} 
                        />
                        <Label htmlFor="ultra">Ultra Premium Content</Label>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-2">Popular Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {tags.slice(0, 10).map((tag) => (
                          <div
                            key={tag}
                            className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                              selectedTags.includes(tag)
                                ? 'bg-deckit-purple text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            onClick={() => handleTagToggle(tag)}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {selectedTags.length > 0 && (
                      <div className="pt-2">
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-sm"
                          onClick={() => setSelectedTags([])}
                        >
                          Clear all tags
                        </Button>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <span>Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
                    <ChevronDown size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {sortOptions.map((option) => (
                          <CommandItem
                            key={option.value}
                            onSelect={() => {
                              setSortBy(option.value);
                            }}
                            className="flex items-center justify-between"
                          >
                            {option.label}
                            {sortBy === option.value && (
                              <Check className="h-4 w-4" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <Tabs 
            defaultValue="all" 
            className="mb-8"
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="hackathon">Hackathons</TabsTrigger>
              <TabsTrigger value="case-competition">Case Competitions</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Browse;
