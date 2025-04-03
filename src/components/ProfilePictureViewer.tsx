
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, ZoomIn, Download, Share2, X } from "lucide-react";
import { useState } from "react";

interface ProfilePictureViewerProps {
  src: string;
  alt: string;
  fallback: string;
}

const ProfilePictureViewer = ({ src, alt, fallback }: ProfilePictureViewerProps) => {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => {
    if (zoom < 200) setZoom(zoom + 25);
  };

  const handleZoomOut = () => {
    if (zoom > 50) setZoom(zoom - 25);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-0 right-0 h-8 w-8 rounded-full bg-theme-dark/70 text-white hover:bg-theme-dark"
        >
          <ZoomIn size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Profile Picture</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center">
          <div className="relative overflow-hidden rounded-md mb-4">
            <img 
              src={src} 
              alt={alt} 
              className="max-h-[70vh] object-contain transition-transform"
              style={{ transform: `scale(${zoom / 100})` }}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <Search size={14} className="mr-1 rotate-90" />
              Zoom Out
            </Button>
            <div className="text-sm font-medium">{zoom}%</div>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn size={14} className="mr-1" />
              Zoom In
            </Button>
          </div>
          <div className="flex w-full justify-between mt-6">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download size={14} />
              Download
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 size={14} />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePictureViewer;
