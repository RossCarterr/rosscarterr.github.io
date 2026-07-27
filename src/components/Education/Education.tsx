import { Heading } from "@components/Heading/Heading";
import { education } from "@data/education";

const Education = () => {
    return (
        <section className="section education-section" id="education">
            <Heading text="Education" />
            <div className="education-list">
                {education.map((item) => (
                    <article className="section-panel" key={item.title}>
                        <h3>{item.title}</h3>
                        <p className="role-meta">{item.institution}</p>
                        <p>{item.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Education;