import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Upload, Users, DollarSign, Brain } from 'lucide-react';
import ProjectCard, { ProjectProps } from './ProjectCard';

const featuredProjects: ProjectProps[] = [
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
  }
];

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-theme-dark/90 to-theme/90 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Showcase & Discover Top Competition Projects
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              The platform where technical and business minds share their best hackathon 
              and case competition solutions. Learn, collaborate, and monetize your work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/browse">
                <Button size="lg" className="w-full sm:w-auto bg-theme-cream text-theme-dark hover:bg-theme-light hover:text-theme-dark">
                  Browse Projects
                </Button>
              </Link>
              <Link to="/upload">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-theme-dark font-medium">
                  <Upload size={18} className="mr-2" />
                  Upload Your Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose DeckIt?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="bg-theme/10 p-4 rounded-full mb-4">
                <Upload className="h-8 w-8 text-theme" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Share Your Best Work</h3>
              <p className="text-gray-600">
                Upload your hackathon projects and case competition decks to showcase your skills and insights to a global audience.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="bg-theme/10 p-4 rounded-full mb-4">
                <DollarSign className="h-8 w-8 text-theme" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Earn From Your Content</h3>
              <p className="text-gray-600">
                Monetize your projects through subscriptions, premium content, and view-based revenue sharing as you build your reputation.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="bg-theme/10 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-theme" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Join a Community</h3>
              <p className="text-gray-600">
                Connect with like-minded creators, both technical and business-focused, to collaborate and learn from each other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-theme-cream/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <Link to="/browse">
              <Button variant="link" className="text-theme">
                View All Projects
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10 text-center">Explore Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/browse?category=hackathon" className="group">
              <div className="bg-theme-cream rounded-lg p-6 text-center transition-all hover:shadow-md">
                <div className="bg-theme/10 p-3 rounded-full inline-block mb-4 group-hover:bg-theme/20">
                  <Brain className="h-6 w-6 text-theme" />
                </div>
                <h3 className="font-semibold mb-2">Hackathons</h3>
                <p className="text-sm text-gray-600">Technical projects from coding competitions</p>
              </div>
            </Link>
            
            <Link to="/browse?category=case-competition" className="group">
              <div className="bg-theme-cream rounded-lg p-6 text-center transition-all hover:shadow-md">
                <div className="bg-theme/10 p-3 rounded-full inline-block mb-4 group-hover:bg-theme/20">
                  <DollarSign className="h-6 w-6 text-theme" />
                </div>
                <h3 className="font-semibold mb-2">Case Competitions</h3>
                <p className="text-sm text-gray-600">Strategic business solutions and analyses</p>
              </div>
            </Link>
            
            <Link to="/browse?tag=ai" className="group">
              <div className="bg-theme-cream rounded-lg p-6 text-center transition-all hover:shadow-md">
                <div className="bg-theme/10 p-3 rounded-full inline-block mb-4 group-hover:bg-theme/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-theme">
                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
                    <rect width="6" height="6" x="9" y="3" rx="1"></rect>
                    <path d="M9 17v-5"></path>
                    <path d="M12 17v-1"></path>
                    <path d="M15 17v-3"></path>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">AI & Machine Learning</h3>
                <p className="text-sm text-gray-600">Innovative AI solutions and models</p>
              </div>
            </Link>
            
            <Link to="/browse?tag=sustainability" className="group">
              <div className="bg-theme-cream rounded-lg p-6 text-center transition-all hover:shadow-md">
                <div className="bg-theme/10 p-3 rounded-full inline-block mb-4 group-hover:bg-theme/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-theme">
                    <path d="M2 22c1.25-.65 2.5-1.3 3.75-1.3 2.5 0 2.5 1.3 5 1.3s2.5-1.3 5-1.3c1.25 0 2.5.65 3.75 1.3"></path>
                    <path d="M2 17c1.25-.65 2.5-1.3 3.75-1.3 2.5 0 2.5 1.3 5 1.3s2.5-1.3 5-1.3c1.25 0 2.5.65 3.75 1.3"></path>
                    <path d="M2 12c1.25-.65 2.5-1.3 3.75-1.3 2.5 0 2.5 1.3 5 1.3s2.5-1.3 5-1.3c1.25 0 2.5.65 3.75 1.3"></path>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Sustainability</h3>
                <p className="text-sm text-gray-600">Green solutions and sustainable strategies</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-theme/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Share Your Winning Project?</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Join thousands of creators who are showcasing their work, building their reputation, 
            and earning revenue from their competition entries.
          </p>
          <Link to="/upload">
            <Button size="lg" className="bg-theme hover:bg-theme-dark">
              <Upload size={18} className="mr-2" />
              Upload Your Project
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
