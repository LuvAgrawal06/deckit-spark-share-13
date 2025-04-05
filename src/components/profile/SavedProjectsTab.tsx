
import { Bookmark } from 'lucide-react';
import ProjectCard, { ProjectProps } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SavedProjectsTabProps {
  savedProjects: ProjectProps[];
}

const SavedProjectsTab = ({ savedProjects }: SavedProjectsTabProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#582C4D]">Saved Projects</h2>
      </div>
      
      {savedProjects.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-16 border-[#D5B9B2]">
          <CardContent>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#BFB5AF] mb-4">
              <Bookmark className="h-6 w-6 text-[#582C4D]" />
            </div>
            <h3 className="text-lg font-medium mb-2 text-[#582C4D]">No saved projects</h3>
            <p className="text-[#582C4D]/70 mb-6">
              Start browsing and save projects that interest you
            </p>
            <Button variant="outline" className="border-[#A26769] hover:bg-[#BFB5AF]" asChild>
              <a href="/browse">Browse Projects</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SavedProjectsTab;
