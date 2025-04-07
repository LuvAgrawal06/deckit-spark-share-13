
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Search, Menu, X, Upload, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock logged in state
  const [user, setUser] = useState({
    name: 'Sarah Chen',
    username: 'sarahchen',
    profilePic: 'https://randomuser.me/api/portraits/women/44.jpg'
  });

  return (
    <nav className="sticky top-0 z-50 w-full bg-theme-cream border-b border-theme-medium shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-theme-dark to-theme bg-clip-text text-transparent">
                DeckIt
              </span>
            </Link>
          </div>

          {/* Search Bar - Hidden on Mobile */}
          {!isMobile && (
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search decks, code projects, or users..."
                  className="pl-10 w-full bg-white/70 border-theme-medium focus:border-theme focus:ring-1 focus:ring-theme"
                />
              </div>
            </div>
          )}

          {/* Desktop Navigation Links */}
          {!isMobile && (
            <div className="flex items-center space-x-2">
              <Link to="/browse">
                <Button variant="ghost" className="text-theme-dark hover:text-theme hover:bg-theme-cream">Browse</Button>
              </Link>
              <Link to="/pricing">
                <Button variant="ghost" className="text-theme-dark hover:text-theme hover:bg-theme-cream">Pricing</Button>
              </Link>
              <Link to="/upload">
                <Button className="flex items-center gap-1 bg-theme hover:bg-theme-dark text-white">
                  <Upload size={16} />
                  <span>Upload</span>
                </Button>
              </Link>
              
              {!isLoggedIn ? (
                <Link to="/login">
                  <Button variant="outline" className="ml-2 flex items-center gap-1 border-theme text-theme hover:bg-theme-light">
                    <User size={16} />
                    <span>Login</span>
                  </Button>
                </Link>
              ) : (
                <Link to="/profile">
                  <Button variant="ghost" className="ml-2 p-1 h-10 w-10 rounded-full overflow-hidden hover:bg-theme-light">
                    <Avatar className="h-full w-full">
                      <AvatarImage src={user.profilePic} alt={user.name} />
                      <AvatarFallback className="bg-theme text-white">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </Link>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Button 
              variant="ghost" 
              className="p-2 text-theme-dark" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          )}
        </div>

        {/* Mobile Search - Only visible on mobile */}
        {isMobile && (
          <div className="pt-2 pb-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 w-full bg-white/70 border-theme-medium"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-theme-cream border-b border-theme-medium shadow-lg py-3 animate-in slide-in-from-top-2">
            <div className="container mx-auto px-4 flex flex-col space-y-2">
              <Link to="/browse" className="py-2 px-4 hover:bg-theme-medium/30 rounded-md text-theme-dark">
                Browse
              </Link>
              <Link to="/pricing" className="py-2 px-4 hover:bg-theme-medium/30 rounded-md text-theme-dark">
                Pricing
              </Link>
              <Link to="/upload" className="py-2 px-4 hover:bg-theme-medium/30 rounded-md flex items-center gap-2 text-theme-dark">
                <Upload size={16} />
                <span>Upload</span>
              </Link>
              
              {!isLoggedIn ? (
                <Link to="/login" className="py-2 px-4 hover:bg-theme-medium/30 rounded-md flex items-center gap-2 text-theme-dark">
                  <User size={16} />
                  <span>Login</span>
                </Link>
              ) : (
                <Link to="/profile" className="py-2 px-4 hover:bg-theme-medium/30 rounded-md flex items-center gap-2 text-theme-dark">
                  <div className="h-6 w-6 rounded-full overflow-hidden">
                    <img src={user.profilePic} alt={user.name} className="h-full w-full object-cover" />
                  </div>
                  <span>Profile</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
