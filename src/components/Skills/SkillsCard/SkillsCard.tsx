import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCode,
    faDatabase,
    faPeopleGroup,
    faServer,
} from "@fortawesome/free-solid-svg-icons";
import { faAws } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { SkillIconName } from "@/types/portfolio";
import "./skills-card.css";

const icons: Record<SkillIconName, IconDefinition> = {
    cloud: faAws,
    code: faCode,
    database: faDatabase,
    people: faPeopleGroup,
    server: faServer,
};

interface SkillsCardProps {
    readonly icon: SkillIconName;
    readonly tags: readonly string[];
    readonly title: string;
}

export const SkillsCard = ({ icon, tags, title }: SkillsCardProps) => {
    return (
        <article className="skills-card">
            <div className="skill-card-heading">
                <FontAwesomeIcon
                    icon={icons[icon]}
                    className="skill-icon"
                    aria-hidden="true"
                />
                <h3>{title}</h3>
            </div>
            <ul className="tags">
                {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                ))}
            </ul>
        </article>
    );
};