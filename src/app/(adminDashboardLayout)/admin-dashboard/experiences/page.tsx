import { AddExperienceModal } from "./components/AddExperience/AddExperienceModal";
import Experiences from "./components/Experiences";

const ExperiencesPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Experience</h1>
        <AddExperienceModal />
      </div>
      <Experiences />
    </div>
  );
};

export default ExperiencesPage;
