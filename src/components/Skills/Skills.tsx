import { skills } from "@data/skills";
import { SkillsCard } from "@components/Skills/SkillsCard/SkillsCard";
import { Heading } from "@components/Heading/Heading";
import "./skills.css";

const Skills = () => {
    return (
        <section className="section skills-container" id="skills">
            <Heading text="Skills" />
            <div className="skills-cards">
                {skills.map(({ title, icon, tags }) => (
                    <SkillsCard key={title} icon={icon} title={title} tags={tags} />
                ))}
            </div>
        </section>
    );
};

export default Skills;