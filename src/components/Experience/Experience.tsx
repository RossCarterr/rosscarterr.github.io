import { Heading } from "@components/Heading/Heading";
import { experience } from "@data/experience";
import { portfolioLinks } from "@data/links";

const Experience = () => {
    return (
        <section className="section experience-section" id="experience">
            <Heading text="Experience" />
            <p className="section-subtitle">
                For a full list of my experience,{" "}
                <a
                    href={portfolioLinks.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    download my CV
                </a>
                .
            </p>
            <div className="timeline">
                {experience.map((role) => (
                    <article
                        className="timeline-item"
                        key={`${role.company}-${role.title}`}
                    >
                        <div>
                            <h3>{role.title}</h3>
                            <p className="role-meta">
                                {role.company} | {role.dates}
                            </p>
                        </div>
                        <ul>
                            {role.highlights.map((highlight) => (
                                <li key={highlight}>{highlight}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Experience;