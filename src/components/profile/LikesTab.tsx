
import ProjectCard, { ProjectProps } from '@/components/ProjectCard';

interface LikesTabProps {
  savedProjects: ProjectProps[];
  userProjects: ProjectProps[];
}

const LikesTab = ({ savedProjects, userProjects }: LikesTabProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Liked Projects</h2>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...savedProjects, ...userProjects].map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default LikesTab;
