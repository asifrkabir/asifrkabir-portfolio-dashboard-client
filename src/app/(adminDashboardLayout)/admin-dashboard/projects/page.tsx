import { AddProjectModal } from "./components/AddProject/AddProjectModal";
import Projects from "./components/Projects";

const ProjectsPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Project</h1>
        <AddProjectModal />
      </div>
      <Projects />
    </div>
  );
};

export default ProjectsPage;