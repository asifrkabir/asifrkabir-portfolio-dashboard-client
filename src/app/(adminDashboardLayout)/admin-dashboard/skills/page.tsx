import { AddSkillModal } from "./_components/AddSkill/AddSkillModal";
import Skills from "./_components/Skills";

const ExperiencesPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Skill</h1>
        <AddSkillModal />
      </div>
      <Skills />
    </div>
  );
};

export default ExperiencesPage;