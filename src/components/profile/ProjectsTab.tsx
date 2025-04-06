
import { FileText, Upload } from 'lucide-react';
import ProjectCard, { ProjectProps } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProjectsTabProps {
  userProjects: ProjectProps[];
  readOnly?: boolean;
}

const ProjectsTab = ({ userProjects, readOnly = false }: ProjectsTabProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-theme-dark">{readOnly ? 'Projects' : 'My Projects'}</h2>
        {!readOnly && (
          <Button className="flex items-center gap-1 bg-theme hover:bg-theme-dark" asChild>
            <a href="/upload">
              <Upload size={16} />
              <span>Upload New Project</span>
            </a>
          </Button>
        )}
      </div>
      
      {userProjects.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-16 border-theme-medium/30">
          <CardContent>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-theme-light mb-4">
              <FileText className="h-6 w-6 text-theme-dark" />
            </div>
            <h3 className="text-lg font-medium mb-2 text-theme-dark">No projects yet</h3>
            <p className="text-theme-dark/70 mb-6">
              {readOnly ? 'This user hasn\'t uploaded any projects yet' : 'Upload your first project to showcase your work'}
            </p>
            {!readOnly && (
              <Button className="flex items-center gap-1 bg-theme hover:bg-theme-dark" asChild>
                <a href="/upload">
                  <Upload size={16} />
                  <span>Upload Project</span>
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectsTab;
