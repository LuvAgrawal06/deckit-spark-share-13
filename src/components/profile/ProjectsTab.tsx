
import { FileText, Upload } from 'lucide-react';
import ProjectCard, { ProjectProps } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProjectsTabProps {
  userProjects: ProjectProps[];
}

const ProjectsTab = ({ userProjects }: ProjectsTabProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#582C4D]">My Projects</h2>
        <Button className="flex items-center gap-1 bg-[#A26769] hover:bg-[#582C4D]" asChild>
          <a href="/upload">
            <Upload size={16} />
            <span>Upload New Project</span>
          </a>
        </Button>
      </div>
      
      {userProjects.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-16 border-[#D5B9B2]">
          <CardContent>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#BFB5AF] mb-4">
              <FileText className="h-6 w-6 text-[#582C4D]" />
            </div>
            <h3 className="text-lg font-medium mb-2 text-[#582C4D]">No projects yet</h3>
            <p className="text-[#582C4D]/70 mb-6">
              Upload your first project to showcase your work
            </p>
            <Button className="flex items-center gap-1 bg-[#A26769] hover:bg-[#582C4D]" asChild>
              <a href="/upload">
                <Upload size={16} />
                <span>Upload Project</span>
              </a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectsTab;
